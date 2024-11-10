'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ratingOptions = ['All', '5 stars', '4 stars', '3 stars', '2 stars', '1 star'];
type Props = {

    children: React.ReactNode;
}

export default function ReviewFiltersDialog({ children }: Props) {
    const [workspace, setWorkspace] = useState('All workspaces')
    const [rating, setRating] = useState('All');
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => {
        setIsOpen(false)
    }

    const handleApply = () => {
        // Handle apply logic here
        onClose()
    }

    const handleClear = () => {
        setWorkspace('All workspaces')
        setRating('All')
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] z-[80] ">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Filters</DialogTitle>

                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Workspaces</label>
                        <Select value={workspace} onValueChange={setWorkspace}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select workspace" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All workspaces">All workspaces</SelectItem>
                                <SelectItem value="Workspace 1">Workspace 1</SelectItem>
                                <SelectItem value="Workspace 2">Workspace 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating</label>
                        <div className="grid grid-cols-3 gap-2">
                            {ratingOptions.map((option) => (
                                <Button
                                    key={option}
                                    variant={rating === option ? "secondary" : "outline"}
                                    className={`${rating === option ? 'bg-purple-100 text-purple-600' : ''}`}
                                    onClick={() => setRating(option)}
                                >
                                    {option}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={handleClear}>
                        Clear filters
                    </Button>
                    <Button onClick={handleApply}>
                        Apply
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}