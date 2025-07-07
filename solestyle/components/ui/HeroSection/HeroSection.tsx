import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-5 sm:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
              New Collection 2024
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Step Into
              <span className="text-primary"> Style</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg">
              Discover our premium collection of footwear designed for comfort,
              style, and durability. From casual sneakers to elegant dress
              shoes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3"
                asChild
              >
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                // className="text-lg px-8 border-white text-white hover:bg-white hover:text-slate-900"
                asChild
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"
              alt="Featured shoes collection"
              width={600}
              height={500}
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
