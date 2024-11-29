'use client'
import { GetAllClients } from '@/api/client/get-all-clients'
import CircleLoading from '@/components/layout/circle-loading'
import ChildModal from '@/components/modal/ChildModal'
import Modal from '@/components/modal/Modal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { defaultClient } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import { MoveLeft, Plus, User } from 'lucide-react'
import React, { useState } from 'react'
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import { MiniClient } from './CreateAppointmentDrawer'

type Props = {
    setShowClientSelect: React.Dispatch<React.SetStateAction<boolean>>;
    setChooseClient: React.Dispatch<React.SetStateAction<MiniClient | null>>;
}

const SelectClientDrawer = ({ setShowClientSelect, setChooseClient }: Props) => {
    const [clientSearch, setClientSearch] = useState('')
    const { data: allClients, isLoading } = GetAllClients();
    const { setQuery } = useSetUrlParams();


    const handleClose = () => {
        setShowClientSelect(false)
    };

    const chooseClient = (client: Client) => {
        setChooseClient({
            profilePicture: client.profilePicture,
            username: `${client.firstName} ${client.lastName}`,
            email: client.email,
            phone: client.phone,
            gender: client.gender
        })
        setShowClientSelect(false)
    }

    const handleSearch = useDebouncedCallback((query: string) => {
        setQuery({ key: 'qc', value: clientSearch })
    }, 500)

    return (
        <>
            <div className=' w-full h-full  bg-[#14141450]  shadow-dialog absolute z-10 top-0 right-0  '>
                <div className={` w-[350px] p-8 pt-0 bg-white h-full animate__animated animate__backInRight shadow-dialog border border-[#E5E5E5] absolute top-0 right-0 `}>
                    <div className=' py-4 bg-white top-0 border-b h-[120px] border-gray-300 '>
                        <div className=' flex items-center justify-between '>
                            <Button variant={'ghost'} onClick={handleClose} className=' top-5 left-5 '>
                                <MoveLeft className=' w-4 h-4 ' />
                            </Button>
                            <h2 className="text-2xl font-bold">Select a Client</h2>
                        </div>
                        <div className="">
                            <Input
                                type="text"
                                placeholder="Search by first name or full email name"
                                value={clientSearch}
                                onChange={(e) => {
                                    setClientSearch(e.target.value)
                                    handleSearch(e.target.value)
                                }}
                                className="w-full h-12 p-3 focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  "
                            />
                        </div>
                    </div>
                    <ScrollArea className=' h-h-full-minus-120 '>

                        <Button onClick={() => chooseClient(defaultClient)} variant="ghost" className="w-full border-b border-zinc-300 flex items-center justify-start gap-4 text-purple-600 h-24 px-4 py-3 ">
                            <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                                <User className="h-5 w-5 inline-block " />
                            </div>
                            <h3>Walk-In</h3>
                        </Button>
                        {isLoading ? (
                            <CircleLoading />
                        ) : allClients && (
                            allClients?.records?.map((client) => (
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
                            ))
                        )}
                    </ScrollArea>

                </div>
            </div>
        </>
    )
}

export default SelectClientDrawer