'use client'
import Modal from "@/components/modal/Modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

    const handleClose = () => {
        router.push('/sales/payment')
    }
    return (
        <Modal onClose={handleClose}>
            <div className=" w-auto md:w-[600px] p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2 text-green-500">
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="font-medium">{saleData.status}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline">Rebook</Button>
                        <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-1">Sale</h1>
                <p className="text-gray-500 mb-4">{saleData.date}</p>

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
                        <h2 className="font-semibold mb-2">Sale #{saleData.saleDetails.number}</h2>
                        <p className="text-sm text-gray-500 mb-4">{saleData.saleDetails.date}</p>

                        <div className="flex justify-between mb-2">
                            <div>
                                <p className="font-medium">{saleData.saleDetails.service}</p>
                                <p className="text-sm text-gray-500">
                                    {saleData.saleDetails.duration} · {saleData.saleDetails.provider}
                                </p>
                            </div>
                            <p className="font-medium">MMK {saleData.saleDetails.amount.toLocaleString()}</p>
                        </div>

                        <hr className="my-4" />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p className="text-sm">Total</p>
                                <p className="font-medium">MMK {saleData.saleDetails.total.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <p>Subtotal</p>
                                <p>MMK {saleData.saleDetails.amount.toLocaleString()}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <p>Tip to {saleData.saleDetails.provider}</p>
                                <p>MMK {saleData.saleDetails.tip.toLocaleString()}</p>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <p className="text-sm">Paid with Cash</p>
                                <p className="font-medium">MMK {saleData.saleDetails.total.toLocaleString()}</p>
                            </div>
                            <p className="text-sm text-gray-500">{saleData.saleDetails.paymentTime}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Modal>

    )
}