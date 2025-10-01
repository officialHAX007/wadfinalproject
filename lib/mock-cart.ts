// Shared mock cart store for demo (no DATABASE_URL)
export type CartLine = { artworkId: string; quantity: number; title?: string; price?: number }

let CART: CartLine[] = []

export function mockCartAdd(line: CartLine) {
  const found = CART.find((l) => l.artworkId === line.artworkId)
  if (found) found.quantity += line.quantity
  else CART.push({ ...line })
}

export function mockCartList() {
  return CART
}

export function mockCartClear() {
  CART = []
}
