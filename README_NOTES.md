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