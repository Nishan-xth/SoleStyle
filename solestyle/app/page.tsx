import Features from "@/components/ui/Features/Features";
import HeroSection from "@/components/ui/HeroSection/HeroSection";
import Newsletter from "@/components/ui/Newsletter/Newsletter";
import FeaturedProducts from "@/components/ui/Product/FeaturedProducts";
import ProductsbyCategory from "@/components/ui/Product/ProductsbyCategory";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <Features />
      <FeaturedProducts />
      <ProductsbyCategory />
      <Newsletter />
    </div>
  );
}
