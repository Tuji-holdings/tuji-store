export default function AuthError() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Authentication Error</h1>
        <p className="text-tuji-light/60 mb-8">There was an error signing you in. Please try again.</p>
        <a href="/auth/signin" className="btn-tuji-primary inline-flex">Back to Sign In</a>
      </div>
    </div>
  )
}
