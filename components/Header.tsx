"use client"

import Link from 'next/link'
import Image from 'next/image'

export default function Header(): JSX.Element {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo-icon.svg" alt="Tuji logo" width={40} height={40} />
          <span className="text-lg font-bold text-[#0EA5A4]">Tuji Store</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/cart" className="text-sm">Cart</Link>
          <Link href="/admin" className="text-sm text-gray-600">Admin</Link>
        </nav>
      </div>
    </header>
  )
}
