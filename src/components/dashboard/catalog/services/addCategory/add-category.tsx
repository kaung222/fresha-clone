'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AddCategory() {
    const [categoryName, setCategoryName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle category addition logic here
        console.log('Category added:', { categoryName, description })
    }

    const handleClose = () => {
        // Handle close logic here
        console.log('Form closed')
    }

    return (
        <div className=" p-6 ">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <Input
                        id="categoryName"
                        placeholder="e.g. Hair Services"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>

                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit">
                        Add
                    </Button>
                </div>
            </form>
        </div>
    )
}