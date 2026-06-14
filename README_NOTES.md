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

# THE STACK
```text
•	TypeScript ---------------------> OK
•	React --------------------------> OK
•	Redux Toolkit ------------------> OK
•	Axios --------------------------> OK
•	TanStack Query -----------------> OK
•	Radix UI -----------------------> OK
•	ShadCN -------------------------> OK
•	Tailwind CSS -------------------> OK
•	Lucide React -------------------> OK
•	class-variance-authority (CVA) -> OK
•	tailwind-merge -----------------> OK
•	clsx ---------------------------> OK
•	React Hook Form ----------------> OK
•	Zod  ---------------------------> OK
```
## Core Language & Framework
### React
https://react.dev/learn
### Typescript
https://www.typescriptlang.org/


## State Management
### Redux
https://react-redux.js.org/


## API & Server State
### Axios
https://axios.rest/pages/getting-started/first-steps
### TanStack Query
https://tanstack.com/query/latest

## UI Components & Design System
### Radix UI
https://www.radix-ui.com/themes/docs/overview/getting-started
### ShadCN
https://ui.shadcn.com/docs/components


## Styling
### Tailwind CSS
https://tailwind.build/classes?search=border


## Icons
### Lucide React
https://lucide.dev/guide/react/


## Component Variants & Class Utilities
### Class Variance Authority (CVA)
https://cva.style/docs/examples/react/tailwind-css
### Tailwind merge
https://www.npmjs.com/package/tailwind-merge
### Clsx
https://www.npmjs.com/package/clsx

## Forms & Validation
### React Hook Form
https://react-hook-form.com/
### Zod
https://zod.dev/basics



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

## Axios
Axios is a popular, promise-based HTTP client library used in React applications to send asynchronous HTTP requests to REST endpoints and backend servers.

https://axios.rest/pages/getting-started/first-steps
```sh
    npm install axios
```

Manually Create Directory

    src/api/axios.ts
```ts
    import axios from 'axios'
    
    export const api = axios.create({
        baseURL: 'https://api.restful-api.dev', //sample only
        timeout: 5000,
        headers: {
            'Content-type': 'application/json',
        }
    })
```
Verification Component 

    src/components/TestAxios.tsx

```tsx
    import { useState, useEffect } from "react"
    import { api } from '@/api/axios'
    
    export default function TestAxios() {
        const [data, setData] = useState('')
        const [error, setError] = useState('')
    
        useEffect(() => {
            api.get('/objects/7')
                .then(res => setData(res.data))
                .catch(err => setError(err.message))
        }, [])
    
        if (error) return <p className="text-red-500">Axios Error: {error}</p>
        return <p className="p-2 bg-gray-100 rounded text-black">Axios Data: {data.name || 'Loading...'}</p>
    }
```

## TanStack Query
A powerful, protocol-agnostic asynchronous state management library designed to simplify fetching, caching, synchronizing, and updating server state in web applications.
```sh
    npm install @tanstack/react-query
```

Wrap your src/main.tsx application tree with the query provider

    src\main.tsx
```jsx
    import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
    import './index.css'
    import App from './App.tsx'
    
    const queryClient = new QueryClient()
    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </StrictMode>,
    )
```

Verification Component

    src/components/TestTanStackQuery.tsx
```jsx
    import { useQuery } from '@tanstack/react-query'
    import { api } from '@/api/axios'
    
    export default function TestTanStackQeury() {
        const { data, isPending, error } = useQuery({
            queryKey: ['githubZen'],
            queryFn: async () => {
                const response = await api.get('/status/github')
                return response.data as string
            }
        })
    
        console.log('data')
        console.log(data)
    
        if (isPending) return <p>Query is loading cache...</p>
        if (error) return <p className="text-red-500">Query Error: {error.message}</p>
        return <p className='p-4 bg-green-50 rounded text-green-800 font-medium'>TanStack + Axios: {data.data?.name}</p>
    }
```

## Redux Toolkit
```sh 
  npm install @reduxjs/toolkit react-redux
```

Create a global local-state store
    
    src/store/store.ts

```ts
    import { createSlice, configureStore } from '@reduxjs/toolkit'
    import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
    
    const uiSlice = createSlice({
        name: 'ui',
        initialState: { sidebarOpen: false },
        reducers: {
            toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen }
        }
    })
    
    export const { toggleSidebar } = uiSlice.actions
    export const store = configureStore({ reducer: { ui: uiSlice.reducer } })
    
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
    
    export const useAppDispatch = () =>  useDispatch<AppDispatch>()
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```    

Update 

    src/main.ts


```ts
    import { StrictMode } from 'react'
    import { createRoot } from 'react-dom/client'
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
    import './index.css'
    import App from './App.tsx'
    import { Provider } from 'react-redux'
    import { store } from '@/store/store.ts'
    
    const queryClient = new QueryClient()
    
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </Provider>
      </StrictMode>,
    )
```

Verification Component 
    
    src/components/ReduxTest.tsx

```tsx
    import { useAppDispatch, useAppSelector, toggleSidebar } from '@/store/store.ts'
    import { Button } from '@/components/ui/button'
    
    export default function TestRedux() {
        const isSidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
        const dispatch = useAppDispatch()
    
        return(
            <div className="p-4 border flex flex-col gap-2 max-w-xs">
                <h1 className='text-2xl'>Redux Test</h1>
                <p>Sidebar Status: {isSidebarOpen ? "OPEN" : "CLOSED"}</p>
                <Button
                    variant="default"
                    onClick={() => dispatch( toggleSidebar() )}            
                >
                    Toggle Local UI State
                </Button>
            </div>
        )
    }
```