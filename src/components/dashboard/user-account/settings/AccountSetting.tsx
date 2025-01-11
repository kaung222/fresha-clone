'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, KeyRound, AlertTriangle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { useDeleteAccount } from '@/api/auth/delete-account'
import { GetOrganizationProfile } from '@/api/organization/get-organization-profile'
import { useRouter } from 'next/navigation'

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

const deleteAccountSchema = z.object({
    confirmText: z.string().refine(val => val === 'DELETE', {
        message: 'Please type DELETE to confirm',
    })
})

export function AccountSettings() {
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [deleteStep, setDeleteStep] = useState(1);
    const router = useRouter()
    const { toast } = useToast()
    const { data: organization } = GetOrganizationProfile()
    const { mutate } = useDeleteAccount()

    const passwordForm = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    })

    const deleteForm = useForm<z.infer<typeof deleteAccountSchema>>({
        resolver: zodResolver(deleteAccountSchema),
        defaultValues: {
            //@ts-ignore
            confirmText: '',
        },
    })

    const onPasswordSubmit = async (values: z.infer<typeof passwordSchema>) => {
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            toast({
                title: "Password updated",
                description: "Your password has been changed successfully.",
            })
            passwordForm.reset()
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update password. Please try again.",
                variant: "destructive",
            })
        }
    }

    const onDeleteSubmit = async (values: z.infer<typeof deleteAccountSchema>) => {
        if (organization?.id) {
            mutate({ id: String(organization.id) }, {
                onSuccess() {
                    toast({
                        title: "Account deleted",
                        description: "Your account has been permanently deleted.",
                    })
                    setIsDeleteDialogOpen(false);
                    router.push('/login')
                },
                onError(error, variables, context) {
                    toast({
                        title: error.response?.data.message,
                        description: "Failed to delete account. Please try again.",
                        variant: "destructive",
                    })
                },
            });
        }
    }

    return (
        <div className="space-y-6">
            {/* Change Password Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <KeyRound className="h-5 w-5 text-[#FF66A1]" />
                        Change Password
                    </CardTitle>
                    <CardDescription>
                        Update your password to keep your account secure
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="bg-[#FF66A1] hover:bg-[#FF66A1]/90"
                                disabled={passwordForm.formState.isSubmitting}
                            >
                                {passwordForm.formState.isSubmitting && (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Update Password
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Delete Account Section */}
            <Card className="border-red-100">
                <CardHeader>
                    <CardTitle className="text-red-600">Delete Account</CardTitle>
                    <CardDescription>
                        Permanently delete your account and all associated data
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500 mb-4">
                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                    </p>
                    <Button
                        variant="destructive"
                        onClick={() => {
                            setDeleteStep(1)
                            setIsDeleteDialogOpen(true)
                        }}
                    >
                        Delete Account
                    </Button>
                </CardContent>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className=' z-[100] '>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-600 flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Delete Account
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {deleteStep === 1 ? (
                                "This action cannot be undone. Are you sure you want to permanently delete your account?"
                            ) : (
                                "Please type DELETE to confirm account deletion"
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {deleteStep === 1 ? (
                        <div className="space-y-4">
                            <div className="rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            What happens when you delete your account:
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <ul className="list-disc space-y-1 pl-5">
                                                <li>Your profile and personal data will be permanently deleted</li>
                                                <li>Your appointments and booking history will be removed</li>
                                                <li>You will lose access to all services and features</li>
                                                <li>This action cannot be reversed</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                                    Cancel
                                </AlertDialogCancel>
                                <Button
                                    variant="destructive"
                                    onClick={() => setDeleteStep(2)}
                                >
                                    Continue
                                </Button>
                            </AlertDialogFooter>
                        </div>
                    ) : (
                        <Form {...deleteForm}>
                            <form onSubmit={deleteForm.handleSubmit(onDeleteSubmit)} className="space-y-4">
                                <FormField
                                    control={deleteForm.control}
                                    name="confirmText"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type DELETE to confirm</FormLabel>
                                            <FormControl>
                                                <Input {...field} placeholder="DELETE" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <AlertDialogFooter>
                                    <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                                        Cancel
                                    </AlertDialogCancel>
                                    <Button
                                        variant="destructive"
                                        type="submit"
                                        disabled={deleteForm.formState.isSubmitting}
                                    >
                                        {deleteForm.formState.isSubmitting && (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Delete Account
                                    </Button>
                                </AlertDialogFooter>
                            </form>
                        </Form>
                    )}
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

