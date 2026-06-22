import { useState, useEffect } from "react"
import { api } from '@/services/axios'

export default function TestAxios() {
    const [data, setData] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        //api.get('/objects/7')
        api.get('/status/github')
            .then(res => setData(res.data))
            .catch(err => setError(err.message))
    }, [])

    console.log(data)

    if (error) return <p className="text-red-500">Axios Error: {error}</p>
    return <p className="p-2 bg-gray-100 rounded text-black">Axios Data: {data.data?.name || 'Loading...'}</p>
}