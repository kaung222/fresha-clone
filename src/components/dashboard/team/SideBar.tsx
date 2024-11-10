// 'use client'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import React from 'react'

// type Props = {}

// const SideBar = (props: Props) => {
//     const pathname = usePathname();
//     const ispath = (path: string) => {
//         return pathname.includes(path)
//     }
//     return (
//         <>
//             <aside className=" w-52 bg-white border-r">
//                 <nav className="p-4 space-y-2">
//                     <h2 className="text-lg font-semibold mb-2">Team</h2>
//                     <Link href={'/team/teammember'}>
//                         <Button variant="ghost" className={`w-full justify-start pointer-events-none ${ispath('teammember') ? 'bg-gray-100' : ''}`}>
//                             Team members
//                         </Button>
//                     </Link>
//                     <Link href={'/team/scheduled-shifts'}>
//                         <Button variant="ghost" className={`w-full justify-start pointer-events-none ${ispath('scheduled-shifts') ? 'bg-gray-100' : ''}`}>
//                             Scheduled shifts
//                         </Button>
//                     </Link>
//                 </nav>
//             </aside>
//         </>
//     )
// }

// export default SideBar