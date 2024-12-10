'use client'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, MoreHorizontal, Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GetNotifications } from "@/api/notification/get-notifications"
import PageLoading from "@/components/common/page-loading"
import { formatDistanceToNow } from "date-fns"
import { MarkReadNotifications } from "@/api/notification/mark-read-notifications"
import { useEffect } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Notification } from "@/types/notification"

type Props = {
    notifications: Notification[];
    isLoading: boolean
}

export default function NotificationPage({ notifications, isLoading }: Props) {
    // const { data: notifications, isLoading } = GetNotifications();
    const { mutate } = MarkReadNotifications()

    useEffect(() => {
        // const markRead = setTimeout(() => {

        // }, 5000);

        return () => {
            mutate()
        }
    }, [])
    return (
        <ScrollArea className="w-full max-w-md p-4 bg-background h-h-screen-minus-70">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Notifications</h2>
            </div>

            <Tabs defaultValue={notifications?.find(n => !n.isRead) ? "unread" : "all"} className="mb-4">
                <TabsList className="flex justify-start items-center w-full gap-2 bg-white sticky -top-4 ">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
                <TabsContent value="all" className=" w-[400px] ">
                    <div className="space-y-3">
                        {isLoading ? (
                            <PageLoading />
                        ) : notifications && notifications.length > 0 ? (
                            notifications?.map((notification) => (
                                <Card key={notification.id} className="p-4 hover:bg-gray-100 ">
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <p className="font-medium">{notification.title}</p>
                                            <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {notification.body}
                                            </p>
                                        </div>
                                        <div>
                                            <Avatar className=' w-11 h-11 '>
                                                <AvatarImage src={notification.thumbnail} alt='nt' />
                                                <AvatarFallback>nt</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <div className="flex flex-col items-center text-center justify-center h-[300px]">
                                    <Bell className="h-12 w-12 text-gray-400 mb-2" />
                                    <p className=" text-xl font-bold">No Activity yet! </p>
                                    <p className=" text-muted-foreground">Notification can be seen here.</p>
                                </div>
                            </Card>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="unread" className=" w-[400px] ">
                    <div className="space-y-3">
                        {isLoading ? (
                            <PageLoading />
                        ) : notifications && notifications.filter(noti => !noti.isRead).length > 0 ? (
                            notifications.filter(noti => !noti.isRead).map((notification) => (
                                <Card key={notification.id} className="p-4">
                                    <div className="flex justify-between">
                                        <div className="space-y-1">
                                            <p className="font-medium">{notification.title}</p>
                                            <p className="text-sm text-muted-foreground">{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {notification.body}
                                            </p>
                                        </div>
                                        <div>
                                            <Avatar className=' w-11 h-11 '>
                                                <AvatarImage src={notification.thumbnail} alt='nt' />
                                                <AvatarFallback>nt</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>
                                </Card>
                            ))
                        ) : (
                            <Card>
                                <div className="flex flex-col items-center text-center justify-center h-[300px]">
                                    <Bell className="h-12 w-12 text-gray-400 mb-2" />
                                    <p className=" text-xl font-bold">No unread Activity yet! </p>
                                    <p className=" text-muted-foreground">New notification can be seen here.</p>
                                </div>
                            </Card>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </ScrollArea>
    )
}