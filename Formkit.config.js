import { generateClasses } from "@formkit/themes"

const config = {
    config: {
        classes: generateClasses({
            email: {
                input: 'rounded-3xl w-1/2',
                inner: 'py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center'
            },
            password: {
                input: 'rounded-3xl w-1/2',
                inner: 'py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center'
            },
        })
    }
}

export default config