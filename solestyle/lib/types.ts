export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  salePrice?: number
  categoryId: string
  brand: string
  sku: string
  status: "active" | "inactive" | "out_of_stock"
  featured: boolean
  createdAt: string
  updatedAt: string
  category?: Category
  images?: ProductImage[]
  variants?: ProductVariant[]
  reviews?: ProductReview[]
  averageRating?: number
  reviewCount?: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  imageUrl?: string
  createdAt: string
}

export interface ProductImage {
  id: string
  productId: string
  imageUrl: string
  altText?: string
  sortOrder: number
  isPrimary: boolean
}

export interface ProductVariant {
  id: string
  productId: string
  size: string
  color: string
  stockQuantity: number
  sku: string
  createdAt: string
}

export interface ProductReview {
  id: string
  productId: string
  userId: string
  rating: number
  title?: string
  comment?: string
  verifiedPurchase: boolean
  createdAt: string
  updatedAt: string
  user?: {
    firstName: string
    lastName: string
  }
}

export interface CartItem {
  id: string
  userId: string
  productId: string
  productVariantId: string
  quantity: number
  createdAt: string
  updatedAt: string
  product?: Product
  variant?: ProductVariant
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  subtotal: number
  taxAmount: number
  shippingAmount: number
  totalAmount: number
  currency: string
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentMethod?: string
  shippingAddressId?: string
  billingAddressId?: string
  notes?: string
  createdAt: string
  updatedAt: string
  items?: OrderItem[]
  shippingAddress?: Address
  billingAddress?: Address
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  productVariantId: string
  quantity: number
  unitPrice: number
  totalPrice: number
  productName: string
  productSku?: string
  size: string
  color: string
}

export interface Address {
  id: string
  userId: string
  type: "shipping" | "billing"
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  isDefault: boolean
  createdAt: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: "customer" | "admin"
  createdAt: string
  updatedAt: string
}
