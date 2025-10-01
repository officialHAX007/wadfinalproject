
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest, { params }:{ params: { id: string }}){
  const form = await req.formData()
  const data = {
    name: String(form.get('name')||''),
    bio: String(form.get('bio')||''),
    contactEmail: String(form.get('contactEmail')||''),
    profileImage: String(form.get('profileImage')||''),
    socialLinks: String(form.get('socialLinks')||'').split(',').map(s=>s.trim()).filter(Boolean)
  }
  await prisma.artist.update({ where: { id: params.id }, data })
  return NextResponse.redirect(new URL(`/artists`, req.url))
}
export async function DELETE(req: NextRequest, { params }:{ params: { id: string }}){
  await prisma.artist.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
