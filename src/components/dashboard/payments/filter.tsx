// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// const initialFilters = {
//     teamMember: "All team members",
//     type: "All Type",
//     fromAmount: "",
//     toAmount: "",
//     giftCards: "Exclude gift card redemptions",
//     deposits: "Exclude gift card redemptions"
// }

// export default function Filters() {
//     const [filters, setFilters] = useState(initialFilters)

//     const handleInputChange = (field: string, value: string) => {
//         setFilters(prevFilters => ({
//             ...prevFilters,
//             [field]: value
//         }))
//     }

//     const handleClearFilters = () => {
//         setFilters(initialFilters)
//     }

//     const handleApplyFilters = () => {

//     }

//     return (
//         <Card className="w-full max-w-md">
//             <CardContent>
//                 <div className="space-y-4">
//                     <div>
//                         <Label htmlFor="teamMember">Team member</Label>
//                         <Select
//                             value={filters.teamMember}
//                             onValueChange={(value) => handleInputChange("teamMember", value)}
//                         >
//                             <SelectTrigger id="teamMember">
//                                 <SelectValue placeholder="Select team member" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="All team members">All team members</SelectItem>
//                                 {/* Add more team members here */}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div>
//                         <Label htmlFor="type">Type</Label>
//                         <Select
//                             value={filters.type}
//                             onValueChange={(value) => handleInputChange("type", value)}
//                         >
//                             <SelectTrigger id="type">
//                                 <SelectValue placeholder="Select type" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="All Type">All Type</SelectItem>
//                                 {/* Add more types here */}
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div className="flex space-x-4">
//                         <div className="flex-1">
//                             <Label htmlFor="fromAmount">From amount</Label>
//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">MMK</span>
//                                 <Input
//                                     id="fromAmount"
//                                     value={filters.fromAmount}
//                                     onChange={(e) => handleInputChange("fromAmount", e.target.value)}
//                                     className="pl-12"
//                                 />
//                             </div>
//                         </div>
//                         <div className="flex-1">
//                             <Label htmlFor="toAmount">To amount</Label>
//                             <div className="relative">
//                                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">MMK</span>
//                                 <Input
//                                     id="toAmount"
//                                     value={filters.toAmount}
//                                     onChange={(e) => handleInputChange("toAmount", e.target.value)}
//                                     className="pl-12"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <Label htmlFor="giftCards">Gift cards</Label>
//                         <Select
//                             value={filters.giftCards}
//                             onValueChange={(value) => handleInputChange("giftCards", value)}
//                         >
//                             <SelectTrigger id="giftCards">
//                                 <SelectValue placeholder="Select gift card option" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="Exclude gift card redemptions">Exclude gift card redemptions</SelectItem>
//                                 <SelectItem value="Include gift card redemptions">Include gift card redemptions</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     <div>
//                         <Label htmlFor="deposits">Deposits</Label>
//                         <Select
//                             value={filters.deposits}
//                             onValueChange={(value) => handleInputChange("deposits", value)}
//                         >
//                             <SelectTrigger id="deposits">
//                                 <SelectValue placeholder="Select deposits option" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="Exclude gift card redemptions">Exclude gift card redemptions</SelectItem>
//                                 <SelectItem value="Include gift card redemptions">Include gift card redemptions</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>
//                 </div>

//                 <div className="flex justify-end space-x-2 mt-6">
//                     <Button variant="outline" onClick={handleClearFilters}>Clear filters</Button>
//                     <Button onClick={handleApplyFilters}>Apply</Button>
//                 </div>
//             </CardContent>
//         </Card>
//     )
// }