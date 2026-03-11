import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import {
  TrustBar,
  CategoryStrip,
  Promobanner,
  NewsletterSection,
} from "@/components/home/sections";
import {
  FeaturedProducts,
  NewArrivals,
  ProductGridSkeleton,
} from "@/components/home/products";

export const metadata = {
  title: "MyStore — Shop the Latest",
  description: "Discover curated collections of fashion, accessories and more.",
};

export default async function HomePage() {
  return (
    <div style={{ overflowX: "hidden" }}>
      <HeroSection />
      <TrustBar />
      <CategoryStrip categories={[]} />
      <Suspense fallback={<ProductGridSkeleton count={4} />}>
        <FeaturedProducts products={[]} />
      </Suspense>
      <Promobanner />
      <Suspense fallback={<ProductGridSkeleton count={8} />}>
        <NewArrivals products={[]} />
      </Suspense>
      <NewsletterSection />
    </div>
  );
}
