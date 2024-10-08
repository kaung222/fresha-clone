import { Check } from "lucide-react"

export default function PricingPage() {
    return (
        <div className="py-24 sm:py-10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                        Choose the right plan for you
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-muted-foreground">
                    Whether you&apos;re just starting out or scaling up, we have a plan that fits your needs.
                </p>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Basic Plan */}
                    <div className="flex flex-col justify-between rounded-3xl bg-card p-8 ring-1 ring-muted-foreground/10 xl:p-10">
                        <div>
                            <div className="flex items-center justify-between gap-x-4">
                                <h3 className="text-lg font-semibold leading-8 text-card-foreground">Basic</h3>
                                <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                                    Free
                                </p>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                Perfect for individuals or small teams just getting started.
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-card-foreground">$0</span>
                                <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Up to 10 service numbers
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    5GB of storage
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Basic support
                                </li>
                            </ul>
                        </div>
                        <a
                            href="#"
                            className="mt-8 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Get started for free
                        </a>
                    </div>

                    {/* Pro Plan */}
                    <div className="flex flex-col justify-between rounded-3xl bg-card p-8 ring-1 ring-primary/10 xl:p-10">
                        <div>
                            <div className="flex items-center justify-between gap-x-4">
                                <h3 className="text-lg font-semibold leading-8 text-card-foreground">Pro</h3>
                                <p className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold leading-5 text-primary">
                                    Most popular
                                </p>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                For growing teams that need more power and flexibility.
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-card-foreground">$100</span>
                                <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Unlimited service numbers
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    50GB of storage
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Priority support
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Advanced analytics
                                </li>
                            </ul>
                        </div>
                        <a
                            href="#"
                            className="mt-8 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Upgrade to Pro
                        </a>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="flex flex-col justify-between rounded-3xl bg-card p-8 ring-1 ring-muted-foreground/10 xl:p-10">
                        <div>
                            <div className="flex items-center justify-between gap-x-4">
                                <h3 className="text-lg font-semibold leading-8 text-card-foreground">Enterprise</h3>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-muted-foreground">
                                For large teams and organizations with complex needs.
                            </p>
                            <p className="mt-6 flex items-baseline gap-x-1">
                                <span className="text-4xl font-bold tracking-tight text-card-foreground">Custom</span>
                            </p>
                            <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Unlimited service numbers
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Unlimited storage
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    24/7 premium support
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Custom integrations
                                </li>
                                <li className="flex gap-x-3">
                                    <Check className="h-6 w-5 flex-none text-primary" />
                                    Dedicated account manager
                                </li>
                            </ul>
                        </div>
                        <a
                            href="#"
                            className="mt-8 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                            Contact sales
                        </a>
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-24 max-w-7xl px-6 sm:mt-32 lg:px-8">
                <div className="mx-auto max-w-4xl divide-y divide-muted-foreground/10">
                    <h2 className="text-2xl font-bold leading-10 tracking-tight text-card-foreground">
                        Frequently asked questions
                    </h2>
                    <dl className="mt-10 space-y-6 divide-y divide-muted-foreground/10">
                        <div className="pt-6">
                            <dt className="text-base font-semibold leading-7 text-card-foreground">
                                What&apos;s included in the free Basic plan?
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-muted-foreground">
                                The Basic plan includes up to 10 service numbers, 5GB of storage, and basic support, all for free.
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt className="text-base font-semibold leading-7 text-card-foreground">
                                Can I upgrade from Basic to Pro at any time?
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-muted-foreground">
                                Yes, you can upgrade to the Pro plan at any time. Your new features will be available immediately after upgrading.
                            </dd>
                        </div>
                        <div className="pt-6">
                            <dt className="text-base font-semibold leading-7 text-card-foreground">
                                What payment methods do you accept for the Pro plan?
                            </dt>
                            <dd className="mt-2 text-base leading-7 text-muted-foreground">
                                We accept all major credit cards and PayPal for the Pro plan. For Enterprise customers, we also offer invoicing options.
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}