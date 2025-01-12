'use client'

import { useState } from 'react'
import { Check, HelpCircle, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { CheckoutProcess } from './checkout-process'

const plans = [
    {
        name: 'Free',
        price: { monthly: 0, annually: 0 },
        description: 'Everything you need to get started',
        features: [
            'Unlimited team members',
            'Unlimited services',
            'Email notifications',
            'Basic analytics and reporting',
            'Customer management',
        ],
    },
    {
        name: 'Premium',
        price: { monthly: 29, annually: 290 },
        description: 'Advanced features for growing businesses',
        features: [
            'All Free plan features',
            'Publication feature',
            'Online booking',
            'Online advertising benefits',
            'Advanced data analytics',
            'Priority support',
        ],
    },
]

const faqs = [
    {
        question: 'What is included in the Free plan?',
        answer: 'Our Free plan includes unlimited team members, unlimited services, email notifications, basic analytics and reporting, and customer management. It is perfect for small businesses or those just starting out.',
    },
    {
        question: 'What additional features do I get with the Premium plan?',
        answer: 'The Premium plan includes all Free plan features plus publication features, online booking, online advertising benefits, advanced data analytics, and priority support. It is designed for growing businesses that need more advanced tools.',
    },
    {
        question: 'Can I upgrade from Free to Premium later?',
        answer: 'Yes, you can upgrade to the Premium plan at any time. Your account and data will be seamlessly transferred to the new plan.',
    },
    {
        question: 'Is there a limit to how many team members I can add?',
        answer: 'No, both our Free and Premium plans offer unlimited team members. You can add as many team members as you need at no extra cost.',
    },
    {
        question: 'Do you offer a money-back guarantee?',
        answer: 'Yes, we offer a 30-day money-back guarantee for our Premium plan. If you are not satisfied, contact our support team for a full refund.',
    },
]

export function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(false)
    const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null)

    const handleGetStarted = (plan: typeof plans[0]) => {
        setSelectedPlan(plan)
    }

    const handleCloseCheckout = () => {
        setSelectedPlan(null)
    }

    return (
        <div className="container mx-auto py-12 px-4">
            {selectedPlan ? (
                <CheckoutProcess
                    selectedPlan={selectedPlan}
                    isAnnual={isAnnual}
                    onClose={handleCloseCheckout}
                />
            ) : (
                <>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-[#FF66A1] mb-4">Simple, Transparent Pricing</h1>
                        <p className="text-xl text-gray-600 mb-8">Choose the plan that is right for your business</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
                        {plans.map((plan, index) => (
                            <Card key={plan.name} className={index === 1 ? 'border-[#FF66A1] shadow-lg' : ''}>
                                <CardHeader>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold">
                                            ${isAnnual ? plan.price.annually : plan.price.monthly}
                                        </span>
                                        <span className="text-gray-500">
                                            {plan.price.monthly === 0 ? '' : `/${isAnnual ? 'year' : 'month'}`}
                                        </span>
                                    </div>
                                    <ul className="space-y-2">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                <Check className="h-5 w-5 text-green-500 mr-2" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="w-full bg-[#FF66A1] hover:bg-[#FF66A1]/90"
                                        onClick={() => handleGetStarted(plan)}
                                    >
                                        {plan.name === 'Free' ? 'Get Started' : 'Upgrade to Premium'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`}>
                                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                                    <AccordionContent>{faq.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <div className="text-center mt-16">
                        <h2 className="text-2xl font-bold mb-4">Need help choosing?</h2>
                        <p className="text-gray-600 mb-6">Our team is here to answer your questions about our plans</p>
                        <Button className="bg-[#FF66A1] hover:bg-[#FF66A1]/90">
                            Contact Sales
                        </Button>
                    </div>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="link" className="mt-8 mx-auto block">
                                    <HelpCircle className="h-4 w-4 mr-2" />
                                    Compare plans in detail
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Click to see a detailed comparison of all plan features</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </>
            )}
        </div>
    )
}

