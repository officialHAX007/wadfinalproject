
'use client'
import { motion } from 'framer-motion'
import { Image, ShoppingCart, ShieldCheck, Rocket, Search, Layers } from 'lucide-react'

const FEATURES = [
  { icon: Image, title: 'Image Uploads', desc: 'Upload and showcase high‑res artworks.' },
  { icon: ShoppingCart, title: 'Orders & Cart', desc: 'Buyers can add to cart and place orders.' },
  { icon: ShieldCheck, title: 'Secure Auth', desc: 'Email/password with JWT cookie.' },
  { icon: Rocket, title: 'Lightning Fast', desc: 'Next.js App Router + edge-ready UI.' },
  { icon: Search, title: 'Search & Tags', desc: 'Find products by keywords and tags.' },
  { icon: Layers, title: 'Clean CMS', desc: 'CRUD for artists, products, buyers.' },
]

export default function Features(){
  return (
    <section id="features" className="container my-16">
      <h2 className="text-3xl font-bold text-center mb-10">Everything You Need</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i*0.06 }}
            className="card hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <f.icon className="w-6 h-6" />
              <div className="font-semibold">{f.title}</div>
            </div>
            <p className="mt-3 text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
