// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import React from 'react'

// type Props = {}
// const clientData = {
//     name: "Hla Thaung",
//     email: "hlathaung@gmail.com",
//     createdAt: "18 Oct 2024",
//     totalSale: 0,
//     appointments: 1,
//     rating: "-",
//     cancelled: 0,
//     noShow: 0,
// }

// interface StatCardProps {
//     label: string
//     value: string | number
//     className?: string
// }

// function StatCard({ label, value, className = "" }: StatCardProps) {
//     return (
//         <Card className={className}>
//             <CardContent className="p-6">
//                 <h3 className="text-gray-600 text-sm mb-2">{label}</h3>
//                 <p className="text-2xl font-bold">{value}</p>
//             </CardContent>
//         </Card>
//     )
// }

// const OverView = (props: Props) => {

//     return (
//         <>
//             <div className=" p-6">
//                 <h1 className="text-3xl font-bold mb-2">Overview</h1>
//                 <h2 className="text-xl font-semibold mb-6">Summary</h2>

//                 <div className="grid gap-4">
//                     <StatCard
//                         label="Total Sale"
//                         value="MMK 0"
//                         className="col-span-full"
//                     />

//                     <div className="grid grid-cols-2 gap-4">
//                         <StatCard
//                             label="Appointments"
//                             value="1"
//                         />
//                         <StatCard
//                             label="Rating"
//                             value="-"
//                         />
//                         <StatCard
//                             label="Cancelled"
//                             value="0"
//                         />
//                         <StatCard
//                             label="No Show"
//                             value="0"
//                         />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default OverView