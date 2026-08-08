import Link from 'next/link'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList'

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <Hero />
        <section className="py-16 bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-tuji-light mb-4">Featured <span className="tuji-gradient-text">TujiSa Products</span></h2>
              <p className="text-tuji-light/60">Handpicked from our premium collection</p>
            </div>
            <ProductList />
          </div>
        </section>

        <section className="py-16 bg-tuji-dark border-t border-tuji-gold/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center"><div className="text-4xl mb-4">🚚</div><h3 className="text-xl font-semibold text-tuji-light mb-2">Fast Shipping</h3><p className="text-tuji-light/60">Reliable delivery straight to your door.</p></div>
              <div className="text-center"><div className="text-4xl mb-4">🔒</div><h3 className="text-xl font-semibold text-tuji-light mb-2">Secure Checkout</h3><p className="text-tuji-light/60">Secure card payments powered by Stripe.</p></div>
              <div className="text-center"><div className="text-4xl mb-4">💬</div><h3 className="text-xl font-semibold text-tuji-light mb-2">Customer Support</h3><p className="text-tuji-light/60">We're here to help with your order.</p></div>
            </div>
          </div>
        </section>

        <footer className="bg-tuji-dark border-t border-tuji-gold/20 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div><div className="text-tuji-gold font-bold text-xl mb-4">TujiSa</div><p className="text-tuji-light/60 text-sm">Premium products, delivered with care.</p></div>
              <div><h4 className="text-tuji-light font-semibold mb-4">Shop</h4><ul className="text-tuji-light/60 text-sm space-y-2"><li><Link href="/products" className="hover:text-tuji-gold transition">All Products</Link></li><li><Link href="/cart" className="hover:text-tuji-gold transition">Cart</Link></li></ul></div>
              <div><h4 className="text-tuji-light font-semibold mb-4">Support</h4><ul className="text-tuji-light/60 text-sm space-y-2"><li><Link href="/contact" className="hover:text-tuji-gold transition">Contact Us</Link></li></ul></div>
              <div><h4 className="text-tuji-light font-semibold mb-4">Company</h4><ul className="text-tuji-light/60 text-sm space-y-2"><li><Link href="/about" className="hover:text-tuji-gold transition">About Us</Link></li></ul></div>
            </div>
            <div className="border-t border-tuji-gold/20 pt-8 text-center text-tuji-light/60 text-sm"><p>&copy; {new Date().getFullYear()} TujiSa Store. All rights reserved.</p></div>
          </div>
        </footer>
      </main>
    </>
  )
}
