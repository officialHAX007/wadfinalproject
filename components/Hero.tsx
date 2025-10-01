
'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-fuchsia-500 to-pink-500 opacity-90" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative container py-24 text-center text-white"
      >
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          Sell Digital Illustrations with Style
        </motion.h1>
        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-5 max-w-2xl mx-auto text-lg md:text-xl opacity-95"
        >
          A modern marketplace experience—fast, responsive, and beautiful. Upload artwork, manage products, and take orders.
        </motion.p>
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <Link href="/products" className="btn btn-primary flex items-center gap-2">
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="#features" className="btn btn-outline">See Features</a>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[120%] h-56 bg-white/20 blur-3xl rounded-full"
        animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
        transition={{ repeat: Infinity, duration: 6 }}
      />
    </section>
  )
}
