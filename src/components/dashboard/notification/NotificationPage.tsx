'use client'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Star } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GetNotifications } from "@/api/notification/get-notifications"

export default function NotificationPage() {
    const { data } = GetNotifications()
    return (
        <div className="w-full max-w-md p-4 bg-background">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <Button variant="ghost" size="sm" className="text-sm text-primary">
                    See all
                </Button>
            </div>

            <Tabs defaultValue="all" className="mb-4">
                <TabsList className="grid w-[180px] grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
            </Tabs>

            <div className="space-y-3">
                <Card className="p-4">
                    <div className="flex justify-between">
                        <div className="space-y-1">
                            <p className="font-medium">Nan Nan San booked from MMK 500</p>
                            <p className="text-sm text-muted-foreground">3 days ago</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                15:15 Sat 2 Nov cleaning nail and fancy nail booked online with Phwe Phwe
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex justify-between">
                        <div className="space-y-1">
                            <p className="font-medium">4 stars review from Nan Nan San</p>
                            <p className="text-sm text-muted-foreground">3 days ago</p>
                            <div className="flex mt-1">
                                {[...Array(4)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                                ))}
                                <Star className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-sm mt-1">It is a good service platform</p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>

                <Card className="p-4">
                    <div className="flex justify-between">
                        <div className="space-y-1">
                            <p className="font-medium">Nan Nan San booked from MMK 500</p>
                            <p className="text-sm text-muted-foreground">3 days ago</p>
                            <p className="text-sm text-muted-foreground mt-2">
                                15:15 Sat 2 Nov cleaning nail and fancy nail booked online with Phwe Phwe
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}