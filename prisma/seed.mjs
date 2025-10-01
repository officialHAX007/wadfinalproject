
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("password123", 10);
  const userBuyer = await prisma.user.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: { email: "buyer@example.com", password, role: "BUYER" }
  });

  const buyer = await prisma.buyer.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: { email: "buyer@example.com", name: "Sample Buyer", userId: userBuyer.id }
  });

  const userArtist = await prisma.user.upsert({
    where: { email: "artist@example.com" },
    update: {},
    create: { email: "artist@example.com", password, role: "ARTIST" }
  });

  const artist = await prisma.artist.upsert({
    where: { id: userArtist.id },
    update: {},
    create: {
      id: crypto.randomUUID(),
      name: "Sample Artist",
      bio: "I draw digital art.",
      contactEmail: "artist@example.com",
      socialLinks: ["https://instagram.com/sample"],
      userId: userArtist.id
    }
  });

  for (let i = 1; i <= 6; i++) {
    await prisma.artwork.create({
      data: {
        title: `Artwork #${i}`,
        description: "A beautiful digital piece.",
        image: "",
        price: (i * 10).toFixed(2),
        artistId: artist.id,
        tags: ["digital", i % 2 ? "portrait" : "landscape"]
      }
    });
  }

  console.log("Seeded.");
}

main().finally(async () => prisma.$disconnect());
