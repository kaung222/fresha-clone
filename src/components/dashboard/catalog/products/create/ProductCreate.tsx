import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X } from 'lucide-react'

export default function ProductCreate() {
    const [productImage, setProductImage] = useState<string | null>(null)
    const [retailSales, setRetailSales] = useState(false)
    const [teamMemberCommission, setTeamMemberCommission] = useState(false)
    const [trackStockQuantity, setTrackStockQuantity] = useState(false)

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
                <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                </Button>
                <h1 className="text-2xl font-bold">Add new product</h1>
                <Button type="submit" form="add-product-form">Save</Button>
            </div>

            <form id="add-product-form" onSubmit={handleSubmit} className="space-y-8">
                <div className="flex gap-8">
                    <div className="w-1/3">
                        <Card className="h-48">
                            <CardContent className="flex items-center justify-center h-full">
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
                            </CardContent>
                        </Card>
                    </div>

                    <div className="w-2/3 space-y-6">
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
                                    <>
                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <Label htmlFor="retail-price">Retail price</Label>
                                                <Input id="retail-price" placeholder="MMK 0.00" />
                                            </div>
                                            <div className="w-1/2">
                                                <Label htmlFor="mark-up">Mark up</Label>
                                                <Input id="mark-up" placeholder="% 0.00" />
                                            </div>
                                        </div>
                                        <div>
                                            <Label htmlFor="tax">Tax</Label>
                                            <Input id="tax" placeholder="MMK 0.00" />
                                        </div>
                                    </>
                                )}
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="team-member-commission">Team member commission</Label>
                                    <Switch
                                        id="team-member-commission"
                                        checked={teamMemberCommission}
                                        onCheckedChange={setTeamMemberCommission}
                                    />
                                </div>
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </div>
    )
}