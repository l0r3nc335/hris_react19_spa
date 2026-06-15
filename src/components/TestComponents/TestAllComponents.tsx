import TestComponent from '@/components/TestComponents/TestComponent'
import TestRadix from '@/components/TestComponents/TestRadix'
import TestShadCn from '@/components/TestComponents/TestShadCn'
import TestLucideIcon from '@/components/TestComponents/TestLucideIcon'
import TestZod from '@/components/TestComponents/TestZod'
import TestReactHookForm from '@/components/TestComponents/TestReactHookForm'
import TestAxios from '@/components/TestComponents/TestAxios'
import TestTanStackQeury from '@/components/TestComponents/TestTanStackQeury'
import TestRedux from '@/components/TestComponents/TestRedux'

export default function TestAllComponents() {
    return (
        <>
            <TestComponent />
            <TestRadix />
            <TestShadCn />
            <TestLucideIcon />
            <TestZod />
            <TestReactHookForm />
            <TestAxios />
            <TestTanStackQeury />
            <TestRedux />
        </>
    )
}