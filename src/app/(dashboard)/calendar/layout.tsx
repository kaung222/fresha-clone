import CalendarAppPage from '@/components/dashboard/calendar/CalanderAppPage';
import React from 'react'

type Props = {
    children: React.ReactNode;
    modal: React.ReactNode;
}

const Layout = ({ children, modal }: Props) => {
    return (
        <>
            <div>

                {children}
            </div>

        </>
    )
}

export default Layout