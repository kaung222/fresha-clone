'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2, Copy, QrCode, Users } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function SuccessPublication() {
    const router = useRouter()
    return (
        <div className=" w-screen h-screen bg-white fixed top-0 left-0 z-20 flex justify-center items-center ">
            <Card className="w-full max-w-md mx-auto my-auto">
                <CardContent className="pt-6 px-6 pb-8">
                    <div className="flex flex-col items-center text-center space-y-4 mb-8">
                        <CheckCircle2 className="w-16 h-16 text-emerald-500" />
                        <h1 className="text-2xl font-semibold">Your Fresha profile is ready!</h1>
                        <p className="text-muted-foreground">
                            Clients can now book with you online. Share the link below to get started.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex">
                                <input
                                    type="text"
                                    value="https://www.fresha.com/book-now/service-platform-yjro4j8..."
                                    readOnly
                                    className="flex-1 px-3 py-2 bg-muted rounded-l-md text-sm border focus:outline-none"
                                />
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="rounded-l-none border-l-0"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Click to copy link</p>
                        </div>

                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                className="w-full justify-between h-12 text-left font-normal"
                            >
                                <span>Generate QR code</span>
                                <QrCode className="h-4 w-4" />
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full justify-between h-12 text-left font-normal"
                            >
                                <span>Import clients</span>
                                <Users className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button variant="outline" className="flex-1">
                                See your profile
                            </Button>
                            <Button onClick={() => router.push(`/publication`)} className="flex-1 bg-zinc-900 text-white hover:bg-zinc-800">
                                Done
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}