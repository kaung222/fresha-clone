'use client'
import { GetAllClients } from '@/api/client/get-all-clients'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import { Plus, User } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'

type Props = {
    setHasChosenClient: Dispatch<SetStateAction<Client | null>>
}

const SelectClient = ({ setHasChosenClient }: Props) => {
    const [clientSearch, setClientSearch] = useState('');
    const { data: allClients } = GetAllClients();

    return (
        <>
            <div className=" w-[320px] bg-white border-r h-full flex flex-col ">
                <div className=' p-4 flex flex-col border-b '>

                    <h2 className="text-2xl font-bold mb-4">Select a client</h2>

                    <div className="">
                        <Input
                            type="text"
                            placeholder="Search client or leave empty"
                            value={clientSearch}
                            onChange={(e) => setClientSearch(e.target.value)}
                            className="w-full h-12 p-3 focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0  "
                        />
                    </div>
                </div>

                <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" flex-grow overflow-y-auto">
                    <Button variant="ghost" className="w-full flex items-center justify-start text-purple-600 h-24 px-8 py-4 gap-4 ">
                        <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                            <Plus className="h-5 w-5 inline-block " />
                        </div>
                        <h3>Add new client</h3>
                    </Button>
                    <Button variant="ghost" className="w-full border-b border-zinc-300 flex items-center justify-start gap-4 text-purple-600 h-24 px-8 py-4 ">
                        <div className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-16 flex justify-center items-center ">
                            <User className="h-5 w-5 inline-block " />
                        </div>
                        <h3>Walk-In</h3>
                    </Button>

                    {allClients?.records?.map((client) => (
                        <Button key={client.id} onClick={() => setHasChosenClient(client)} variant="ghost" className="w-full flex items-center gap-4 justify-start h-24 px-8 py-4">
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
                </div>

            </div>
        </>
    )
}

export default SelectClient