'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X } from 'lucide-react'

export default function AddNewProduct() {
    const [productImage, setProductImage] = useState<string | null>(null)
    const [retailSales, setRetailSales] = useState(false)
    const [trackStockQuantity, setTrackStockQuantity] = useState(false)
    const [lowStockNotifications, setLowStockNotifications] = useState(false)

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProductImage(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Handle form submission logic here
        console.log('Form submitted')
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Add new product</h1>
                <div>
                    <Button variant="outline" className="mr-2">Cancel</Button>
                    <Button type="submit" form="add-product-form">Save</Button>
                </div>
            </div>

            <form id="add-product-form" onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Product photo</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                            {productImage ? (
                                <img src={productImage} alt="Product" className="max-h-full" />
                            ) : (
                                <div className="text-center">
                                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-500">Add a photo</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                        id="product-image"
                                    />
                                    <Label htmlFor="product-image" className="mt-2 cursor-pointer text-blue-500">
                                        Upload
                                    </Label>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Basic info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="product-name">Product name</Label>
                            <Input id="product-name" />
                        </div>
                        <div>
                            <Label htmlFor="product-barcode">Product barcode (Optional)</Label>
                            <Input id="product-barcode" placeholder="UPC, EAN, GTIN" />
                        </div>
                        <div>
                            <Label htmlFor="product-brand">Product brand</Label>
                            <Select>
                                <SelectTrigger id="product-brand">
                                    <SelectValue placeholder="Select a brand" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="brand1">Brand 1</SelectItem>
                                    <SelectItem value="brand2">Brand 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1/2">
                                <Label htmlFor="deposits">Deposits</Label>
                                <Select>
                                    <SelectTrigger id="deposits">
                                        <SelectValue placeholder="Milliliters (ml)" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ml">Milliliters (ml)</SelectItem>
                                        <SelectItem value="g">Grams (g)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" placeholder="0.00" />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="short-description">Short description</Label>
                            <Textarea id="short-description" placeholder="0/100" />
                        </div>
                        <div>
                            <Label htmlFor="product-description">Product description</Label>
                            <Textarea id="product-description" placeholder="0/1000" />
                        </div>
                        <div>
                            <Label htmlFor="product-category">Product category</Label>
                            <Select>
                                <SelectTrigger id="product-category">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="category1">Category 1</SelectItem>
                                    <SelectItem value="category2">Category 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pricing</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="supply-price">Supply price</Label>
                            <Input id="supply-price" placeholder="MMK 0.00" />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="retail-sales">Retail sales</Label>
                            <Switch
                                id="retail-sales"
                                checked={retailSales}
                                onCheckedChange={setRetailSales}
                            />
                        </div>
                        {retailSales && (
                            <p className="text-sm text-gray-500">Allow sales of this product at checkout.</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Inventory</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="sku">SKU (Stock Keeping Unit)</Label>
                            <Input id="sku" />
                        </div>
                        <div>
                            <Button variant="link" className="p-0">Generate SKU automatically</Button>
                        </div>
                        <div>
                            <Button variant="link" className="p-0">Add another SKU code</Button>
                        </div>
                        <div>
                            <Label htmlFor="supplier">Supplier</Label>
                            <Select>
                                <SelectTrigger id="supplier">
                                    <SelectValue placeholder="Select a Supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="supplier1">Supplier 1</SelectItem>
                                    <SelectItem value="supplier2">Supplier 2</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="track-stock-quantity">Track stock quantity</Label>
                            <Switch
                                id="track-stock-quantity"
                                checked={trackStockQuantity}
                                onCheckedChange={setTrackStockQuantity}
                            />
                        </div>
                        {trackStockQuantity && (
                            <div>
                                <Label htmlFor="current-stock-quantity">Current stock quantity</Label>
                                <Input id="current-stock-quantity" placeholder="0" />
                            </div>
                        )}
                        <div>
                            <h4 className="font-medium mb-2">Low stock and reordering</h4>
                            <p className="text-sm text-gray-500 mb-2">
                                Fresha will automatically notify you and pre-fill the reorder quantity set for future stock orders.{' '}
                                <a href="#" className="text-blue-500">Learn more</a>
                            </p>
                            <div className="flex gap-4 mb-2">
                                <div className="w-1/2">
                                    <Label htmlFor="low-stock-level">Low stock level</Label>
                                    <Input id="low-stock-level" placeholder="0" />
                                    <p className="text-xs text-gray-500 mt-1">The level to get notified to reorder</p>
                                </div>
                                <div className="w-1/2">
                                    <Label htmlFor="reorder-quantity">Reorder quantity</Label>
                                    <Input id="reorder-quantity" placeholder="0" />
                                    <p className="text-xs text-gray-500 mt-1">The default amount to order</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="low-stock-notifications">Low stock notifications</Label>
                                <Switch
                                    id="low-stock-notifications"
                                    checked={lowStockNotifications}
                                    onCheckedChange={setLowStockNotifications}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    )
}