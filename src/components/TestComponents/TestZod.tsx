import {z} from 'zod'

const userSchema = z.object({
    id: z.number(),
    email: z.email()
})

export default function TestZod(){
    const result = userSchema.safeParse({
        id: 1,
        email: "lorenzo.garcia.tlc@gmail.com"
    })

    console.log("Zod validation success", result.success)
    return (
        <></>
    )
}