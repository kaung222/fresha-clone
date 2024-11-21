// 'use client'
// import { UpdateAppointment } from '@/api/appointment/update-appointment'
// import ControllableDialog from '@/components/common/control-dialog'
// import FormTextarea from '@/components/common/FormTextarea'
// import { Button } from '@/components/ui/button'
// import { Form } from '@/components/ui/form'
// import { Loader2 } from 'lucide-react'
// import React, { Dispatch, SetStateAction, useState } from 'react'
// import { useForm } from 'react-hook-form'

// type Props = {
//     label: string;
//     title: string;
//     previousNote: string;
//     appointmentId: string;
// }

// const EditNotes = ({ label, title, appointmentId, previousNote }: Props) => {
//     const [open, setOpen] = useState(false);
//     const { mutate, isPending } = UpdateAppointment(appointmentId);
//     const form = useForm({
//         defaultValues: {
//             notes: previousNote,
//         }
//     });

//     const handleSave = (values: any) => {
//         mutate(values, {
//             onSuccess() {
//                 setOpen(false);
//             }
//         })
//     }
//     return (
//         <>
//             <ControllableDialog open={open} setOpen={setOpen} title={title} trigger={(
//                 <span className=' w-full hover:bg-gray-100 h-10 text-sm px-4 py-2 flex justify-start rounded-lg '>
//                     {label}
//                 </span>
//             )}>
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(handleSave)}>
//                         <FormTextarea
//                             form={form}
//                             name='notes'
//                             placeholder='Enter any special instructions or details about the appointment here'
//                         />
//                         <p className=" text-xs text-gray-600 ">This note will be visible only for your team members.</p>
//                         <div className=" flex justify-end ">
//                             <Button type="submit">
//                                 {isPending ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         Updating...
//                                     </>
//                                 ) : previousNote ? "Update" : "Add"}
//                             </Button>
//                         </div>
//                     </form>
//                 </Form>
//             </ControllableDialog>
//         </>
//     )
// }

// export default EditNotes