'use client'

import { useState, useEffect } from 'react'
import { Check, Copy, Download, Share2, QrCode, ArrowRight, Eye } from 'lucide-react'
import QRCode from 'react-qr-code'
import Link from 'next/link'
//@ts-ignore
import confetti from 'canvas-confetti'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useToast } from "@/components/ui/use-toast"
import { Organization } from '@/types/organization'

type Props = {
    organization: Organization
}

export default function PublicationSuccess({ organization }: Props) {
    const [copied, setCopied] = useState(false)
    const { toast } = useToast()
    const profileUrl = `${process.env.NEXT_PUBLIC_USER_URL}/shops/${organization.slug}`

    useEffect(() => {
        // Trigger confetti on component mount
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        })
    }, [])

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(profileUrl)
            setCopied(true)
            toast({
                title: "Link copied!",
                description: "The profile link has been copied to your clipboard.",
            })
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast({
                title: "Failed to copy",
                description: "Please try copying the link manually.",
                variant: "destructive",
            })
        }
    }

    const downloadQR = () => {
        const svg = document.getElementById("qr-code")
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg)
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            const img = new Image()
            img.onload = () => {
                canvas.width = img.width
                canvas.height = img.height
                ctx?.drawImage(img, 0, 0)
                const pngFile = canvas.toDataURL("image/png")
                const downloadLink = document.createElement("a")
                downloadLink.download = "business-profile-qr.png"
                downloadLink.href = pngFile
                downloadLink.click()
            }
            img.src = "data:image/svg+xml;base64," + btoa(svgData)
        }
    }

    const shareProfile = async () => {
        try {
            await navigator.share({
                title: 'My Business Profile',
                text: 'Book appointments with me online!',
                url: profileUrl,
            })
        } catch (err) {
            toast({
                title: "Sharing failed",
                description: "Please try sharing the link manually.",
                variant: "destructive",
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-[#FF66A1]/10 flex items-center justify-center p-4">
            <Card className="w-full max-w-2xl">
                <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-[#FF66A1] rounded-full flex items-center justify-center mx-auto">
                            <Check className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-[#FF66A1]">
                            Your Business Profile is Ready!
                        </h1>

                        <p className="text-gray-600 max-w-md mx-auto">
                            Congratulations! Clients can now book appointments with you online.
                            Share your profile link or QR code to start receiving bookings.
                        </p>

                        <div className="space-y-6 mt-8">
                            {/* Profile Link Section */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Your Profile Link</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <input
                                            type="text"
                                            value={profileUrl}
                                            readOnly
                                            className="w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-800"
                                        />
                                    </div>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={copyToClipboard}
                                                    className="shrink-0"
                                                >
                                                    <Copy className={`h-4 w-4 ${copied ? 'text-green-500' : ''}`} />
                                                    <span className="sr-only">Copy link</span>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Copy to clipboard</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>

                            {/* QR Code Section */}
                            <div className="bg-white p-6 rounded-xl border space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <QrCode className="w-5 h-5 text-[#FF66A1]" />
                                        <h2 className="font-semibold">Profile QR Code</h2>
                                    </div>
                                    <div className="flex gap-2">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={downloadQR}
                                                    >
                                                        <Download className="h-4 w-4" />
                                                        <span className="sr-only">Download QR Code</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Download QR Code</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        onClick={shareProfile}
                                                    >
                                                        <Share2 className="h-4 w-4" />
                                                        <span className="sr-only">Share Profile</span>
                                                    </Button>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Share Profile</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>

                                <div className="flex justify-center bg-white p-4 rounded-lg">
                                    <QRCode
                                        id="qr-code"
                                        value={profileUrl}
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        viewBox={`0 0 256 256`}
                                        fgColor="#FF66A1"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    asChild
                                >
                                    <Link href={profileUrl} target='_blank'>
                                        <Eye className="mr-2 h-4 w-4" />
                                        Preview
                                    </Link>
                                </Button>
                                <Button
                                    className="flex-1 bg-[#FF66A1] hover:bg-[#FF66A1]/90"
                                    asChild
                                >
                                    <Link href="/">
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

