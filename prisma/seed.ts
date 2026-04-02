// prisma/seed.ts
import { db } from "../lib/db"; // Import your existing db instance

async function main() {
  console.log("🌱 Seeding database...");

  // ── 1. Clean existing data ─────────────────────────────────────────────────
  console.log("Cleaning existing data...");
  await db.orderItem.deleteMany();
  await db.order.deleteMany();
  await db.product.deleteMany();
  await db.category.deleteMany();
  console.log("✅ Cleaned existing data");

  // ── 2. Categories ──────────────────────────────────────────────────────────
  console.log("Creating categories...");
  const women = await db.category.create({
    data: { name: "Women", slug: "women" },
  });

  const men = await db.category.create({
    data: { name: "Men", slug: "men" },
  });

  const accessories = await db.category.create({
    data: { name: "Accessories", slug: "accessories" },
  });

  const shoes = await db.category.create({
    data: { name: "Shoes", slug: "shoes" },
  });

  console.log("✅ Categories created");

  // ── 3. Products ────────────────────────────────────────────────────────────
  const products = [
    {
      name: "Classic White Linen Shirt",
      slug: "classic-white-linen-shirt",
      description:
        "A timeless white linen shirt crafted for warm days and effortless style. Relaxed fit with a subtle texture that gets better with every wash.",
      price: 89.99,
      stock: 45,
      categoryId: women.id,
      images: [
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80",
      ],
    },
    {
      name: "High-Waist Tailored Trousers",
      slug: "high-waist-tailored-trousers",
      description:
        "Elegant high-waist trousers with a straight-leg cut. Made from a premium wool-blend that drapes beautifully and holds its shape all day.",
      price: 129.99,
      stock: 32,
      categoryId: women.id,
      images: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=800&q=80",
      ],
    },
    {
      name: "Silk Slip Midi Dress",
      slug: "silk-slip-midi-dress",
      description:
        "Luxurious silk-feel slip dress in a versatile midi length. The bias cut flatters every silhouette. Dress up or down with ease.",
      price: 164.99,
      stock: 18,
      categoryId: women.id,
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
      ],
    },
    {
      name: "Merino Wool Turtleneck",
      slug: "merino-wool-turtleneck",
      description:
        "Ultra-soft 100% merino wool turtleneck. Lightweight yet warm, naturally odour-resistant, and perfect for layering through the seasons.",
      price: 119.99,
      stock: 60,
      categoryId: women.id,
      images: [
        "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&q=80",
        "https://images.unsplash.com/photo-1608234808654-2a8875faa7fd?w=800&q=80",
      ],
    },
    {
      name: "Slim Fit Oxford Shirt",
      slug: "slim-fit-oxford-shirt",
      description:
        "A sharp slim-fit Oxford shirt woven from 100% cotton. The subtle texture adds depth while keeping the look clean and professional.",
      price: 94.99,
      stock: 55,
      categoryId: men.id,
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
        "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=80",
      ],
    },
    {
      name: "Raw Denim Straight Jeans",
      slug: "raw-denim-straight-jeans",
      description:
        "Selvedge raw denim jeans with a classic straight leg. These will fade and conform to your body over time — built to last a decade.",
      price: 189.99,
      stock: 28,
      categoryId: men.id,
      images: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
        "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?w=800&q=80",
      ],
    },
    {
      name: "Technical Bomber Jacket",
      slug: "technical-bomber-jacket",
      description:
        "A modern bomber in water-resistant technical fabric. Clean lines, minimal branding, and thoughtful pockets make this the ultimate layering piece.",
      price: 249.99,
      stock: 20,
      categoryId: men.id,
      images: [
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
        "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=800&q=80",
      ],
    },
    {
      name: "Leather Crossbody Bag",
      slug: "leather-crossbody-bag",
      description:
        "Full-grain leather crossbody with an adjustable strap and brass hardware. Ages beautifully — a bag you'll reach for every single day.",
      price: 219.99,
      stock: 15,
      categoryId: accessories.id,
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      ],
    },
    {
      name: "Minimalist Leather Watch",
      slug: "minimalist-leather-watch",
      description:
        "Swiss-movement watch with a slim case and genuine leather strap. The clean dial reads time at a glance without visual noise.",
      price: 299.99,
      stock: 12,
      categoryId: accessories.id,
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80",
      ],
    },
    {
      name: "Suede Chelsea Boots",
      slug: "suede-chelsea-boots",
      description:
        "Handcrafted suede Chelsea boots on a sturdy rubber sole. The elastic side panels make them a cinch to pull on and equally hard to take off.",
      price: 274.99,
      stock: 22,
      categoryId: shoes.id,
      images: [
        "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      ],
    },
  ];

  console.log("Creating products...");
  for (const product of products) {
    await db.product.create({ data: product });
    console.log(`  ✓ ${product.name}`);
  }

  console.log(
    `\n✅ Done! Seeded ${products.length} products across 4 categories.`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
