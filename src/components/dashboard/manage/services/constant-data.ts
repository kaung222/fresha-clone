import { GuideStep } from "../../guide/guide-intro";

export const serviceGuideSteps: GuideStep[] = [
    {
        title: "Service & Package",
        description: "This is your offered service-overview page. Manage your services & package detail here.",
        image: "/img/service-manual.jpg",
        alt: "service overview",
        contents: [
            { label: 1, text: "Click 'Service' and go to service create page." },
            { label: 2, text: "Click 'Package' and go to Package create page." },
            { label: 3, text: "Filter Service list view by service type and discount." },
        ]
    },
    {
        title: "Managing Appointments",
        description: "Our calendar view gives you a clear overview of your day and week. Click on any time slot to create a new appointment, or drag and drop existing appointments to reschedule.",
        image: "/placeholder.svg?height=300&width=400",
        alt: "Appointment calendar view",
        contents: [
            { label: 1, text: "Click 'Service' and go to service create page." }
        ]
    },
    {
        title: "Client Management",
        description: "Access client profiles with a single click. View history, preferences, and contact information. Use the quick actions to book new appointments or send messages.",
        image: "/placeholder.svg?height=300&width=400",
        alt: "Client profile page",
        contents: [
            { label: 1, text: "Click 'Service' and go to service create page." }
        ]
    },
    {
        title: "Business Insights",
        description: "Navigate to the 'Insights' tab to view your business performance. Track revenue trends, popular services, and client retention rates with our interactive charts.",
        image: "/placeholder.svg?height=300&width=400",
        alt: "Business insights dashboard",
        contents: [
            { label: 1, text: "Click 'Service' and go to service create page." }
        ]
    },
    {
        title: "Online Booking",
        description: "Set your availability in the 'Settings' menu. Clients can then book appointments through your personalized booking page, which syncs automatically with your calendar.",
        image: "/placeholder.svg?height=300&width=400",
        alt: "Online booking settings page",
        contents: [
            { label: 1, text: "Click 'Service' and go to service create page." }
        ]
    }
]