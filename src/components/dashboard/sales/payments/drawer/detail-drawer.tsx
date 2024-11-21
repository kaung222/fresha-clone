'use client'
import { useGetDetailPayment } from "@/api/payment/get-detail-payment"
import CircleLoading from "@/components/layout/circle-loading"
import Modal from "@/components/modal/Modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { secondToHour } from "@/lib/utils"
import { format } from "date-fns"
import { CheckCircle2, X } from "lucide-react"
import { useRouter } from "next/navigation"

const saleData = {
    status: "Complete",
    date: "Sat 12 Oct 2024",
    client: {
        name: "Nan Nan San",
        phone: "+959 253708322",
        email: "Nansan4456@gmail.com",
    },
    saleDetails: {
        number: 4,
        date: "Sat 12 Oct 2024",
        service: "Manual payment",
        duration: "5 min",
        provider: "Mg Kaung",
        amount: 20000,
        tip: 2000,
        total: 22000,
        paymentMethod: "Cash",
        paymentTime: "Sat 12 Oct 2024 at 20:29",
    },
}

export default function DetailPaymentDrawer() {
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const paymentId = getQuery('drawer_detail');
    const { data: detailPayment, isLoading } = useGetDetailPayment(paymentId)

    const handleClose = () => {
        router.push('/payment')
    }



    return (
        <Modal onClose={handleClose}>
            <div className=" w-auto md:w-[600px] p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="">
                        <h1 className="text-2xl font-bold mb-1">Payment</h1>
                        {detailPayment && (
                            <p className="text-gray-500 mb-4">{format(detailPayment.createdAt, "EEE dd MMM yyyy HH:mm")}</p>
                        )}
                    </div>
                    <div className="flex items-center space-x-2">

                    </div>
                </div>

                {isLoading ? (
                    <CircleLoading />
                ) : detailPayment && (
                    <>
                        <Card className="mb-4">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="font-semibold">{saleData.client.name}</h2>
                                        <p className="text-sm text-gray-500">{saleData.client.phone}</p>
                                        <p className="text-sm text-gray-500">{saleData.client.email}</p>
                                    </div>
                                    <Avatar className="h-10 w-10 bg-gray-200">
                                        <AvatarFallback>{saleData.client.name[0]}</AvatarFallback>
                                    </Avatar>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">

                                <div>
                                    <h2 className=" font-semibold mb-2 "> Services </h2>
                                    {detailPayment.services.length > 0 ? (
                                        detailPayment.services?.map((service) => (
                                            <div key={service.id} className="flex justify-between mb-2">
                                                <div>
                                                    <p className="font-[400] text-sm">{service.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {secondToHour(service.duration, 'duration')}
                                                    </p>
                                                </div>
                                                <p className="font-[400] text-sm">MMK {service.price}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <h2>No service</h2>
                                    )}
                                </div>

                                <hr className="my-4" />

                                <div>
                                    <h2 className=" font-semibold mb-2 "> Products </h2>
                                    {detailPayment.products.length > 0 ? (
                                        detailPayment.products?.map((product) => (
                                            <div key={product?.id} className="flex justify-between mb-2">
                                                <div>
                                                    <p className="font-[400] text-sm">{product.name}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {product.brand}
                                                    </p>
                                                </div>
                                                <p className="font-[400] text-sm">MMK {product.price}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div>No product</div>
                                    )}
                                </div>

                                <hr className="my-4" />

                                <div className="space-y-2">

                                    <div className="flex justify-between">
                                        <p className="text-sm">Service sales</p>
                                        <p className="font-[400] text-sm">MMK {detailPayment.services.reduce((pv, cv) => pv + Number(cv.price), 0)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm">Product sales</p>
                                        <p className="font-[400] text-sm">MMK {detailPayment.products.reduce((pv, cv) => pv + Number(cv.price), 0)}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p className="text-sm font-semibold">Total (Paid with {detailPayment.method})</p>
                                        <p className="font-medium">MMK {detailPayment.amount}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </Modal>

    )
}