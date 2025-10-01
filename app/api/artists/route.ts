
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest){
  const form = await req.formData()
  const data = {
    name: String(form.get('name')||''),
    bio: String(form.get('bio')||''),
    contactEmail: String(form.get('contactEmail')||''),
    profileImage: String(form.get('profileImage')||''),
    socialLinks: String(form.get('socialLinks')||'').split(',').map(s=>s.trim()).filter(Boolean)
  }
  const created = await prisma.artist.create({ data })
  return NextResponse.redirect(new URL(`/artists/${created.id}`, req.url))
}
