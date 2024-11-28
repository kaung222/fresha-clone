import { Service } from '@/types/service'
import React from 'react'
import ServiceCard from '../../../services/ServiceCard'
import { Card } from '@/components/ui/card'

type Props = {
    services: Service[]
}

const MemberService = ({ services }: Props) => {
    return (
        <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-grow p-8 overflow-auto  ">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Overview</h1>
                        <p className="text-sm text-muted-foreground">Analytics dashboard</p>
                    </div>
                </div>
                <Card className=" p-5 space-y-2 ">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </Card>
            </div>
        </main>
    )
}

export default MemberService