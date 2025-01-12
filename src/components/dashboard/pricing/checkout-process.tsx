'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PlanType = {
    name: string;
    price: { monthly: number; annually: number };
    description: string;
}

type CheckoutProcessProps = {
    selectedPlan: PlanType;
    isAnnual: boolean;
    onClose: () => void;
}

export function CheckoutProcess({ selectedPlan, isAnnual, onClose }: CheckoutProcessProps) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        country: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleNext = () => setStep(step + 1)
    const handleBack = () => setStep(step - 1)

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Confirm Your Plan</h2>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold">{selectedPlan.name} Plan</h3>
                            <p>{selectedPlan.description}</p>
                            <p className="text-xl font-bold mt-2">
                                ${isAnnual ? selectedPlan.price.annually : selectedPlan.price.monthly}
                                {selectedPlan.price.monthly > 0 && `/${isAnnual ? 'year' : 'month'}`}
                            </p>
                        </div>
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Your Details</h2>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="company">Company Name (Optional)</Label>
                            <Input id="company" name="company" value={formData.company} onChange={handleInputChange} />
                        </div>
                    </div>
                )
            case 3:
                return selectedPlan.name === 'Free' ? (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Confirmation</h2>
                        <p>Thank you for choosing our Free plan! Here is a summary of your plan:</p>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold">{selectedPlan.name} Plan</h3>
                            <p>{selectedPlan.description}</p>
                            <p className="text-xl font-bold mt-2">$0/month</p>
                        </div>
                        <p>An email confirmation has been sent to {formData.email}.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Payment Information</h2>
                        <RadioGroup defaultValue="card">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card">Credit Card</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal">PayPal</Label>
                            </div>
                        </RadioGroup>
                        <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" name="expiryDate" placeholder="MM/YY" value={formData.expiryDate} onChange={handleInputChange} required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <Select onValueChange={(value) => setFormData({ ...formData, country: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us">United States</SelectItem>
                                    <SelectItem value="ca">Canada</SelectItem>
                                    <SelectItem value="uk">United Kingdom</SelectItem>
                                    <SelectItem value="au">Australia</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Confirmation</h2>
                        <p>Thank you for your purchase! Here is a summary of your order:</p>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h3 className="font-semibold">{selectedPlan.name} Plan</h3>
                            <p>{isAnnual ? 'Annual' : 'Monthly'} Subscription</p>
                            <p className="text-xl font-bold mt-2">
                                ${isAnnual ? selectedPlan.price.annually : selectedPlan.price.monthly}/{isAnnual ? 'year' : 'month'}
                            </p>
                        </div>
                        <p>An email confirmation has been sent to {formData.email}.</p>
                    </div>
                )
            default:
                return null
        }
    }

    const totalSteps = selectedPlan.name === 'Free' ? 3 : 4

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Checkout</CardTitle>
                <CardDescription>Complete your {selectedPlan.name === 'Free' ? 'registration' : 'purchase'}</CardDescription>
            </CardHeader>
            <CardContent>
                {renderStepContent()}
            </CardContent>
            <CardFooter className="flex justify-between">
                {step > 1 && (
                    <Button onClick={handleBack} variant="outline">
                        <ChevronLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                )}
                {step < totalSteps ? (
                    <Button onClick={handleNext} className="ml-auto bg-[#FF66A1] hover:bg-[#FF66A1]/90">
                        Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                ) : (
                    <Button onClick={onClose} className="ml-auto bg-[#FF66A1] hover:bg-[#FF66A1]/90">
                        Finish
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

