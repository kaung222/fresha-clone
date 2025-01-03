'use client'
import { useGetDetailPayment } from "@/api/payment/get-detail-payment"
import CircleLoading from "@/components/layout/circle-loading"
import Modal from "@/components/modal/Modal"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { format } from "date-fns"
import { ArrowLeft, Calendar, ClipboardList, CreditCard, DollarSign, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function DetailPaymentDrawer() {
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const paymentId = getQuery('drawer_detail');
    const { data: detailPayment, isLoading } = useGetDetailPayment(paymentId)

    const handleClose = () => {
        router.push('/payments')
    }



    return (
        <Modal onClose={handleClose}>
            <div className=" py-0 lg:py-10 w-full h-full overflow-auto ">
                <div className=" block lg:hidden mb-3 md:mb-10 px-3 md:px-10 py-3 border-b sticky top-0 bg-white ">
                    <Button variant={'ghost'} onClick={handleClose} >
                        <ArrowLeft className=" w-6 h-6 text-brandColor " />
                    </Button>
                </div>
                <div className="text-left px-3 md:px-10">
                    <h3 className=" font-semibold text-xl ">Payment Details {`(${detailPayment?.appointment ? "For Appointment" : "For Product Sale"})`}</h3>
                    <p className=" text-sm text-gray-500 ">View details for payment ID: {paymentId}</p>
                </div>
                {isLoading ? (
                    <CircleLoading />
                ) : detailPayment && (
                    <>

                        <div className="p-4 pb-0 px-3 md:px-10 ">
                            <div className="grid gap-4">
                                <div className="flex items-center space-x-4 rounded-lg border p-4 mt-5 lg:mt-0 ">
                                    <DollarSign className="h-6 w-6 text-[#FF66A1]" />
                                    <div>
                                        <Label className="text-sm font-medium">Amount</Label>
                                        <p className="text-2xl font-bold">${detailPayment.amount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="grid gap-2 mt-5 ">
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4 text-[#FF66A1]" />
                                        <Label>Client</Label>
                                    </div>
                                    <p className="text-sm font-medium">{detailPayment.clientName}</p>
                                </div>
                                <Separator />
                                <div className="grid gap-2 mt-5">
                                    <div className="flex items-center space-x-2">
                                        <CreditCard className="h-4 w-4 text-[#FF66A1]" />
                                        <Label>Payment Method</Label>
                                    </div>
                                    <p className="text-sm font-medium">{detailPayment.method}</p>
                                </div>
                                <Separator />
                                <div className="grid gap-2 mt-5">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-[#FF66A1]" />
                                        <Label>Created At</Label>
                                    </div>
                                    <p className="text-sm font-medium">{format(new Date(detailPayment.createdAt), 'PPpp')}</p>
                                </div>
                                <Separator />
                                {detailPayment.appointment ? (
                                    <div className="grid gap-2 mt-5">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-[#FF66A1]" />
                                            <Label>Appointment Detail</Label>
                                        </div>
                                        <Link
                                            href={`/calendar?startDate=${detailPayment.appointment.date}&endDate=${detailPayment.appointment.date}&detail=${detailPayment.appointmentId}`}
                                            className="text-sm text-[#FF66A1] hover:underline"
                                        >
                                            View Appointment Details
                                        </Link>
                                    </div>
                                ) : detailPayment.sale && (
                                    <div className="grid gap-2 mt-5">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-[#FF66A1]" />
                                            <Label>Product Sale Detail</Label>
                                        </div>
                                        <Link
                                            href={`/sales/products?sale-detail=${detailPayment.saleId}`}
                                            className="text-sm text-[#FF66A1] hover:underline"
                                        >
                                            View Product Sale Details
                                        </Link>
                                    </div>
                                )}
                                <Separator />
                                <div className="grid gap-2 mt-5">
                                    <div className="flex items-center space-x-2">
                                        <ClipboardList className="h-4 w-4 text-[#FF66A1]" />
                                        <Label>Notes</Label>
                                    </div>
                                    <p className="text-sm font-medium">{detailPayment.notes || 'No notes available'}</p>
                                </div>
                            </div>
                        </div>
                        <div className=" h-[200px] ">

                        </div>
                    </>
                )}
            </div>
        </Modal>

    )
}
