import { generateClasses } from "@formkit/themes"

const config = {
    config:{
        classes: generateClasses({
            // global: {
            //     wrapper: 'space-y-2 bm-3',
            //     message: 'bg-red-500 text-white text-center text-sm font-bold uppercase p-2 my-5',
            //     label: 'block mb-1 font-bold text-lg text-white',
            //     help: 'text-gray-500',
            //     input: 'w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400' 
            // },
            submit: {
                input: '$reset bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-bold w-full p-3 mt-10'
            },
            email: {    
                input: 'ml-10 rounded-3xl w-2/4',
                inner: 'flex justify-center py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center'
            },
            password: {
                input: 'ml-10 rounded-3xl w-2/4',
                inner: 'flex justify-center py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center',
                suffix: 'w-10',
                suffixIcon: 'w-10 py-3'
            },
            select: {    
                input: 'ml-10 rounded-3xl w-2/4',
                inner: 'flex justify-center py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center'
            },
            text: {
                input: 'ml-10 rounded-3xl w-2/4',
                inner: 'flex justify-center py-2',
                message: 'w-56 text-white bg-red-600 rounded-full',
                messages: 'flex justify-center',
                suffix: 'w-10',
                suffixIcon: 'w-10 py-3'
            }
        })

    }
}

export default config