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
          <div className="mx-auto max-w-7xl px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-tuji-light mb-4">
                Featured <span className="tuji-gradient-text">TujiSa Products</span>
              </h2>
              <p className="text-tuji-light/60">Handpicked from our premium collection</p>
            </div>
            <ProductList />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-tuji-dark border-t border-tuji-gold/20">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold text-tuji-light mb-2">Fast Shipping</h3>
                <p className="text-tuji-light/60">Delivered to your door in 2-5 business days</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold text-tuji-light mb-2">Secure Checkout</h3>
                <p className="text-tuji-light/60">Your data is protected with SSL encryption</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-xl font-semibold text-tuji-light mb-2">24/7 Support</h3>
                <p className="text-tuji-light/60">We're here to help anytime, anywhere</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-tuji-dark border-t border-tuji-gold/20 py-12">
          <div className="mx-auto max-w-7xl px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="text-tuji-gold font-bold text-xl mb-4">TujiSa</div>
                <p className="text-tuji-light/60 text-sm">Premium products, delivered with care.</p>
              </div>
              <div>
                <h4 className="text-tuji-light font-semibold mb-4">Shop</h4>
                <ul className="text-tuji-light/60 text-sm space-y-2">
                  <li><a href="#" className="hover:text-tuji-gold transition">New Arrivals</a></li>
                  <li><a href="#" className="hover:text-tuji-gold transition">Best Sellers</a></li>
                  <li><a href="#" className="hover:text-tuji-gold transition">All Products</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-tuji-light font-semibold mb-4">Support</h4>
                <ul className="text-tuji-light/60 text-sm space-y-2">
                  <li><a href="#" className="hover:text-tuji-gold transition">Contact Us</a></li>
                  <li><a href="#" className="hover:text-tuji-gold transition">Shipping Info</a></li>
                  <li><a href="#" className="hover:text-tuji-gold transition">Returns</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-tuji-light font-semibold mb-4">Company</h4>
                <ul className="text-tuji-light/60 text-sm space-y-2">
                  <li><a href="#" className="hover:text-tuji-gold transition">About Us</a></li>
                  <li><a href="#" className="hover:text-tuji-gold transition">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-tuji-gold transition">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-tuji-gold/20 pt-8 text-center text-tuji-light/60 text-sm">
              <p>&copy; 2024 TujiSa Store. All rights reserved. | Powered by TujiSa Ecosystem</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
