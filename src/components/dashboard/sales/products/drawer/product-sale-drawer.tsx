'use client'
import { GetOrganizationProfile } from "@/api/organization/get-organization-profile"
import { useGetDetailPayment } from "@/api/payment/get-detail-payment"
import { GetDetailProductSale } from "@/api/sales/detail-product-sale"
import CircleLoading from "@/components/layout/circle-loading"
import Modal from "@/components/modal/Modal"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { secondToHour, shortName } from "@/lib/utils"
import { format } from "date-fns"
import { ArrowLeft, Calendar, CheckCircle2, ClipboardList, CreditCard, DollarSign, Package, ShoppingBag, User, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DetailProductSale() {
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const saleId = getQuery('sale-detail');
    const { data: organization } = GetOrganizationProfile()
    const { data: saleDetail, isLoading } = GetDetailProductSale(saleId)

    const handleClose = () => {
        router.push('/sales/products')
    }



    return (
        <Modal onClose={handleClose}>
            <div className="h-full w-full">

                <div className="text-left px-3 md:px-10 py-3 border-b flex items-center justify-between ">
                    <div>
                        <div className=" font-bold text-xl ">Sale Details</div>
                        <div className=" text-sm text-gray-500">View details for sale ID: {saleId}</div>
                    </div>
                    <div className=" block lg:hidden ">
                        <Button className=" rounded-full " variant={'outline'}>
                            <X className=" w-4 h-4 " />
                        </Button>
                    </div>
                </div>
                <ScrollArea className="px-3 md:px-10 h-full">
                    {isLoading ? (
                        <CircleLoading />
                    ) : saleDetail && (
                        <div className="grid gap-4 mb-40 ">
                            <div className="flex items-center space-x-4 rounded-lg border p-4 mt-5">
                                <DollarSign className="h-6 w-6 text-[#FF66A1]" />
                                <div>
                                    <Label className="text-sm font-semibold">Total Price</Label>
                                    <p className="text-2xl font-bold">{organization?.currency}{saleDetail.totalPrice.toFixed(2)}</p>
                                </div>
                            </div>
                            <div className="grid gap-2 mt-5">
                                <div className="flex items-center space-x-2">
                                    <User className="h-4 w-4 text-[#FF66A1]" />
                                    <Label>Customer</Label>
                                </div>
                                <p className="text-sm">{saleDetail.username}</p>
                                {saleDetail.email && <p className="text-sm">{saleDetail.email}</p>}
                                {saleDetail.phone && <p className="text-sm">{saleDetail.phone}</p>}
                            </div>
                            <Separator />
                            <div className="grid gap-2 mt-5 ">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-[#FF66A1]" />
                                    <Label>Created At</Label>
                                </div>
                                <p className="text-sm">{format(new Date(saleDetail.createdAt), 'PPpp')}</p>
                            </div>
                            <Separator />
                            <div className="grid gap-2 mt-5">
                                <div className="flex items-center space-x-2">
                                    <ClipboardList className="h-4 w-4 text-[#FF66A1]" />
                                    <Label>Notes</Label>
                                </div>
                                <p className="text-sm">{saleDetail.notes || 'No notes available'}</p>
                            </div>
                            <Separator />
                            <div className="grid gap-2 mt-5 ">
                                <div className="flex items-center space-x-2">
                                    <ShoppingBag className="h-4 w-4 text-[#FF66A1]" />
                                    <Label>Sale Items</Label>
                                </div>
                                {saleDetail.saleItems.map((item) => (
                                    <div key={item.id} className="rounded-lg border p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                                            </div>
                                            <p className="font-medium">{organization?.currency}{item.subtotalPrice.toFixed(2)}</p>
                                        </div>
                                        <Separator className="my-2" />
                                        <div className="grid gap-1 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Package className="h-3 w-3 text-[#FF66A1]" />
                                                <span>Product Details:</span>
                                            </div>
                                            <p>Price: {organization?.currency}{item.product.price.toFixed(2)}</p>
                                            {item.product.discount > 0 && (
                                                <p>Discount: {item.product.discount}{item.product.discountType === 'percent' ? '%' : organization?.currency}</p>
                                            )}
                                            {item.product.brand && <p>Brand: {item.product.brand}</p>}
                                            {item.product.category && <p>Category: {item.product.category}</p>}
                                            <p>Stock: {item.product.stock}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </ScrollArea>
            </div>
        </Modal>

    )
}
