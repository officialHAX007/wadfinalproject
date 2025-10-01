
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest, { params }:{ params: { id: string }}){
  const session = await getSession()
  if(!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // in a real app, only admins/artists would change status; keep simple
  const form = await req.formData()
  const status = String(form.get('status')||'PENDING') as any
  await prisma.order.update({ where: { id: params.id }, data: { status } })
  return NextResponse.redirect(new URL('/orders', req.url))
}
