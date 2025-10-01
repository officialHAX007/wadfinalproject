
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function POST(req: NextRequest, { params }:{ params: { id: string }}){
  const form = await req.formData()
  const data = {
    name: String(form.get('name')||''),
    email: String(form.get('email')||''),
    profileImage: String(form.get('profileImage')||'') || null,
  }
  await prisma.buyer.update({ where: { id: params.id }, data })
  return NextResponse.redirect(new URL(`/buyers`, req.url))
}
export async function DELETE(req: NextRequest, { params }:{ params: { id: string }}){
  await prisma.buyer.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}
