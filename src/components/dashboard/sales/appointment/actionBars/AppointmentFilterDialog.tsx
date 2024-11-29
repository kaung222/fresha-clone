"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import ControllableDialog from "@/components/common/control-dialog"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import FormSelect from "@/components/common/FormSelect"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { Member } from "@/types/member"


type Props = {
    children: React.ReactNode;
    allMembers: Member[]
}

export default function AppointmentFilterDialog({ children, allMembers }: Props) {
    const [open, setOpen] = React.useState(false);
    const { getQuery, setQuery, deleteQuery } = useSetUrlParams();
    const member = getQuery('member')
    const status = getQuery('status')
    const form = useForm({
        defaultValues: {
            member: member || 'all',
            status: status || 'all'
        }
    })

    const handleClearFilters = () => {
        deleteQuery({ key: 'member' })
        deleteQuery({ key: 'status' })
        setOpen(false)
    }

    const handleApply = (values: any) => {
        setQuery({ key: 'member', value: values.member });
        setQuery({ key: 'status', value: values.status })
        setOpen(false)
    }

    const memberOptions = allMembers.map((member) => ({ name: member.firstName, value: member.id.toString() }))

    return (
        <>
            <ControllableDialog zIndex={50} title="Filters" open={open} setOpen={setOpen} trigger={children}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleApply)}>
                        <Card className="w-full">
                            <CardContent className="p-6 space-y-4">
                                <div className="space-y-2">
                                    <FormSelect
                                        form={form}
                                        name="member"
                                        label="Team member"
                                        defaultValue={`${member || 'all'}`}
                                        options={[{ name: "All team members", value: "all" }, ...memberOptions]}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <FormSelect
                                        form={form}
                                        name="status"
                                        label="Status"
                                        defaultValue={`${status || 'all'}`}
                                        options={[{ name: "All Status", value: "all" }, { name: 'Pending', value: 'pending' }, { name: 'Confirmed', value: "confirmed" }, { name: "Cancelled", value: 'cancelled' }, { name: "Completed", value: "completed" }]}
                                    />
                                </div>
                            </CardContent>

                            <CardFooter className="flex justify-between p-6 pt-0">
                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={handleClearFilters}
                                >
                                    Clear filters
                                </Button>
                                <Button

                                    type="submit"
                                >
                                    Apply
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </ControllableDialog>
        </>
    )
}