import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { shortName } from '@/lib/utils'
import { Client } from '@/types/client'
import { Cake, Calendar, UserPlus } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'

type Props = {
    setHasChosenClient: Dispatch<SetStateAction<Client | null>>
    hasChosenClient: Client | null;

}

const ChosenClient = ({ setHasChosenClient, hasChosenClient }: Props) => {
    return (
        <div className={`w-[320px] absolute z-20 top-0 left-0 h-full border-r bg-white p-6 ${hasChosenClient ? 'block' : 'hidden'} `}>
            <div className="flex items-center flex-col gap-6 mb-4 px-6 pt-8 pb-2 border-b">

                <Avatar className="h-24 w-24 mr-4 bg-blue-100">
                    <AvatarImage src={hasChosenClient?.profilePicture} alt={shortName(hasChosenClient?.firstName)} className=' object-cover ' />
                    <AvatarFallback>{shortName(hasChosenClient?.firstName)}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-lg font-bold">{hasChosenClient?.firstName} {hasChosenClient?.lastName}</h2>
                    <p className="text-gray-500">{hasChosenClient?.email}</p>
                    <p className="text-gray-500">{hasChosenClient?.phone}</p>
                </div>
                <div className="">
                    <Button onClick={() => setHasChosenClient(null)} variant="outline">
                        Remove
                    </Button>

                </div>
            </div>
            <div className="space-y-4 text-gray-500 px-8">
                <Button variant="ghost" className="w-full justify-start">
                    <UserPlus className="mr-2 h-4 w-4" /> Add pronouns
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <Cake className="mr-2 h-4 w-4" /> {hasChosenClient?.dob}
                </Button>
                <div className="flex items-start">
                    <Calendar className="mr-2 h-4 w-4" /> {hasChosenClient?.createdAt}
                </div>
            </div>
        </div>
    )
}

export default ChosenClient