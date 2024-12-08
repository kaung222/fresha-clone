import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCcw, Home } from "lucide-react"
import Link from "next/link"

type Props = {
    isScreen?: boolean
}

export default function ErrorPage({ isScreen = true }: Props) {
    const handleRetry = () => {
        // Implement retry logic here, e.g., refetch data or reload the page
        window.location.reload()
    }

    return (
        <div className={`${isScreen ? "min-h-screen" : " h-auto"} flex items-center justify-center  p-4`}>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4">
                        <AlertCircle className="h-8 w-8 text-red-600" />
                    </div>
                    <CardTitle className="text-center text-2xl font-bold text-red-600">Oops! Something went wrong</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-600 mb-4">
                        We&apos;re having trouble loading the data. This could be due to a connection issue or a temporary problem on our end.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-2 mb-4">
                        <li>Check your internet connection</li>
                        <li>Try refreshing the page</li>
                        <li>If the problem persists, please try again later</li>
                    </ul>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button onClick={handleRetry} className="w-full sm:w-auto">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Retry
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto" asChild>
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go to Homepage
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}