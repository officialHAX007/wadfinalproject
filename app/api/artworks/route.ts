
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest){
  const form = await req.formData()
  const data = {
    title: String(form.get('title')||''),
    description: String(form.get('description')||''),
    image: String(form.get('image')||''),
    price: parseFloat(String(form.get('price')||'0')),
    artistId: String(form.get('artistId')||''),
    isAvailable: !!form.get('isAvailable'),
    tags: String(form.get('tags')||'').split(',').map(s=>s.trim()).filter(Boolean)
  }
  const created = await prisma.artwork.create({ data })
  return NextResponse.redirect(new URL(`/artworks/${created.id}`, req.url))
}
