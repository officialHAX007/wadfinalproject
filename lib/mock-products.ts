export type MockProduct = {
  id: string
  title: string
  description?: string
  price: number
  image: string        // public URL like /uploads/xxx.png or /images/illu_web1.png
  isAvailable?: boolean
  tags?: string[]
}

// Seed (your existing static images under /public/images)
const seeded: MockProduct[] = [
  { id: "p1", title: "Illustration Pack 1", price: 19.99, image: "/images/illu_web1.png", isAvailable: true },
  { id: "p2", title: "Illustration Pack 2", price: 29.99, image: "/images/illu_web2.png", isAvailable: true },
  { id: "p3", title: "Illustration Pack 3", price: 24.99, image: "/images/illu_web3.png", isAvailable: true },
  { id: "p4", title: "Illustration Pack 4", price: 34.99, image: "/images/illu_web4.png", isAvailable: true },
  { id: "p5", title: "Illustration Pack 5", price: 39.99, image: "/images/illu_web5.png", isAvailable: true },
  { id: "p6", title: "Illustration Pack 6", price: 44.99, image: "/images/illu_web6.png", isAvailable: true },
  { id: "p7", title: "Illustration Pack 7", price: 49.99, image: "/images/illu_web7.png", isAvailable: true },
]

// Runtime memory store
const runtimeAdds: MockProduct[] = []

export function getAllMockProducts(): MockProduct[] {
  return [...seeded, ...runtimeAdds]
}

export function addMockProduct(p: MockProduct) {
  runtimeAdds.push(p)
}
