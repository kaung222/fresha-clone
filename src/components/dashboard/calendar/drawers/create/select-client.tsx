'use client'
import { GetAllClients } from '@/api/client/get-all-clients'
import ChildModal from '@/components/modal/ChildModal'
import Modal from '@/components/modal/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import { MoveLeft } from 'lucide-react'
import React from 'react'

type Props = {
    setShowClientSelect: React.Dispatch<React.SetStateAction<boolean>>;
    setChooseClient: React.Dispatch<React.SetStateAction<Client | null>>;
}

const SelectClientDrawer = ({ setShowClientSelect, setChooseClient }: Props) => {
    const { data: allClients } = GetAllClients()

    const handleClose = () => {
        setShowClientSelect(false)
    };

    const chooseClient = (client: Client) => {
        setChooseClient(client)
        setShowClientSelect(false)
    }

    return (
        <>
            <div className={` w-[350px] animate__animated animate__backInRight p-8 pt-0 bg-white h-full  shadow-dialog border border-[#E5E5E5] absolute z-10 top-0 right-0 `}>
                <div className=' py-4 bg-white top-0 border-b h-[80px] border-gray-300 '>
                    <div className=' flex items-center justify-between '>
                        <Button variant={'ghost'} onClick={handleClose} className=' top-5 left-5 '>
                            <MoveLeft className=' w-4 h-4 ' />
                        </Button>
                        <h2 className="text-2xl font-bold">Select a Client</h2>
                    </div>
                </div>
                <ScrollArea className=' h-h-full-minus-80 '>
                    {allClients?.records?.map((client) => (
                        <Button key={client.id} onClick={() => chooseClient(client)} variant="ghost" className="w-full flex items-center gap-4 justify-start h-24 px-4 py-3">
                            <Avatar className="h-16 w-16 ">
                                <AvatarImage src={client.profilePicture} alt={shortName(client.firstName)} className=' object-cover ' />
                                <AvatarFallback>{shortName(client.firstName)}</AvatarFallback>
                            </Avatar>
                            <div className="text-left">
                                <div className=' font-semibold
                                     '>{client.firstName} {client.lastName}</div>
                                <div className=" font-text text-gray-500">{client.email}</div>
                            </div>
                        </Button>
                    ))}
                </ScrollArea>

            </div>
        </>
    )
}

export default SelectClientDrawer