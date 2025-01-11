'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, PackageOpen, ArrowLeft } from 'lucide-react'
import SelectProductDrawer from './select-product'
import { Product } from '@/types/product'
import { toast } from '@/components/ui/use-toast'
import { ProductQuickSale } from '@/api/sales/product-quick-sale'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import SelectClientDrawer from '@/components/dashboard/calendar/drawers/create/select-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MiniClient } from '@/components/dashboard/calendar/drawers/create/CreateAppointmentDrawer'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { defaultClient } from '@/lib/data'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'

export type ExtendProduct = Product & {
    quantity: number;
}
type PaymentMethod = 'Cash' | 'KBZ pay' | "AYA pay" | "Wave pay";

const paymentMethods: { name: string, value: PaymentMethod }[] = [
    { name: "Cash", value: 'Cash' },
    { name: "KBZ pay", value: 'KBZ pay' },
    { name: "AYA pay", value: 'AYA pay' },
    { name: "Wave pay", value: 'Wave pay' },
]
type PayloadType = {
    notes?: string;
    username?: string;
    saleItems: {
        productId: string;
        quantity: number;
    }[];
    savePayment: boolean;
    paymentMethod: PaymentMethod;
}


export default function QuicksSalePage() {
    const [showProductSelect, setShowProductSelect] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState<ExtendProduct[]>([]);
    const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
    const [save, setSave] = useState<boolean>(true);
    const [method, setMethod] = useState<PaymentMethod>('Cash');
    const { data: organization } = GetOrganizationProfile()
    const [client, setClient] = useState<MiniClient | null>({ profilePicture: defaultClient.profilePicture, username: defaultClient.firstName, email: defaultClient.email, phone: defaultClient.phone, gender: defaultClient.gender });
    const [notes, setNotes] = useState('');
    const router = useRouter()
    const { deleteQuery } = useSetUrlParams()
    const { mutate } = ProductQuickSale();


    const removeProduct = (id: string) => {
        setSelectedProducts((pre) => pre.filter((pro) => pro.id != id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setSelectedProducts(pre => pre.map(product => product.id == id ? { ...product, quantity: Math.max(1, quantity) } : product))

    }

    const total = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSave = () => {
        if (selectedProducts) {
            const payload: PayloadType = {
                username: client ? `${client?.username}` : 'unknown',
                notes: notes,
                saleItems: selectedProducts.map((product) => ({ productId: product.id, quantity: product.quantity })),
                savePayment: save,
                paymentMethod: method
            }
            mutate(payload, {
                onSuccess() {
                    setSelectedProducts([]);
                    router.push(`/sales/products`)
                }
            })
        } else {
            toast({ title: 'no item to sale' })
        }
    }

    return (
        <>
            <div className=" h-screen w-screen fixed top-0 left-0 z-[50] ">
                <Card className="w-full h-full flex flex-col ">
                    <CardHeader className="border-b p-3 md:px-6 bg-brandColor ">
                        <div className="flex justify-between items-center">
                            <div>
                                <Link href={'/sales/products'} className=' text-white px-4 py-2 rounded-lg '>
                                    <ArrowLeft className=' w-6 h-6 ' />
                                </Link>
                            </div>
                            <div>
                                {
                                    client ? (
                                        <Button onClick={() => setShowClientSelect(true)} variant="ghost" className=" w-[150px] hover:bg-brandColorLight/70 md:w-[250px] border-none relative group flex items-center gap-2 md:gap-4 justify-start h-10 md:h-16 px-4 py-2 md:py-3">
                                            <Avatar className=" h-6 w-6 md:h-10 md:w-10 ">
                                                <AvatarImage src={client?.profilePicture} alt={shortName(client?.username)} className=' object-cover ' />
                                                <AvatarFallback>{shortName(client?.username)}</AvatarFallback>
                                            </Avatar>
                                            <div className="text-left block group-hover:hidden duration-300 text-white">
                                                <div className=' font-medium md:font-semibold text-sm md:text-lg'>{client?.username}</div>
                                                <div className=" font-text  text-xs md:text-sm">{client?.email}</div>
                                            </div>
                                            <div className=' text-left hidden group-hover:block duration-300 text-white '>
                                                <h2 className=' font-medium md:font-semibold '>Change Client</h2>
                                            </div>
                                        </Button>
                                    ) : (
                                        <Button onClick={() => setShowClientSelect(true)} variant={'outline'} className=" flex items-center w-[150px] md:w-[200px] justify-start text-purple-600 h-16 gap-2 ">
                                            <span className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-10 flex justify-center items-center ">
                                                <Plus className="h-5 w-5 inline-block " />
                                            </span>
                                            <span>add client</span>
                                        </Button>
                                    )
                                }
                            </div>
                            {/* <div className="text-right text-white">
                                <p className="font-semibold">Product sale</p>
                                <p className="text-sm ">Date: {new Date().toLocaleDateString()}</p>
                            </div> */}
                        </div>
                    </CardHeader>
                    <div className="p-6 flex-grow overflow-auto">
                        <div className=" w-full flex justify-between  gap-2 items-center mb-2 ">

                            <div></div>

                            <Button variant={'brandDefault'} type='button' onClick={() => setShowProductSelect(true)} className=" ">
                                Add Product
                            </Button>
                        </div>


                        <Table className=' border '>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="">Product</TableHead>
                                    <TableHead className="">Price</TableHead>
                                    <TableHead className="">Quantity</TableHead>
                                    <TableHead className="">Subtotal</TableHead>
                                    <TableHead className="">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedProducts && selectedProducts?.length > 0 ? (
                                    selectedProducts?.map((product) => (
                                        <TableRow key={product.id}>
                                            <TableCell className="">{product?.name}</TableCell>
                                            <TableCell className="">{product?.price}</TableCell>
                                            <TableCell className=" ">
                                                <Input
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                                    className="w-16 text-center"
                                                    min="1"
                                                />
                                            </TableCell>
                                            <TableCell className="">{(product.price * product.quantity).toFixed(0)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeProduct(product.id)}
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-12 ">
                                            <div className=' w-full '>
                                                <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                                                <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products</h3>
                                                <p className="mt-1 text-sm text-muted-foreground">Get started by adding a new product.</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                        <div>
                            <Label>Notes</Label>
                            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder='Set notes..' className="focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0" />
                        </div>
                    </div>
                    <CardFooter className=" mt-auto shadow-dialog flex flex-col border-t px-3 md:px-6 py-2">
                        <div className=" w-full flex justify-between items-center ">
                            <div className=" text-sm md:text-xl font-semibold">Total:</div>
                            <div className=" text-sm md:text-xl font-semibold">{total.toFixed(2)} {organization?.currency || "MMK"}</div>
                        </div>
                        <div className=" w-full flex justify-between items-center ">
                            <div className=' flex items-center gap-2 '>
                                <Label>Payment Method</Label>
                                <Select value={method} onValueChange={(e: PaymentMethod) => setMethod(e)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {paymentMethods.map((method, index) => (
                                            <SelectItem key={index} value={method.value}>{method.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className=' flex items-center gap-2 '>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="savePayment" checked={save} onCheckedChange={(checked) => setSave(checked as boolean)} />
                                    <Label htmlFor="savePayment">Save payment record</Label>
                                </div>
                                <Button disabled={!selectedProducts} variant="brandDefault" onClick={() => handleSave()} className=" lg:min-w-[150px] ">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
                {
                    showProductSelect && (
                        <SelectProductDrawer selectedProducts={selectedProducts} setShowProductSelect={setShowProductSelect} setSelectedProducts={setSelectedProducts} />
                    )
                }
                {
                    showClientSelect && (
                        <SelectClientDrawer setShowClientSelect={setShowClientSelect} setChooseClient={setClient} />
                    )
                }
            </div>
        </>
    )
}