'use client'
import { Button } from "@/components/ui/button"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { Calendar, Clock, Plus, Trash, Trash2 } from "lucide-react"
import CreateClosedPeriods from "./CreateDrawer";
import { useCreateClosedPeriods } from "@/api/closed-period/create-closed-period";
import { GetClosedPeriods } from "@/api/closed-period/get-closed-period";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { DeleteClosedPeriod } from "@/api/closed-period/delete-closed-periods";
import ConfirmDialog from "@/components/common/confirm-dialog";
import CircleLoading from "@/components/layout/circle-loading";

export default function ClosedPeriodsList() {
    const { setQuery, getQuery } = useSetUrlParams();
    const { data, isLoading } = GetClosedPeriods();
    const { mutate, isPending } = DeleteClosedPeriod();
    const createDrawer = getQuery('drawer');

    const deleteClosedPeriod = (id: number) => {
        mutate({ id: String(id) })
    }

    return (
        <>
            <div className=" w-full">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-2">Closed periods</h1>
                        <p className="text-gray-500">
                            Set closed periods for specific day.
                        </p>
                    </div>
                    <Button onClick={() => setQuery({ key: 'drawer', value: 'create-closed-periods' })} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Create
                    </Button>
                </div>

                {isLoading ? (
                    <CircleLoading />
                ) : data?.length == 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                        <div className="relative mb-6">
                            <Calendar className="h-16 w-16 text-gray-400" strokeWidth={1.5} />
                            <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-1">
                                <div className="h-5 w-5 rounded-full border-2 border-gray-400 flex items-center justify-center">
                                    <span className="text-gray-400 font-medium text-sm">×</span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">No upcoming closed periods</h2>
                        <p className="text-gray-500 max-w-md">
                            Add closed periods.
                            <br />
                            E.g. Christmas break or a renovation
                        </p>
                    </div>
                ) : (
                    <div className=" space-y-2 ">
                        {data?.map((period) => (
                            <Card key={period.id} className="group">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Calendar className="h-5 w-5 text-gray-500" />
                                                <div>
                                                    <div className="font-medium">
                                                        {format(period.startDate, "EEE, dd MMM yyyy")}
                                                        {period.startDate !== period.endDate && (
                                                            <>
                                                                <span className="mx-2">→</span>
                                                                {format(period.endDate, "EEE, dd MMM yyyy")}
                                                            </>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-500 text-sm mt-1">
                                                        {period.notes}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <Badge variant="secondary" className="gap-1.5">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {period.type}
                                                </Badge>
                                            </div>
                                        </div>

                                        <ConfirmDialog button="Delete" onConfirm={() => deleteClosedPeriod(period.id)} description="You can create closed period again" title="Are you sure to delete this Closed period!">
                                            <span className="text-red-600 px-4 py-2 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="h-5 w-5" />
                                            </span>
                                        </ConfirmDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}


            </div>

            {createDrawer && (
                <CreateClosedPeriods />
            )}
        </>
    )
}