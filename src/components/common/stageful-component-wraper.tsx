import React from 'react'
import PageLoading from './page-loading';
import ErrorPage from './error-state';
import EmptyDataPage from './empty-data';
import { Book } from 'lucide-react';

type Props = {
    children: React.ReactNode;
    data: any[] | null;
    isLoading: boolean;
}

const StageFulComponentWrapper = ({ isLoading, data, children }: Props) => {
    return (
        <>
            {isLoading ? (
                <PageLoading />
            ) : !data ? (
                <ErrorPage />
            ) : data.length == 0 ? (
                <EmptyDataPage
                    icon={(<Book className=' size-5' />)}
                    title='No Data'
                    content={'There is no data yet, if data it will show here'}
                />
            ) : (
                <>
                    {children}
                </>
            )}
        </>
    )
}

export default StageFulComponentWrapper