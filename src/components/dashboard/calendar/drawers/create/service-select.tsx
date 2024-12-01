// 'use client'
// import { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react'
// import { Bell, ChevronDown, Plus, Search, X } from 'lucide-react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
// import { FieldValues, useForm, UseFormReturn } from 'react-hook-form'
// import { noSpaceString, secondToHour } from '@/lib/utils'
// import { GetAllCategories } from '@/api/services/categories/get-all-categories'
// import { Category } from '@/types/category'
// import { Service } from '@/types/service'
// import { ScrollArea } from '@/components/ui/scroll-area'
// import { Label } from '@/components/ui/label'
// import ServiceCard from '@/components/dashboard/manage/services/ServiceCard'



// type Props = {
//     selectedServices: Service[];
//     setSelectedServices: Dispatch<SetStateAction<Service[]>>;
// }

// export default function AppointmentServiceSelect({ selectedServices, setSelectedServices }: Props) {
//     const [activeCategory, setActiveCategory] = useState<string>("")
//     const { data: AllCategories } = GetAllCategories();
//     // console.log(AllCategories)
//     const handleServiceCheck = (service: Service) => {
//         setSelectedServices((prev) =>
//             prev.map((ser) => ser.id).includes(service.id)
//                 ? prev.filter((ser) => ser.id !== service.id)
//                 : [...prev, service]
//         );
//     };

//     // Toggle category check/uncheck (all services under the category)
//     const handleCategoryCheck = (category: Category) => {
//         const services = category.services.map((service) => service);

//         if (services.map(ser => ser.id).every((id) => selectedServices.map(ser => ser.id).includes(id))) {
//             setSelectedServices((prev) => prev.filter((ser) => !services.map(se => se.id).includes(ser.id)));
//         } else {
//             setSelectedServices((prev) => Array.from(new Set([...prev, ...services])));
//         }
//     };

//     // Helper function to check if a category is fully checked
//     const isCategoryChecked = (category: Category) => {
//         return category.services.every((service) => selectedServices.map(ser => ser.id).includes(service.id));
//     };

//     const handleLinkClick = (section: string) => {
//         const sectionElement = document.getElementById(section);
//         if (sectionElement) {
//             sectionElement.scrollIntoView({
//                 behavior: "smooth",
//                 block: 'start'
//             })
//         }
//     }

//     useEffect(() => {
//         if (AllCategories) {
//             const allServiceInCategories = AllCategories.flatMap((category) => category.services).map((service) => String(service.id))
//             // setSelectedServices(allServiceInCategories);
//         }
//     }, [AllCategories, setSelectedServices])

//     return (
//         <>
//             <div>
//                 <div id='service' className="text-xl font-semibold">Select Services</div>
//                 <p className="text-gray-500 mb-6">Select services for the appointment.</p>
//             </div>

//             <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex space-x-2 w-full mb-6 gap-2 bg-white overflow-x-auto ">
//                 {AllCategories?.map(category => (
//                     <Button
//                         type="button"
//                         key={category.id}
//                         variant={activeCategory === String(category.id) ? "default" : "outline"}
//                         onClick={() => {
//                             setActiveCategory(String(category.id));
//                             handleLinkClick(String(category.id));
//                         }}
//                     >
//                         {category.name}
//                     </Button>
//                 ))}
//             </div>


//             {AllCategories?.map((category, index) => (

//                 <div key={index} id={String(category.id)} className=" flex flex-col gap-1 mb-20 ">
//                     <div className=" flex items-center h-[50px] border-b border-zinc-200 gap-[10px] mb-4 ">
//                         <Checkbox id={category.name} checked={isCategoryChecked(category)} onCheckedChange={() => handleCategoryCheck(category)} className=" w-5 h-5 " />
//                         <Label htmlFor={category.name} className="text-xl font-semibold ">{category.name}</Label>
//                     </div>

//                     <ul className=" px-4 space-y-4 ">
//                         {category.services.map((service) => (
//                             <li key={service.id} className="flex items-center justify-between min-h-[80px]  gap-[15px] ">
//                                 <div className="flex items-center">
//                                     <Checkbox id={service.id.toString()} checked={selectedServices.map(ser => ser.id).includes(service.id)} onCheckedChange={() => handleServiceCheck(service)} />
//                                 </div>
//                                 <Label htmlFor={service.id.toString()} className=" flex-grow ">
//                                     <ServiceCard service={service} memberComponent={(
//                                         <div className=" px-1 py-1 border rounded-[18px] h-9 ">
//                                             <span className="w-full flex items-center gap-2 justify-start h-7">
//                                                 <Avatar className="h-7 w-7 ">
//                                                     <AvatarImage src="./img/fake.jpg" alt='helo' className=' object-cover ' />
//                                                     <AvatarFallback>helo</AvatarFallback>
//                                                 </Avatar>
//                                                 <span className=' font-medium'>hello</span>
//                                             </span>
//                                         </div>
//                                     )} />
//                                 </Label>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>

//             ))}
//         </>
//     )
// }