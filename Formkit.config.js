import { generateClasses } from "@formkit/themes"

const config = {
    config:{
        classes: generateClasses({
            submit: {
                input: '$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-3 mt-10'
            },
            email: {    
                input: 'rounded-3xl w-2/4',
                inner: 'py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center'
            },
            password: {
                input: 'rounded-3xl w-2/4',
                inner: 'py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center'
            }
        })

    }
}

export default config