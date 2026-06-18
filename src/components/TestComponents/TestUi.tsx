import { Card, CardAction, CardTitle, CardContent, CardDescription, CardFooter, CardHeader } from "../ui/card"

export default function TestUi(): React.JSX.Element 
{
    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}