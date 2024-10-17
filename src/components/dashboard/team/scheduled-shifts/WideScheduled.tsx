import { ChevronDown, ChevronLeft, ChevronRight, Pencil } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function WideSchedulePage() {
    return (
        <>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
                <div className="">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className=" texth font-bold">Scheduled shifts</h1>
                        <div className="flex items-center space-x-2">
                            <Select defaultValue="options">
                                <SelectTrigger className="w-[120px]">
                                    <SelectValue placeholder="Options" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="options">Options</SelectItem>
                                    <SelectItem value="export">Export</SelectItem>
                                    <SelectItem value="import">Import</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button>
                                Add
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-end mb-6 bg-gray-50">
                        <div className="flex items-center space-x-2 bg-gray-100 rounded-md">
                            <Button variant="ghost" size="icon">
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost">This week</Button>
                            <div className="text-sm font-medium">7 - 13 Oct, 2024</div>
                            <Button variant="ghost" size="icon">
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px]">
                                    Team member
                                    <Button variant="link" className="text-blue-600 p-0 h-auto font-normal">
                                        Change
                                    </Button>
                                </TableHead>
                                <TableHead>Mon, 7 Oct<br />18h</TableHead>
                                <TableHead>Tue, 8 Oct<br />18h</TableHead>
                                <TableHead>Wed, 9 Oct<br />18h</TableHead>
                                <TableHead>Thu, 10 Oct<br />18h</TableHead>
                                <TableHead>Fri, 11 Oct<br />27h</TableHead>
                                <TableHead>Sat, 12 Oct<br />14h</TableHead>
                                <TableHead>Sun, 13 Oct<br />0h</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Avatar className="h-10 w-10 mr-3">
                                            <AvatarFallback>PP</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">Pyae PhyoNyo</div>
                                            <div className="text-sm text-gray-500">52h</div>
                                        </div>
                                    </div>
                                </TableCell>
                                {[...Array(7)].map((_, index) => (
                                    <TableCell key={index} className="text-center">
                                        <Button className="bg-blue-100 text-blue-800 rounded px-2 py-1">
                                            {index === 5 ? "10:00 - 17:00" : index === 6 ? "" : "10:00 - 19:00"}
                                        </Button>
                                    </TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <div className="flex items-center">
                                        <Avatar className="h-10 w-10 mr-3">
                                            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Wendy Smith" />
                                            <AvatarFallback>WS</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">Wendy Smith...</div>
                                            <div className="text-sm text-gray-500">61h</div>
                                        </div>
                                    </div>
                                </TableCell>
                                {[...Array(7)].map((_, index) => (
                                    <TableCell key={index} className="text-center">
                                        <Button className="bg-blue-100 text-blue-800 rounded px-2 py-1">
                                            {index === 4 ? "01:00 - 19:00" : index === 5 ? "10:00 - 17:00" : index === 6 ? "" : "10:00 - 19:00"}
                                        </Button>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4 flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <p className="text-sm text-blue-700">
                            The team roster shows your availability for bookings and is not linked to your business opening hours. To set your opening hours, <a href="#" className="font-medium underline">click here</a>.
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}