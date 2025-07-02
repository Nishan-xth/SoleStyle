import React from "react";
import { Card, CardContent } from "../card";
import { featuredProducts } from "@/lib/constant/data";
import Image from "next/image";
import { Badge } from "../badge";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";

const FeaturedProducts = () => {
  return (
    <section className="px-5 sm:px-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Discover our handpicked selection of the most popular and trending
          footwear
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <Card
            key={product.id}
            className="group hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-2 left-2">{product.badge}</Badge>
                {product.salePrice && (
                  <Badge
                    variant="destructive"
                    className="absolute top-2 right-2"
                  >
                    Sale
                  </Badge>
                )}
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {product.salePrice ? (
                    <>
                      <span className="text-lg font-bold text-primary">
                        ${product.salePrice}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">${product.price}</span>
                  )}
                </div>
                <Button className="w-full" asChild>
                  <Link href={`/product/${product.id}`}>View Details</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button size="lg" variant="outline" asChild>
          <Link href="/products">
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
