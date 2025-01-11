import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { AccountSettings } from "@/components/dashboard/user-account/settings/AccountSetting"

export default function SettingsPage() {
    return (
        <div className=" flex-1 p-3 md:p-10 h-full overflow-auto">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#FF66A1]">Settings</h1>
                    <p className="text-gray-500">Manage your account settings and preferences</p>
                </div>

                <Separator />

                <Tabs defaultValue="account" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="account">Account</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="privacy">Privacy</TabsTrigger>
                    </TabsList>

                    <TabsContent value="account" className="space-y-6">
                        <AccountSettings />
                    </TabsContent>

                    <TabsContent value="notifications">
                        <div className="text-center py-8 text-gray-500">
                            Notification settings coming soon
                        </div>
                    </TabsContent>

                    <TabsContent value="privacy">
                        <div className="text-center py-8 text-gray-500">
                            Privacy settings coming soon
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

