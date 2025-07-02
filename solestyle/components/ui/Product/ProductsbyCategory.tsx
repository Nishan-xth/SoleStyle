import { categories } from "@/lib/constant/data";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "../card";
import Image from "next/image";

const ProductsbyCategory = () => {
  return (
    <section className="bg-muted/50 py-16">
      <div className="px-5 sm:px-20">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect shoes for every occasion and style preference
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`}>
              <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <p className="text-muted-foreground">
                      {category.count} products
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsbyCategory;
