import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react"

// This would typically come from your database
const featuredProducts = [
  {
    id: "1",
    name: "Classic White Sneakers",
    price: 89.99,
    salePrice: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Urban Runner Pro",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 89,
    badge: "New",
  },
  {
    id: "3",
    name: "Oxford Business Shoes",
    price: 199.99,
    salePrice: 179.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 67,
    badge: "Premium",
  },
  {
    id: "4",
    name: "Summer Comfort Sandals",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 156,
    badge: "Popular",
  },
]

const categories = [
  {
    name: "Sneakers",
    slug: "sneakers",
    image: "/placeholder.svg?height=200&width=300",
    count: 45,
  },
  {
    name: "Boots",
    slug: "boots",
    image: "/placeholder.svg?height=200&width=300",
    count: 32,
  },
  {
    name: "Athletic",
    slug: "athletic",
    image: "/placeholder.svg?height=200&width=300",
    count: 28,
  },
  {
    name: "Dress Shoes",
    slug: "dress-shoes",
    image: "/placeholder.svg?height=200&width=300",
    count: 19,
  },
]

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free shipping on orders over $75",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="container mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Step Into
                <span className="text-primary"> Style</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Discover our premium collection of footwear designed for comfort, style, and durability. From casual
                sneakers to elegant dress shoes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white hover:text-slate-900"
                  asChild
                >
                  <Link href="/categories">Browse Categories</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Featured shoes collection"
                width={600}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-6">
              <CardContent className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our handpicked selection of the most popular and trending footwear
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
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
                    <Badge variant="destructive" className="absolute top-2 right-2">
                      Sale
                    </Badge>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                  <div className="flex items-center space-x-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {product.salePrice ? (
                      <>
                        <span className="text-lg font-bold text-primary">${product.salePrice}</span>
                        <span className="text-sm text-muted-foreground line-through">${product.price}</span>
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

      {/* Categories */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
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
                      <p className="text-muted-foreground">{category.count} products</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Stay in the Loop</h2>
            <p className="text-lg opacity-90">
              Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and style tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button size="lg" variant="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
