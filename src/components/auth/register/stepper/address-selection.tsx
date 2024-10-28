// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { ArrowLeft, MapPin } from 'lucide-react'

// export default function AddressSelection() {
//     const [address, setAddress] = useState('')

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         // Handle form submission logic here
//         console.log('Address submitted:', address)
//     }

//     return (
//         <>
//             <div className="flex justify-between items-center mb-8">
//                 <Button variant="ghost" size="icon">
//                     <ArrowLeft className="h-6 w-6" />
//                 </Button>
//                 <Button type="submit" form="location-form">
//                     Continue
//                 </Button>
//             </div>

//             <div className=" max-w-2xl mx-auto">
//                 <div>
//                     <h2 className="text-sm font-medium text-gray-500">Account setup</h2>
//                     <h1 className="text-3xl font-bold mt-2">Provide your location details</h1>
//                     <p className="text-gray-500 mt-1">
//                         Add your business location to help clients find you easily.
//                     </p>
//                 </div>

//                 <form id="location-form" onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <Label htmlFor="business-address">What's your business address</Label>
//                         <div className="relative">
//                             <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                             <Input
//                                 id="business-address"
//                                 value={address}
//                                 onChange={(e) => setAddress(e.target.value)}
//                                 className="pl-10"
//                                 placeholder="Enter your business address"
//                             />
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }