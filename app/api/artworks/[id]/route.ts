
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }:{ params: { id: string }}){
  const form = await req.formData()
  const data = {
    title: String(form.get('title')||''),
    description: String(form.get('description')||''),
    image: String(form.get('image')||''),
    price: parseFloat(String(form.get('price')||'0')),
    isAvailable: !!form.get('isAvailable'),
    tags: String(form.get('tags')||'').split(',').map(s=>s.trim()).filter(Boolean)
  }
  await prisma.artwork.update({ where: { id: params.id }, data })
  return NextResponse.redirect(new URL(`/artworks`, req.url))
}
export async function DELETE(req: NextRequest, { params }:{ params: { id: string }}){
  await prisma.artwork.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
