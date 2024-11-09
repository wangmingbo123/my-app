'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import ImageCarousel from "@/components/ImageCarousel";

interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  variants: { color: string; size: string }[]
  rating: number
  reviews: number
}

const mockProduct: Product = {
  id: '1',
  name: 'Premium Comfort T-Shirt',
  price: 29.99,
  description: 'Experience unparalleled comfort with our Premium Comfort T-Shirt. Made from 100% organic cotton, this shirt is perfect for everyday wear. Its breathable fabric keeps you cool and comfortable all day long. The versatile design makes it suitable for casual outings, work, or even light exercise. Available in multiple colors and sizes, this T-shirt is a must-have addition to your wardrobe.',
  images: [
    'https://ibiuepbjxpgufdvklagl.supabase.co/storage/v1/object/public/userinfo/test/demo.jpeg',
    'https://ibiuepbjxpgufdvklagl.supabase.co/storage/v1/object/public/userinfo/test/demo.jpeg',
    'https://ibiuepbjxpgufdvklagl.supabase.co/storage/v1/object/public/userinfo/test/demo.jpeg',
  ],
  variants: [
    { color: 'White', size: 'S' },
    { color: 'White', size: 'M' },
    { color: 'White', size: 'L' },
    { color: 'Black', size: 'S' },
    { color: 'Black', size: 'M' },
    { color: 'Black', size: 'L' },
  ],
  rating: 4.5,
  reviews: 128,
}


// 商品详情页面

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // In a real application, fetch the product data based on the id
    // For this example, we'll use the mock data
    setProduct(mockProduct)
    setLoading(false)
  }, [id])

  const handleAddToCart = () => {
    console.log('Added to cart:', {
      product: product?.name,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
    // Implement your add to cart logic here
  }

  if (loading) {
    return (
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-8">
                <Skeleton className="w-full h-[400px] rounded-lg" />
                <div className="space-y-4">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-4">
                    <Skeleton className="h-10 w-1/3" />
                    <Skeleton className="h-10 w-1/3" />
                  </div>
                  <Skeleton className="h-12 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
    )
  }

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>
  }

  return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <div className="w-full max-w-2xl mx-auto">
                <ImageCarousel images={product.images} />
              </div>
              <div className="space-y-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                </div>
                <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
                <p className="text-gray-600">{product.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Select onValueChange={setSelectedColor} value={selectedColor}>
                      <SelectTrigger id="color">
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(new Set(product.variants.map(v => v.color))).map((color) => (
                            <SelectItem key={color} value={color}>{color}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="size">Size</Label>
                    <Select onValueChange={setSelectedSize} value={selectedSize}>
                      <SelectTrigger id="size">
                        <SelectValue placeholder="Select a size" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from(new Set(product.variants.map(v => v.size))).map((size) => (
                            <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-20"
                  />
                </div>
                <Button onClick={handleAddToCart} className="w-full">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}