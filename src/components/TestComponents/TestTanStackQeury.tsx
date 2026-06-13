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