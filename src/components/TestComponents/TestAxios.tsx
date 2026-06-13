import { useState, useEffect } from "react"
import { api } from '@/api/axios'

export default function TestAxios() {
    const [data, setData] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        api.get('/objects/7')
            .then(res => setData(res.data))
            .catch(err => setError(err.message))
    }, [])

    if (error) return <p className="text-red-500">Axios Error: {error}</p>
    return <p className="p-2 bg-gray-100 rounded text-black">Axios Data: {data.name || 'Loading...'}</p>
}