export default async function Products() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <h1 className="text-4xl font-bold text-tuji-light mb-8">All <span className="tuji-gradient-text">TujiSa</span> Products</h1>
        <div className="text-center py-12">
          <div className="text-tuji-light/60">Loading products...</div>
        </div>
      </div>
    </div>
  )
}
