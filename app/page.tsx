import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ProductList from '@/components/ProductList'

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl p-8">
        <Hero />

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-semibold">Featured Products</h2>
          <ProductList />
        </section>
      </main>
    </>
  )
}
