'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const { data: session } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-tuji-dark border-b-2 border-tuji-gold/30">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="text-tuji-gold font-bold text-2xl">TujiSa</div>
          <div className="text-tuji-gold text-xs tracking-wider">STORE</div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-tuji-light hover:text-tuji-gold transition">Home</Link>
          <Link href="/products" className="text-tuji-light hover:text-tuji-gold transition">Products</Link>
          <Link href="/about" className="text-tuji-light hover:text-tuji-gold transition">About</Link>
          <Link href="/contact" className="text-tuji-light hover:text-tuji-gold transition">Contact</Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="text-tuji-gold hover:text-tuji-accent transition font-semibold">Cart</Link>
          
          {session ? (
            <div className="flex items-center gap-4">
              {session.user?.role === 'ADMIN' && (
                <Link href="/admin" className="text-tuji-accent text-sm hover:text-tuji-gold transition">[Admin]</Link>
              )}
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-tuji-gold text-tuji-dark rounded font-semibold hover:bg-tuji-accent transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth/signin" className="px-4 py-2 bg-tuji-gold text-tuji-dark rounded font-semibold hover:bg-tuji-accent transition">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile menu */}
        <button className="md:hidden text-tuji-gold" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-tuji-dark border-t border-tuji-gold/30 p-4 flex flex-col gap-4">
          <Link href="/" className="text-tuji-light hover:text-tuji-gold">Home</Link>
          <Link href="/products" className="text-tuji-light hover:text-tuji-gold">Products</Link>
          <Link href="/about" className="text-tuji-light hover:text-tuji-gold">About</Link>
          <Link href="/contact" className="text-tuji-light hover:text-tuji-gold">Contact</Link>
        </div>
      )}
    </header>
  )
}
