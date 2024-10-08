'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { X, Upload, DollarSign, Clock, Tag } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import FormInputFile from '@/components/common/FormInputFile'
import FormTags from '@/components/common/FormTags'
import FormInput from '@/components/common/FormInput'
import FormTextarea from '@/components/common/FormTextarea'
import { useCreateServiceByClinic } from '@/api/service/create-service-by-clinic'
import { useGetDetailService } from '@/api/service/get-service-detail'
import { useParams } from 'next/navigation'
import { useUpdateServiceByClinic } from '@/api/service/update-service'
import EditService from './EditService'

type Props = {
    id: string;
}

const ServiceDataProvider = ({ id }: Props) => {
    const [open, setOpen] = useState(false);
    const { data } = useGetDetailService(id);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span>Edit</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px] h-screen overflow-auto">
                {data ? (
                    <EditService data={data} />
                ) : (
                    <div>Loading...</div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ServiceDataProvider;