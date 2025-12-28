'use client'

import Loading from '@/components/Loading'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LogoutPage = () => {
    const { signOut } = useClerk()
    const router = useRouter()

    useEffect(() => {
        const handleLogout = async () => {
            await signOut()
            router.push('/sign-in')
        }

        handleLogout()
    }, [signOut, router])

    return (
        <div className="flex-1 p-4 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md shadow-md text-center">

                <h2 className="text-xl font-semibold mb-2">
                    <Loading />
                </h2>
                <p className="text-gray-500">Please wait while we sign you out</p>
            </div>
        </div>
    )
}

export default LogoutPage
