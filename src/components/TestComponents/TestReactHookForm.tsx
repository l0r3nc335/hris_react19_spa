import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
})

type FormFields = z.infer<typeof formSchema>

export default function TestReactHookForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(formSchema),
    })
    
    const submit = (data: FormFields) => alert(`FormSubmitted: ${data.username}`)

    return (
        <form onSubmit={handleSubmit(submit)} className="border border-black-500 p-4 flex flex-col gap-2 max-w-sm">
            <input {...register("username")} className="border border-gray-200 p-2 rounded text-black" placeholder="Enter username" />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            <button type="submit" className="bg-black text-white p-2 rounded">Submit</button>
        </form>
    )
}