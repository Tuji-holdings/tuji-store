"use client"

import Image from 'next/image'
import Link from 'next/link'

export default function Hero(): JSX.Element {
  return (
    <section className="rounded-lg bg-gradient-to-r from-[#ecfeff] to-[#eef2ff] p-8 flex flex-col gap-6 sm:flex-row items-center">
      <div className="flex-1">
        <h1 className="text-4xl font-bold">A modern store for quality goods</h1>
        <p className="mt-3 text-gray-700">Discover limited-run products with simple checkout and fast delivery. Curated for everyday use.</p>
        <div className="mt-6">
          <Link href="/product/sample-tshirt" className="inline-block rounded bg-[#0EA5A4] px-4 py-2 text-white">Shop Now</Link>
        </div>
      </div>
      <div className="w-48">
        <Image src="/logo.svg" alt="Tuji storefront" width={224} height={224} />
      </div>
    </section>
  )
}
