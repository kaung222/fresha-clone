import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from 'lucide-react'

export default function CreateUserAccount() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle account creation logic here
        console.log('Account creation attempted with:', { firstName, lastName, password, mobileNumber, agreeTerms })
    }

    return (
        <div className="flex min-h-screen bg-white">
            <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create a new business account</h2>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div>
                            <Label htmlFor="firstName">First name</Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                type="text"
                                required
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="lastName">Last name</Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                type="text"
                                required
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="mobileNumber">Mobile number</Label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                    +959
                                </span>
                                <Input
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    type="tel"
                                    required
                                    placeholder="Enter your mobile number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="rounded-l-none"
                                />
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Checkbox
                                id="agreeTerms"
                                checked={agreeTerms}
                                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                            />
                            <Label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
                                I agree to the Privacy policy, Terms of Service and Terms of Business
                            </Label>
                        </div>

                        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={!agreeTerms}>
                            Create account
                        </Button>
                    </form>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-19%20204123-eNuSnFjkECfLOObm2EYQfPWHjJTh1y.png"
                    alt="Woman using phone and laptop"
                />
            </div>
        </div>
    )
}