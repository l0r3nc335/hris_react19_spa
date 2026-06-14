import { ArrowRight, CheckCircle, LayoutDashboard, Users } from 'lucide-react'

export default function TestLucideIcon() {
    return (
        <div className="flex gap-4 p-4 text-green-600">
            <CheckCircle size={40} />
            <span>Lucide Icon loaded Successfully</span>
            <ArrowRight size={24} />
            <LayoutDashboard size={24} />
            <Users size={24} />
        </div>
    )
}