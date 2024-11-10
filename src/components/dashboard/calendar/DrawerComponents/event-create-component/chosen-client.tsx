import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import { Cake, Calendar, Mail, Phone, User, UserPlus } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    setHasChosenClient: Dispatch<SetStateAction<Client | null>>
    hasChosenClient: Client | null;

}

const ChosenClient = ({ setHasChosenClient, hasChosenClient }: Props) => {
    return (
        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className={`w-[320px] absolute z-20 top-0 left-0 h-full border-r bg-white p-6 overflow-y-auto ${hasChosenClient ? 'block' : 'hidden'} `}>
            <div className="flex items-center flex-col gap-6 mb-4 px-6 pt-8 pb-2 border-b">

                <Avatar className="h-24 w-24 mr-4 bg-blue-100">
                    <AvatarImage src={hasChosenClient?.profilePicture} alt={shortName(hasChosenClient?.firstName)} className=' object-cover ' />
                    <AvatarFallback>{shortName(hasChosenClient?.firstName)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-lg font-bold text-center">{hasChosenClient?.firstName} {hasChosenClient?.lastName}</h2>
                </div>
                <div className="">
                    <Button onClick={() => setHasChosenClient(null)} variant="outline">
                        Change
                    </Button>
                </div>
            </div>
            <div className="space-y-4 text-gray-500 px-4">
                <div className="w-full flex justify-start items-center">
                    <Mail className="mr-2 h-4 w-4" /> {hasChosenClient?.email}
                </div>
                <div className="w-full flex justify-start items-center">
                    <Phone className="mr-2 h-4 w-4" /> {hasChosenClient?.phone}
                </div>
                <div className="w-full flex justify-start items-center">
                    <User className="mr-2 h-4 w-4" /> {hasChosenClient?.gender}
                </div>
                <div className="w-full flex justify-start items-center">
                    <Cake className="mr-2 h-4 w-4" /> {hasChosenClient?.dob}
                </div>

            </div>
        </div>
    )
}

export default ChosenClient