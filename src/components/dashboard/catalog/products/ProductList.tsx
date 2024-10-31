'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface Product {
    id: string
    barcode: string
    name: string
    category: string
    brand: string
    price: string
    quantity: number
}

const products: Product[] = [
    { id: '1', barcode: '2233', name: 'OASIS', category: 'Perfume', brand: '19 Feb 2024', price: 'MMK 0.00', quantity: 11 },
    { id: '2', barcode: '2233', name: 'OASIS', category: 'Perfume', brand: '19 Feb 2024', price: 'MMK 0.00', quantity: 11 },
]

export default function ProductsTable() {
    const [selectedRows, setSelectedRows] = useState<string[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState('8')
    const [currentPage, setCurrentPage] = useState(1)

    const handleSelectAll = () => {
        if (selectedRows.length === products.length) {
            setSelectedRows([])
        } else {
            setSelectedRows(products.map(product => product.id))
        }
    }

    const handleSelectRow = (productId: string) => {
        setSelectedRows(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        )
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Products</h1>
                    <p className="text-sm text-gray-500">Review and manage the services your business offers.</p>
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Options" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button>Add</Button>
                </div>
            </div>

            <div className="flex gap-2 mb-4">
                <div className="relative flex-grow">
                    <Input
                        type="text"
                        placeholder="Search service name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                </div>
                <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                </Button>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">
                                <Checkbox
                                    checked={selectedRows.length === products.length}
                                    onCheckedChange={handleSelectAll}
                                />
                            </TableHead>
                            <TableHead>Barcode</TableHead>
                            <TableHead>Product name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedRows.includes(product.id)}
                                        onCheckedChange={() => handleSelectRow(product.id)}
                                    />
                                </TableCell>
                                <TableCell>{product.barcode}</TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 bg-gray-200 rounded mr-2" />
                                        {product.name}
                                    </div>
                                </TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                    {selectedRows.length} of {products.length} row(s) selected
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm">Rows per page</span>
                        <Select value={rowsPerPage} onValueChange={setRowsPerPage}>
                            <SelectTrigger className="w-[70px]">
                                <SelectValue>{rowsPerPage}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="16">16</SelectItem>
                                <SelectItem value="24">24</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="text-sm">Page 1 of 2</div>
                    <div className="flex gap-1">
                        <Button variant="outline" size="icon">
                            <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                            <ChevronsRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}