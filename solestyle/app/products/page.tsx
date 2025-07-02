"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Star, Filter, Grid, List } from "lucide-react"
import type { Product } from "@/lib/types"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 500,
    sortBy: "created_at",
    sortOrder: "desc",
  })
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  })

  const searchParams = useSearchParams()

  useEffect(() => {
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    if (category) {
      setFilters((prev) => ({ ...prev, category }))
    }
    if (search) {
      setFilters((prev) => ({ ...prev, search }))
    }
  }, [searchParams])

  useEffect(() => {
    fetchProducts()
  }, [filters, pagination.page])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
        ...(filters.minPrice > 0 && { minPrice: filters.minPrice.toString() }),
        ...(filters.maxPrice < 500 && { maxPrice: filters.maxPrice.toString() }),
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      })

      const response = await fetch(`/api/products?${params}`)
      const data = await response.json()

      if (response.ok) {
        setProducts(data.products)
        setPagination((prev) => ({
          ...prev,
          total: data.pagination.total,
          totalPages: data.pagination.totalPages,
        }))
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
  }

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 space-y-6">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4 flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </h3>

            {/* Search */}
            <div className="space-y-2 mb-4">
              <Label>Search</Label>
              <Input
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>

            {/* Price Range */}
            <div className="space-y-2 mb-4">
              <Label>
                Price Range: ${filters.minPrice} - ${filters.maxPrice}
              </Label>
              <Slider
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={([min, max]) => {
                  handleFilterChange("minPrice", min)
                  handleFilterChange("maxPrice", max)
                }}
                max={500}
                step={10}
                className="w-full"
              />
            </div>

            {/* Sort */}
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onValueChange={(value) => {
                  const [sortBy, sortOrder] = value.split("-")
                  handleFilterChange("sortBy", sortBy)
                  handleFilterChange("sortOrder", sortOrder)
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at-desc">Newest First</SelectItem>
                  <SelectItem value="created_at-asc">Oldest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Products</h1>
              <p className="text-muted-foreground">
                Showing {products.length} of {pagination.total} products
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Grid/List */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="h-64 bg-muted rounded-t-lg" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                      <div className="h-4 bg-muted rounded w-1/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className={viewMode === "grid" ? "p-0" : "p-4"}>
                    <div className={viewMode === "grid" ? "block" : "flex gap-4"}>
                      <div
                        className={
                          viewMode === "grid"
                            ? "relative overflow-hidden rounded-t-lg"
                            : "relative overflow-hidden rounded-lg w-48 h-48 flex-shrink-0"
                        }
                      >
                        <Image
                          src={ "/placeholder.svg?height=300&width=300"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className={`${viewMode === "grid" ? "w-full h-64" : "w-full h-full"} object-cover group-hover:scale-105 transition-transform duration-300`}
                        />
                        {product.featured && <Badge className="absolute top-2 left-2">Featured</Badge>}
                        {product.salePrice && (
                          <Badge variant="destructive" className="absolute top-2 right-2">
                            Sale
                          </Badge>
                        )}
                      </div>

                      <div className={viewMode === "grid" ? "p-4 space-y-2" : "flex-1 space-y-2"}>
                        <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.brand}</p>

                        <div className="flex items-center space-x-1">
                          <div className="flex items-center">{renderStars(product.averageRating || 0)}</div>
                          <span className="text-sm text-muted-foreground">({product.reviewCount || 0})</span>
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                disabled={pagination.page === 1}
                onClick={() => handlePageChange(pagination.page - 1)}
              >
                Previous
              </Button>

              {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <Button
                    key={pageNum}
                    variant={pagination.page === pageNum ? "default" : "outline"}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}

              <Button
                variant="outline"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => handlePageChange(pagination.page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
