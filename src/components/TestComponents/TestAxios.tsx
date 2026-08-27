import { useState, useEffect } from "react"
import { api } from '@/services/axios'

type GithubStatusResponse = {
    data?: {
        name?: string
    }
}

export default function TestAxios() {
    const [data, setData] = useState<GithubStatusResponse | null>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        //api.get('/objects/7')
        api.get('/status/github')
            .then(res => setData(res.data as GithubStatusResponse))
            .catch(err => setError(err.message))
    }, [])

    console.log(data)

    if (error) return <p className="text-red-500">Axios Error: {error}</p>
    return <p className="p-2 bg-gray-100 rounded text-black">Axios Data: {data?.data?.name || 'Loading...'}</p>
}
