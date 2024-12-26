import ContactSupportPage from "@/components/dashboard/contact-support/ContactSupportPage"

type Props = {}

const Page = (props: Props) => {

    return (
        <>
            <div className=" px-3 md:px-10 md:pt-10 w-full h-full ">
                <ContactSupportPage />
            </div>
        </>
    )
}

export default Page