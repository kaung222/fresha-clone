'use client'
import ControllableDropdown from '@/components/common/control-dropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    allClients: {
        records: Client[];
    };
    children: React.ReactNode;
    setClient: Dispatch<SetStateAction<Client | null>>;
}

const ClientDropDown = ({ allClients, children, setClient }: Props) => {
    const [open, setOpen] = useState<boolean>(false)

    const chooseClient = (client: Client) => {
        setClient(client)
        setOpen(false)
    }

    return (
        <>
            <ControllableDropdown open={open} setOpen={setOpen} trigger={children}>
                <ScrollArea className=' max-h-[300px] '>
                    {allClients?.records?.map((client) => (
                        <Button key={client.id} variant="ghost" onClick={() => chooseClient(client)} className="w-full flex items-center gap-4 justify-start h-24 px-8 py-4">
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
            </ControllableDropdown>
        </>
    )
}

export default ClientDropDown