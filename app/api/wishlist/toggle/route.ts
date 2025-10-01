
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(req: NextRequest){
  const session = await getSession()
  if(!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const form = await req.formData()
  const artworkId = String(form.get('artworkId')||'')
  const existing = await prisma.wishlist.findFirst({ where: { artworkId, buyer: { userId: session.userId } } })
  if(existing){
    await prisma.wishlist.delete({ where: { id: existing.id } })
  } else {
    const buyer = await prisma.buyer.findFirst({ where: { userId: session.userId } })
    if(!buyer) return NextResponse.json({ error: 'Buyer not found' }, { status: 400 })
    await prisma.wishlist.create({ data: { buyerId: buyer.id, artworkId } })
  }
  return NextResponse.redirect(new URL('/catalog', req.url))
}
