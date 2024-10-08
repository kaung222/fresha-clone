'use client'
import { useState } from "react"
import { PenSquare, Plus, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import FormInput from "@/components/common/FormInput"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import FormSelect from "@/components/common/FormSelect"
import FormInputFile from "@/components/common/FormInputFile"
import FormRadio from "@/components/common/FormRadio"
import FormTags from "@/components/common/FormTags"
import Image from "next/image"
import { GetAllSpecility } from "@/api/doctor/get-speciality"
import { useAddDoctorByClinic } from "@/api/doctor/create-doctor"

export default function DoctorCreateDialog() {
    const [open, setOpen] = useState(false);
    const form = useForm();
    const { data: specialities } = GetAllSpecility();
    const { mutate } = useAddDoctorByClinic();

    const handleSubmitForm = (values: any) => {

        // Handle form submission here
        console.log(values);
        const payload = { ...values, specialityId: Number(values.specialityId), experience: Number(values.experience) }
        console.log(payload)
        mutate(payload, {
            onSuccess: () => {
                setOpen(false);
                form.reset({
                    dob: '',
                    email: "",
                    experience: null,
                    gender: undefined,
                    languageProficiency: '',
                    licenseNumber: '',
                    name: '',
                    phone: '',
                    profilePictureUrl: '',
                    qualifications: [],
                    specialityId: undefined,
                })
            }
        })

    }
    const profileImage = form.watch('profilePictureUrl');

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>

                <Button><PenSquare className="mr-2 h-4 w-4" /> Create</Button>

            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] h-screen overflow-auto">
                <DialogHeader>
                    <DialogTitle>Create New Doctor</DialogTitle>
                    <DialogDescription>
                        Enter the details of the new doctor. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="flex col-span-1 md:col-span-2 items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                                            {profileImage ? (
                                                <img
                                                    src={profileImage}
                                                    alt="Thumbnail preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Upload className="w-8 h-8 text-muted-foreground" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">Service Image</h3>
                                            <p className="text-sm text-muted-foreground">
                                                {profileImage ? '' : 'No file selected'}
                                            </p>
                                        </div>
                                    </div>
                                    <FormInputFile
                                        form={form}
                                        name='profilePictureUrl'
                                        id='thumbnail'
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Label htmlFor='thumbnail'>
                                            Choose File
                                        </Label>
                                    </Button>
                                </div>

                                <div className="flex flex-col ">
                                    <FormInput
                                        form={form}
                                        name="name"
                                        label="Name"
                                        placeholder="Dr. Mg Mg"

                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <FormInput
                                        form={form}
                                        name="email"
                                        label="Email"
                                        placeholder="doctor@example.com"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col ">
                                    <FormInput
                                        form={form}
                                        name="phone"
                                        label="Phone"
                                        placeholder="+959112233221"
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <FormRadio
                                        form={form}
                                        name="gender"
                                        label="Gender"
                                        options={[{ label: "Male", value: "male", id: "male" }, { label: "Female", value: "female", id: "female" }]}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col ">
                                    <FormInput
                                        form={form}
                                        name="dob"
                                        label="Date of Birth"
                                        type="date"
                                    />
                                </div>
                                <div className="flex flex-col ">
                                    <FormInput
                                        form={form}
                                        name="experience"
                                        label="Experience(years)"
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col ">
                                    <FormInput
                                        form={form}
                                        name="licenseNumber"
                                        label="License Number"
                                        placeholder="LIC-12345"
                                    />
                                </div>
                                {specialities && (

                                    <div className="flex flex-col ">
                                        <FormSelect
                                            form={form}
                                            name="specialityId"
                                            label="Speciality"
                                            placeholder="Select a speciality"
                                            options={specialities?.map((speciality) => ({ name: `${speciality.engName}/${speciality.burmaName}`, value: String(speciality.id) }))}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col ">
                                <FormRadio
                                    form={form}
                                    name="languageProficiency"
                                    label="Language Proficiency"
                                    options={[{ label: "English", value: 'English', id: "english" }, { label: "Burma", value: "Burma", id: "burma" }]}
                                />
                            </div>
                            <div className="flex flex-col ">
                                <FormTags
                                    form={form}
                                    name="qualifications"
                                    label="Qualifications"
                                    placeholder="Add Your Qualifications"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save Doctor</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}