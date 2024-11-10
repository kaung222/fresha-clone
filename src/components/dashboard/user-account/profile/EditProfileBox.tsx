import { Dispatch, SetStateAction, useState } from 'react'
import { X, Camera } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from '@/components/ui/textarea'
import { DialogTrigger } from '@radix-ui/react-dialog'

type Props = {
    children: React.ReactNode;
}

export default function EditProfileDialog({ children }: Props) {
    const [firstName, setFirstName] = useState('Pyae');
    const [lastName, setLastName] = useState('PhyoNyo');
    const [text, setText] = useState('');
    const [isOpen, setIsOpen] = useState(false)

    const onClose = () => {
        setIsOpen(false)
    }

    const handleSave = () => {
        // Handle save logic here
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] z-[80] max-h-h-screen-minus-70 flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Edit profile</DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4 flex-grow overflow-y-auto">
                    <div className="flex justify-center">
                        <div className="relative w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center">
                            <Camera className="h-8 w-8 text-purple-600" />
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastName">About</Label>
                        <Textarea
                            id="lastName"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => onClose()}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}