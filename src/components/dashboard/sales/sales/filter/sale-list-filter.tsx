import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SaleListFilter() {
    const [teamMember, setTeamMember] = useState("All team members")
    const [fromAmount, setFromAmount] = useState("")
    const [toAmount, setToAmount] = useState("")
    const [giftCards, setGiftCards] = useState("Exclude gift card redemptions")
    const [deposits, setDeposits] = useState("Exclude gift card redemptions")

    const handleClearFilters = () => {
        setTeamMember("All team members")
        setFromAmount("")
        setToAmount("")
        setGiftCards("Exclude gift card redemptions")
        setDeposits("Exclude gift card redemptions")
    }

    const handleApply = () => {
        console.log("Applying filters:", { teamMember, fromAmount, toAmount, giftCards, deposits })
        // Here you would typically send the filters to a parent component or trigger a data fetch
    }

    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-4">
            <div>
                <Label htmlFor="teamMember">Team member</Label>
                <Select value={teamMember} onValueChange={setTeamMember}>
                    <SelectTrigger id="teamMember">
                        <SelectValue placeholder="Select team member" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All team members">All team members</SelectItem>
                        {/* Add more team members here */}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="fromAmount">From amount</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">MMK</span>
                        <Input
                            id="fromAmount"
                            value={fromAmount}
                            onChange={(e) => setFromAmount(e.target.value)}
                            className="pl-12"
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="toAmount">To amount</Label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">MMK</span>
                        <Input
                            id="toAmount"
                            value={toAmount}
                            onChange={(e) => setToAmount(e.target.value)}
                            className="pl-12"
                        />
                    </div>
                </div>
            </div>

            <div>
                <Label htmlFor="giftCards">Gift cards</Label>
                <Select value={giftCards} onValueChange={setGiftCards}>
                    <SelectTrigger id="giftCards">
                        <SelectValue placeholder="Select gift card option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Exclude gift card redemptions">Exclude gift card redemptions</SelectItem>
                        <SelectItem value="Include gift card redemptions">Include gift card redemptions</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="deposits">Deposits</Label>
                <Select value={deposits} onValueChange={setDeposits}>
                    <SelectTrigger id="deposits">
                        <SelectValue placeholder="Select deposits option" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Exclude gift card redemptions">Exclude gift card redemptions</SelectItem>
                        <SelectItem value="Include gift card redemptions">Include gift card redemptions</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleClearFilters}>Clear filters</Button>
                <Button onClick={handleApply}>Apply</Button>
            </div>
        </div>
    )
}