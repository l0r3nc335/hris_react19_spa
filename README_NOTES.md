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

Make file/Directory
    
    ./src/components/button.tsx
    check the code ther about 'buttonVariants'.

