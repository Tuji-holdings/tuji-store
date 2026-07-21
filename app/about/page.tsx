export default async function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <h1 className="text-4xl font-bold text-tuji-light mb-8">About <span className="tuji-gradient-text">TujiSa</span></h1>
        <div className="bg-tuji-dark border border-tuji-gold/20 rounded-lg p-8 max-w-3xl">
          <p className="text-tuji-light/80 mb-4">
            TujiSa is a premium online marketplace dedicated to bringing you the finest products with exceptional service.
          </p>
          <p className="text-tuji-light/80 mb-4">
            Founded with a vision to revolutionize online shopping, we combine cutting-edge technology with personalized customer care.
          </p>
          <p className="text-tuji-light/80">
            Every product in our catalog is carefully curated to meet our high standards of quality and value.
          </p>
        </div>
      </div>
    </div>
  )
}
