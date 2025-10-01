"use client"

import { motion } from "framer-motion"
import Image from "next/image"

type Props = { id: string; title: string; price: number; image?: string }

export default function ProductCard({ id, title, price, image }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative rounded-2xl p-[2px]
                 bg-gradient-to-br from-rose-500 via-purple-500 to-indigo-500
                 shadow-2xl hover:shadow-purple-300/50 transition-shadow"
    >
      <div className="rounded-2xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl h-full">
        <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-200 to-slate-100" />
          )}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 mix-blend-overlay" />
          </div>
        </div>

        <div className="px-4 pt-3 pb-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
          <div className="mt-1 text-lg font-bold text-indigo-600 dark:text-indigo-400">
            ${price.toFixed(2)}
          </div>

          <form method="post" action="/api/cart/add" className="mt-4">
            <input type="hidden" name="artworkId" value={id} />
            <input type="hidden" name="title" value={title} />
            <input type="hidden" name="price" value={String(price)} />
            <input type="hidden" name="image" value={image ?? ""} />

            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full py-2.5 rounded-xl font-medium text-white
                         bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500
                         shadow-lg hover:opacity-90 transition-all"
            >
              Add to Cart •
            </motion.button>
          </form>
        </div>
      </div>
    </motion.article>
  )
}
