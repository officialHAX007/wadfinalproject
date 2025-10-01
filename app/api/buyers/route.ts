
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function POST(req: NextRequest){
  const form = await req.formData()
  const data = {
    name: String(form.get('name')||''),
    email: String(form.get('email')||''),
    profileImage: String(form.get('profileImage')||'') || null,
  }
  const created = await prisma.buyer.create({ data })
  return NextResponse.redirect(new URL(`/buyers/${created.id}`, req.url))
}
