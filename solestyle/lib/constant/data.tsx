import {
  Star,
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
} from "lucide-react";

export const features = [
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
];

export const featuredProducts = [
  {
    id: "1",
    name: "Classic White Sneakers",
    price: 89.99,
    salePrice: 79.99,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 124,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Urban Runner Pro",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=cro",
    rating: 4.6,
    reviews: 89,
    badge: "New",
  },
  {
    id: "3",
    name: "Oxford Business Shoes",
    price: 199.99,
    salePrice: 179.99,
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 67,
    badge: "Premium",
  },
  {
    id: "4",
    name: "Summer Comfort Sandals",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 156,
    badge: "Popular",
  },
];

export const categories = [
  {
    name: "Sneakers",
    slug: "sneakers",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop",
    count: 45,
  },
  {
    name: "Boots",
    slug: "boots",
    image:
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=300&h=200&fit=crop",
    count: 32,
  },
  {
    name: "Athletic",
    slug: "athletic",
    image:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=200&fit=crop",
    count: 28,
  },
  {
    name: "Dress Shoes",
    slug: "dress-shoes",
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=200&fit=crop",
    count: 19,
  },
];