export default async function Cart() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <h1 className="text-4xl font-bold text-tuji-light mb-8">Your <span className="tuji-gradient-text">TujiSa</span> Cart</h1>
        <div className="text-center py-12">
          <div className="text-tuji-light/60 mb-4">Your cart is empty</div>
          <a href="/" className="btn-tuji-primary inline-flex">
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  )
}
