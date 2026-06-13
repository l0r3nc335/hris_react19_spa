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