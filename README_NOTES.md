# my_react_ground_up_manual

## Install React
```sh
    npm create vite@latest my-react-groundup-manual
```
    Choose:
        React
        Typescript + react Compiler


## Run react in dev mode
```sh
    npm run dev
```

# SETUP THE STACK

## Tailwind
```sh
    npm i tailwindcss @tailwindcss/vite
```

    import and add plugins in to ./vite.config.ts
    ./src/index.css - remove all code and add 
        @import "tailwindcss";
    import './index.css' in src\main.tsx

test in code if its working
```jsx
  return (
    <>
      <div className={"bg-red-100"}>
        <h1>This is tailwindcss in action</h1>
      </div>
    </>
  )
```

## CLSX - Conditional join class string
```sh
    npm i clsx
    npm i tailwind-merge
```

Make file/directory

        ./src/lib/utils.ts
```jsx
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
```

Test conditional joining of class
```jsx
return (
    <>
        <div className={cn('bg-red-100', true && 'p-4', 'p-2')}>
            <h1>This is tailwindcss in action</h1>
            <h2>conditional joining of class string (true && 'p-4')</h2>
        </div>
    </>
)
```

## CVA class-variance-authority
```sh
  npm i class-variance-authority
```

Make file/Directory and check the code there about 'buttonVariants'.  
    
    ./src/components/button.tsx

Implement the buttons variants in

    src\App.tsx

## Radix UI (Primitives)
```sh 
  npm install @radix-ui/react-dialog
```

Test RadixUI
```jsx
import * as Dialog from '@radix-ui/react-dialog';

export default function TestRadix(){
    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-blue-500 text-white p-2 rounded">Open Dialog</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow">
                    <Dialog.Title className="font-bold">Radix Works!</Dialog.Title>
                    <Dialog.Close className="mt-4 bg-red-500 text-white p-1 rounded">Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
```

## shadcn/ui Initialization
```sh 
  npx shadcn@latest init
```
Selections:

    -Radix
    -Select Presets, see: https://ui.shadcn.com/create?preset
        Vega
        Maia
        Lyra
        Mira
        Luma
        Sera
        Rhea
        Custom
    -

### Sample ShadCn Component Installation
Will create a components/ui/button.tsx
```sh
  npx shadcn@latest add button
```

Test:
```jsx
import { Button } from '@/components/ui/button'

export default function TestShadCn() {
    return (
        <div className="p-6 flex flex-col gap-4 items-start border rounded-xl max-w-sm m-4">
            <h3 className="font-semibold text-lg">shadcn/ui Integration Test</h3>
            <p className="text-sm text-muted-foreground">
                If the button below renders with smooth theme styles and custom hover states, your initialization is perfect.
            </p>
            <Button variant="default" onClick={() => alert("shadcn works!")}>
                Click Me
            </Button>
        </div>
    )
}
```

### Other ShadCn components
    https://ui.shadcn.com/docs/components

## Lucide React (ICON)
Open-source icon library for React that provides over 1,600 customizable, vector-based SVG icons.
```sh
    npm install lucide-react
```

### test Lucide React (ICONS)
```jsx 
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function TestLucideIcon() {
    return (
        <div className="flex gap-4 p-4 text-green-600">
            <CheckCircle size={40} />
            <span>Lucide Icon loaded Successfully</span>
            <ArrowRight size={24} />
        </div>
    )
}
```

### Lucide Icons
    https://lucide.dev/icons/

## ZOD
Zod is a TypeScript-first schema validation library that bridges the gap between static type safety and runtime data integrity. In React, it is the industry standard for validating form inputs, API responses, and environment variables, typically paired with React Hook Form for a completely type-safe form experience.

```sh
    npm install zod
```
Test Zod
```jsx 
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
```

## React Hook Form
https://react-hook-form.com/
```sh 
    npm install react-hook-form @hookform/resolvers
```

Implement React Hook Form:
```jsx
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
        
        const submit = (data, FormFields) => alert(`FormSubmitted: ${data.username}`)
    
        return (
            <form onSubmit={handleSubmit(submit)} className="border border-black-500 p-4 flex flex-col gap-2 max-w-sm">
                <input {...register("username")} className="border border-gray-200 p-2 rounded text-black" placeholder="Enter username" />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                <button type="submit" className="bg-black text-white p-2 rounded">Submit</button>
            </form>
        )
    }
```