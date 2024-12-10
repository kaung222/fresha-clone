import Dashboard from "@/components/dashboard/home/Dashboard"

type Props = {}

const Page = (props: Props) => {

    return (
        <>
            <div className=" px-3 md:px-10 w-full h-full ">
                <Dashboard />
            </div>
        </>
    )
}

export default Page