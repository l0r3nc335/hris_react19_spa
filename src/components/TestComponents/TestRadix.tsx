import * as Dialog from '@radix-ui/react-dialog';

export default function TestRadix(){
    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-blue-500 text-white p-2 rounded">Open Dialog</Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow">
                    <Dialog.Title className="font-bold">Radix Works!</Dialog.Title>
                    <Dialog.Description>
                        Make changes to your profile here. Click save when you're done.
                    </Dialog.Description>
                    <Dialog.Close className="mt-4 bg-red-500 text-white p-1 rounded">Close</Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}