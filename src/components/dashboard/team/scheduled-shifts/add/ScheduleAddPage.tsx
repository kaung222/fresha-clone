// 'use client'
// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { ArrowLeft, Trash2 } from 'lucide-react'
// import { Card } from '@/components/ui/card'
// import { Form } from '@/components/ui/form'
// import { useForm } from 'react-hook-form'
// import FormSelect from '@/components/common/FormSelect'
// import { durationData, generateTimeArray } from '@/lib/data'
// import TimeSelectBox from './time-select-box'
// import Link from 'next/link'

// export interface DayShift {
//     id: number;
//     enabled: boolean;
//     startTime: number;
//     endTime: number;
//     dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'
// }

// const defaultSchedule: DayShift[] = [
//     { id: 1, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Monday" },
//     { id: 2, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Tuesday" },
//     { id: 3, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Wednesday" },
//     { id: 4, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Thursday" },
//     { id: 5, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Friday" },
//     { id: 6, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Saturday" },
//     { id: 7, enabled: false, startTime: 28800, endTime: 64800, dayOfWeek: "Sunday" },
// ]

// export default function MultipleScheduleAddPage() {
//     const [schedule, setSchedule] = useState<DayShift[]>(defaultSchedule)
//     const form = useForm()

//     const handleDayToggle = (day: string) => {
//         setSchedule(prev => prev.map((item) => item.dayOfWeek == day ? ({ ...item, enabled: !item.enabled }) : item))
//     };


//     return (
//         <div className="fixed w-screen h-screen top-0 left-0 z-[60] bg-white overflow-auto">
//             <div className="flex justify-between items-center  sticky z-[60] top-0 w-full h-[80px] border-b bg-white border-gray-200 px-10 ">
//                 <Link href={`/team/scheduled-shifts`} className=' px-4 py-2  rounded-lg hover:bg-gray-100 '>
//                     <ArrowLeft className="h-6 w-6" />
//                 </Link>

//                 <Button form='schedule-form' type='submit' >Save</Button>
//             </div>

//             <Form {...form}>
//                 <form id='schedule-form' >
//                     <div className=' px-[100px] space-y-6 py-6 '>

//                         <div className="text-center px-5 flex flex-col items-center ">
//                             <h1 className="text-2xl font-bold">Set regular shifts</h1>
//                             <p className="text-gray-500">Set weekly, biweekly, or custom shifts. Changes apply to all future shifts.</p>
//                         </div>
//                         <div className="flex gap-6">

//                             <Card className="space-y-2 p-5 w-full ">
//                                 {schedule.map((shift, index) => (
//                                     <div key={index} className="flex items-center justify-between w-full gap-4 h-[120px] border-b ">
//                                         <div className=" flex items-center gap-2">
//                                             <Checkbox
//                                                 checked={shift.enabled}
//                                                 onCheckedChange={() => handleDayToggle(shift.dayOfWeek)}
//                                             />
//                                             <div className=' text-[15px] font-semibold '>{shift.dayOfWeek}</div>
//                                         </div>

//                                         {shift.enabled ? (
//                                             <>
//                                                 <div className=' flex items-center justify-between gap-5 '>

//                                                     <TimeSelectBox part='start' setSchedule={setSchedule} day={shift.dayOfWeek} defaultTime={shift.startTime} />

//                                                     <span className="text-gray-400">—</span>

//                                                     <TimeSelectBox part='end' setSchedule={setSchedule} day={shift.dayOfWeek} defaultTime={shift.endTime} />
//                                                     <Button variant="ghost" size="icon" className="text-gray-400">
//                                                         <Trash2 className="h-4 w-4" />
//                                                     </Button>
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             <span className="text-gray-500">No shifts</span>
//                                         )}
//                                     </div>
//                                 ))}
//                             </Card>
//                         </div>
//                     </div>
//                 </form>
//             </Form>


//         </div>
//     )
// }