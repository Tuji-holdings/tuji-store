#!/usr/bin/env bash
# paste_helper.sh — read stdin or files, copy to clipboard and/or upload to GitHub Gist
# Usage:
#   cat file | ./paste_helper.sh           # copies to clipboard if available
#   ./paste_helper.sh file1 file2          # concatenates files, copies to clipboard
#   cat file | ./paste_helper.sh -u        # uploads to Gist and prints URL
# Options:
#   -u, --gist        Upload as a GitHub Gist (requires GITHUB_TOKEN env var)
#   -p, --public      Make the Gist public (default: private)
#   -n, --name NAME   Filename to use for the Gist (default: paste.txt)
set -euo pipefail

GIST=false
PUBLIC=false
FILE_NAME="paste.txt"
ARGS=()

while (( "$#" )); do
  case "$1" in
    -u|--gist) GIST=true; shift ;;
    -p|--public) PUBLIC=true; shift ;;
    -n|--name) FILE_NAME="$2"; shift 2 ;;
    --) shift; while (( "$#" )); do ARGS+=("$1"); shift; done ;;
    -*) echo "Unknown option: $1" >&2; exit 2 ;;
    *) ARGS+=("$1"); shift ;;
  esac
done

TMPFILE="$(mktemp)"
trap 'rm -f "$TMPFILE"' EXIT

if [ "${#ARGS[@]}" -gt 0 ]; then
  # Concatenate provided files
  for f in "${ARGS[@]}"; do
    if [ ! -r "$f" ]; then
      echo "Cannot read file: $f" >&2
      exit 1
    fi
    cat "$f" >> "$TMPFILE"
  done
else
  # Read stdin (supports piping)
  if [ -t 0 ]; then
    echo "No input provided. Use piping or pass filenames." >&2
    exit 1
  fi
  cat - > "$TMPFILE"
fi

copy_to_clipboard() {
  if command -v pbcopy >/dev/null 2>&1; then
    pbcopy < "$TMPFILE" && echo "Copied to macOS clipboard."
  elif command -v xclip >/dev/null 2>&1; then
    xclip -selection clipboard < "$TMPFILE" && echo "Copied to X11 clipboard (xclip)."
  elif command -v xsel >/dev/null 2>&1; then
    xsel --clipboard --input < "$TMPFILE" && echo "Copied to X11 clipboard (xsel)."
  else
    echo "No clipboard utility found (pbcopy, xclip, or xsel). Skipping clipboard copy." >&2
    return 1
  fi
}

upload_gist() {
  if [ -z "${GITHUB_TOKEN:-}" ]; then
    echo "GITHUB_TOKEN not set; cannot create gist." >&2
    return 1
  fi

  CONTENT=$(python3 - <<'PY' "$TMPFILE"
import sys, json
with open(sys.argv[1], 'r', encoding='utf-8') as f:
    content = f.read()
print(json.dumps(content))
PY
  )

  # Build JSON payload
  if [ "$PUBLIC" = true ]; then
    PUBLIC_FLAG=true
  else
    PUBLIC_FLAG=false
  fi

  PAYLOAD=$(cat <<EOF
{
  "public": $PUBLIC_FLAG,
  "files": {
    "$(printf '%s' "$FILE_NAME" | sed 's/"/\\"/g')": {
      "content": $CONTENT
    }
  }
}
EOF
)

  RESPONSE=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "$PAYLOAD" https://api.github.com/gists)

  URL=$(echo "$RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('html_url',''))")
  if [ -n "$URL" ]; then
    echo "Gist created: $URL"
  else
    echo "Failed to create gist. Response:" >&2
    echo "$RESPONSE" >&2
    return 1
  fi
}

# Default behavior: copy to clipboard if possible; if GIST flag set, also upload.
copy_to_clipboard || true

if [ "$GIST" = true ]; then
  upload_gist
fi
