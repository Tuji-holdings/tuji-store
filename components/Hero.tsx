export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-b from-tuji-dark to-background relative overflow-hidden">
      {/* Circuit line decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-5">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="50" r="3" fill="currentColor" />
          <line x1="100" y1="50" x2="100" y2="150" stroke="currentColor" strokeWidth="2" />
          <circle cx="100" cy="150" r="3" fill="currentColor" />
          <line x1="100" y1="150" x2="200" y2="150" stroke="currentColor" strokeWidth="2" />
          <circle cx="200" cy="150" r="3" fill="currentColor" />
        </svg>
      </div>

      <div className="mx-auto max-w-6xl px-8 text-center relative z-10">
        <div className="inline-block mb-4 px-4 py-2 bg-tuji-gold/10 border border-tuji-gold/30 rounded-full">
          <span className="text-tuji-gold text-sm font-semibold">✨ Welcome to TujiSa Store</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="tuji-gradient-text">Premium Products</span>
          <br />
          <span className="text-tuji-light">Delivered to You</span>
        </h1>

        <p className="text-xl text-tuji-light/70 mb-8 max-w-2xl mx-auto">
          Discover our curated collection of quality products. Experience the TujiSa difference.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-tuji-primary">
            🛍️ Shop Now
          </button>
          <button className="btn-tuji-secondary">
            📖 Learn More
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl tuji-gradient-text font-bold">1000+</div>
            <div className="text-tuji-light/60 text-sm">Products</div>
          </div>
          <div>
            <div className="text-3xl tuji-gradient-text font-bold">50K+</div>
            <div className="text-tuji-light/60 text-sm">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl tuji-gradient-text font-bold">24/7</div>
            <div className="text-tuji-light/60 text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
