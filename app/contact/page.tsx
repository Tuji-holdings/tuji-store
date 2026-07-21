export default async function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-8 py-12">
        <h1 className="text-4xl font-bold text-tuji-light mb-8">Contact <span className="tuji-gradient-text">TujiSa</span></h1>
        <div className="bg-tuji-dark border border-tuji-gold/20 rounded-lg p-8 max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-tuji-gold font-semibold mb-2">Email</h3>
              <p className="text-tuji-light/80">support@tujiholdings.online</p>
            </div>
            <div>
              <h3 className="text-tuji-gold font-semibold mb-2">Phone</h3>
              <p className="text-tuji-light/80">+1 (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-tuji-gold font-semibold mb-2">Hours</h3>
              <p className="text-tuji-light/80">24/7 Customer Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
