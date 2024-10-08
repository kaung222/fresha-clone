'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Save, X, MapPin, Phone, Mail, Globe, Clock, Camera, CheckCircle, Check, DollarSign } from 'lucide-react'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInputFile from '@/components/common/FormInputFile'
import { UploadImage } from '@/api/commons/upload-image'
import { useLocalstorage } from '@/lib/helpers'
import { UploadProfilePicture } from '@/api/profile/profile-update'
import { useGetProfile } from '@/api/clinic/get-profile'
import Loading from '@/components/common/loading'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import TogglePublishClinic from './togglePublish'
import { useUpdateClinic } from '@/api/clinic/update-clinic'


export default function ClinicProfileDashboard() {
    const [isEditing, setIsEditing] = useState(false);
    const [newImage, setNewImage] = useState<string | null>(null);
    const { getData } = useLocalstorage();
    const clinic = getData('clinic');
    const { data: clinicData } = useGetProfile();
    const { mutate: updateClinic } = useUpdateClinic();
    const form = useForm({
        defaultValues: {
            name: "healthy",
            address: clinicData?.address,
            description: clinicData?.description,
            city: clinicData?.city,
            country: clinicData?.country,
            website: clinicData?.website,
            appointmentFees: clinicData?.appointmentFees
        }
    });

    useEffect(() => {
        if (clinicData) {
            form.reset({
                name: clinicData?.name || "",
                address: clinicData?.address || "",
                description: clinicData?.description || "",
                city: clinicData?.city || "",
                country: clinicData?.country || "",
                website: clinicData?.website || "",
                appointmentFees: clinicData?.appointmentFees,
            })
        }
    }, [clinicData, form]);



    const { mutate: uploadImage } = UploadProfilePicture(String(clinic?.id))

    const postImage = async (image: Blob): Promise<string> => {
        const { imageUrl } = await UploadImage(image);
        return imageUrl;
    };

    const saveNewImage = () => {
        if (newImage) {
            const payload = { profilePictureUrl: newImage }
            uploadImage(payload);
        }
    }

    const fileInputRef = useRef<HTMLInputElement>(null)



    const handleSave = (values: any) => {
        console.log(values);
        values.id = clinic.id;
        updateClinic(values, {
            onSuccess: () => {
                setIsEditing(false)
            }
        });

    }

    return (
        <div className=" mx-auto py-10">
            {clinicData && (
                <Form {...form}>
                    <form>
                        <Card className="w-full  mx-auto overflow-hidden">
                            <CardHeader className="relative p-6 bg-button text-white">
                                <div className="flex items-center justify-between">
                                    <div className="relative">
                                        <Avatar className="h-24 w-24 border-4 border-white">
                                            <AvatarImage src={newImage || clinicData?.profilePictureUrl} alt={clinicData?.name} />
                                            <AvatarFallback>{clinicData?.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>

                                        <div className="absolute bottom-0 right-0 flex space-x-1">
                                            <Button type='button' variant="secondary" size="icon" className="rounded-full" asChild>
                                                <label htmlFor="avatar-upload">
                                                    <Camera className="h-4 w-4" />
                                                    <span className="sr-only">Change Photo</span>
                                                    <Input
                                                        id="avatar-upload"
                                                        type="file"
                                                        onChange={async (e) => {
                                                            if (e.target.files) {

                                                                const imageUrl = await postImage(e.target.files[0]);
                                                                setNewImage(imageUrl)

                                                            }
                                                        }}
                                                        className="border-gray-300 hidden dark:border-gray-600 border p-2 focus:ring-0 focus:border-button rounded-md text-gray-900 dark:text-gray-100 font-normal text-sm"

                                                    />
                                                </label>
                                            </Button>
                                            {newImage && (
                                                <Button type='button' variant="default" size="icon" className="rounded-full" onClick={saveNewImage}>
                                                    <Check className="h-4 w-4" />
                                                    <span className="sr-only">Save Photo</span>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {isEditing ? (
                                            <div className="space-x-2">
                                                <Button type="button" size="sm" variant="secondary" onClick={form.handleSubmit(handleSave)}>
                                                    <Save className="w-4 h-4 mr-2" /> Save
                                                </Button>
                                                <Button type='button' size="sm" variant="ghost" onClick={() => setIsEditing(false)}>
                                                    <X className="w-4 h-4 mr-2" /> Cancel
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button type='button' size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
                                                <Pencil className="w-4 h-4 mr-2" /> Edit Profile
                                            </Button>
                                        )}
                                        <div className="flex items-center space-x-2">
                                            <TogglePublishClinic isPublished={clinicData?.isPublished ? true : false} clinicId={clinicData?.id} />
                                            <Label htmlFor="publish-clinic" className="text-white">
                                                {clinicData?.isPublished ? 'Published' : 'Unpublished'}
                                            </Label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    {isEditing ? (
                                        <FormInput
                                            form={form}
                                            name='name'

                                        />
                                    ) : (
                                        <h2 className="text-3xl font-bold">{clinicData?.name}</h2>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <MapPin className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />
                                                {isEditing ? (
                                                    <div className="flex-grow space-y-2">
                                                        <FormInput
                                                            form={form}
                                                            name='address'
                                                        />
                                                        <FormInput
                                                            form={form}
                                                            name='city'
                                                        />
                                                        <FormInput
                                                            form={form}
                                                            name='country'
                                                        />
                                                    </div>
                                                ) : (
                                                    <span>{clinicData?.address}, {clinicData?.city}, {clinicData?.country}</span>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                <Phone className="w-5 h-5 mr-2 text-gray-500" />
                                                <span>{clinicData?.phone}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Mail className="w-5 h-5 mr-2 text-gray-500" />
                                                <span>{clinicData?.email}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Globe className="w-5 h-5 mr-2 text-gray-500" />
                                                {isEditing ? (
                                                    <FormInput
                                                        form={form}
                                                        name='website'
                                                    />
                                                ) : (
                                                    <a href={clinicData?.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                                        {clinicData?.website}
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex items-center">
                                                <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                                                {isEditing ? (
                                                    <FormInput
                                                        form={form}
                                                        name='appointmentFees'
                                                    />
                                                ) : (
                                                    <span>{clinicData?.appointmentFees}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-2">About Us</h3>
                                    {isEditing ? (
                                        <FormTextarea form={form} name='description' />
                                    ) : (
                                        <p>{clinicData?.description}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                </Form>
            )}
        </div>
    )
}