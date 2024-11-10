import AppDropdown from '@/components/common/DropDown'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import React from 'react'

type Props = {}

const ActionDropDown = (props: Props) => {
    return (

        <AppDropdown trigger={(
            <span className="w-full mb-6 px-4 py-2 rounded-lg flex justify-center items-center ">
                Action
                <ChevronDown className="ml-2 h-4 w-4" />
            </span>
        )}>
            <div>
                <Button variant={'ghost'} className=' w-full flex justify-start '>
                    Edit product
                </Button>
                <Button variant={'ghost'} className=' w-full flex justify-start text-delete '>
                    Delete product
                </Button>
            </div>
        </AppDropdown>

    )
}

export default ActionDropDown