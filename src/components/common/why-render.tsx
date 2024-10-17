import React, { Profiler } from 'react'

type Props = {
    children: React.ReactNode
}

const WhyRender = ({ children }: Props) => {
    const onRender = (
        id: string, // the "id" prop of the Profiler tree that has just rendered
        phase: 'mount' | 'update', // can be "mount" or "update"
        actualDuration: number, // time spent rendering the tree
        baseDuration: number, // estimated time to render the entire subtree without memoization
        startTime: number, // when React began rendering this update
        commitTime: number, // when React committed this update
        interactions: Set<any> // the Set of interactions that were conducted during this render
    ) => {
        console.log({ id, phase, actualDuration, baseDuration, startTime, commitTime, interactions });
    };

    return (
        //@ts-ignore
        <Profiler id='WhyRender' onRender={onRender} >
            {children}
        </Profiler>
    )
}

export default WhyRender