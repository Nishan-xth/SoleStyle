"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, X, Loader2 } from "lucide-react"
import type { Product, Category } from "@/lib/types"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Form state for product upload
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    categoryId: "",
    brand: "",
    sku: "",
    featured: false,
    images: [] as File[],
    variants: [{ size: "", color: "", stockQuantity: "" }],
  })

  useEffect(() => {
    fetchProducts()
    fetchCategories()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?limit=50")
      const data = await response.json()
      if (response.ok) {
        setProducts(data.products)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      const data = await response.json()
      if (response.ok) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadLoading(true)

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append("name", productForm.name)
      formData.append("description", productForm.description)
      formData.append("price", productForm.price)
      formData.append("salePrice", productForm.salePrice)
      formData.append("categoryId", productForm.categoryId)
      formData.append("brand", productForm.brand)
      formData.append("sku", productForm.sku)
      formData.append("featured", productForm.featured.toString())
      formData.append("variants", JSON.stringify(productForm.variants))

      // Add images
      productForm.images.forEach((image, index) => {
        formData.append(`image-${index}`, image)
      })

      const response = await fetch("/api/admin/products", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Product created successfully",
        })
        setIsUploadDialogOpen(false)
        resetForm()
        fetchProducts()
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to create product",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while creating the product",
        variant: "destructive",
      })
    } finally {
      setUploadLoading(false)
    }
  }

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      salePrice: "",
      categoryId: "",
      brand: "",
      sku: "",
      featured: false,
      images: [],
      variants: [{ size: "", color: "", stockQuantity: "" }],
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setProductForm((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }))
  }

  const removeImage = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const addVariant = () => {
    setProductForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { size: "", color: "", stockQuantity: "" }],
    }))
  }

  const updateVariant = (index: number, field: string, value: string) => {
    setProductForm((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) => (i === index ? { ...variant, [field]: value } : variant)),
    }))
  }

  const removeVariant = (index: number) => {
    setProductForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }))
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category?.slug === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>Fill in the details below to add a new product to your catalog.</DialogDescription>
            </DialogHeader>

            <form onSubmit={handleProductSubmit} className="space-y-6">
              <Tabs defaultValue="basic" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="variants">Variants</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={productForm.name}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter product name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand *</Label>
                      <Input
                        id="brand"
                        value={productForm.brand}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, brand: e.target.value }))}
                        placeholder="Enter brand name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter product description"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, price: e.target.value }))}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salePrice">Sale Price</Label>
                      <Input
                        id="salePrice"
                        type="number"
                        step="0.01"
                        value={productForm.salePrice}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, salePrice: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sku">SKU</Label>
                      <Input
                        id="sku"
                        value={productForm.sku}
                        onChange={(e) => setProductForm((prev) => ({ ...prev, sku: e.target.value }))}
                        placeholder="Enter SKU"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={productForm.categoryId}
                      onValueChange={(value) => setProductForm((prev) => ({ ...prev, categoryId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm((prev) => ({ ...prev, featured: e.target.checked }))}
                    />
                    <Label htmlFor="featured">Featured Product</Label>
                  </div>
                </TabsContent>

                <TabsContent value="images" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="images">Product Images</Label>
                    <Input id="images" type="file" multiple accept="image/*" onChange={handleImageUpload} />
                  </div>

                  {productForm.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {productForm.images.map((image, index) => (
                        <div key={index} className="relative">
                          <Image
                            src={URL.createObjectURL(image) || "/placeholder.svg"}
                            alt={`Product image ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="variants" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Product Variants (Size & Color)</Label>
                    <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Variant
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {productForm.variants.map((variant, index) => (
                      <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Label>Size</Label>
                          <Input
                            value={variant.size}
                            onChange={(e) => updateVariant(index, "size", e.target.value)}
                            placeholder="e.g., 9, M, L"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Color</Label>
                          <Input
                            value={variant.color}
                            onChange={(e) => updateVariant(index, "color", e.target.value)}
                            placeholder="e.g., Black, White"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Stock</Label>
                          <Input
                            type="number"
                            value={variant.stockQuantity}
                            onChange={(e) => updateVariant(index, "stockQuantity", e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeVariant(index)}
                            disabled={productForm.variants.length === 1}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={uploadLoading}>
                  {uploadLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Product
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Catalog</CardTitle>
          <CardDescription>{filteredProducts.length} products found</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt={product.name}
                          width={40}
                          height={40}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.brand}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>
                      <div>
                        {product.salePrice ? (
                          <>
                            <span className="font-medium">${product.salePrice}</span>
                            <span className="text-sm text-muted-foreground line-through ml-2">${product.price}</span>
                          </>
                        ) : (
                          <span className="font-medium">${product.price}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {product.variants?.reduce((total, variant) => total + variant.stockQuantity, 0) || 0} units
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={product.status === "active" ? "default" : "secondary"}>{product.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
