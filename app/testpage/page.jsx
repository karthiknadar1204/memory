import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

const TestPage = async () => {
    const session = await auth()
    if (!session) {
        redirect('/')
    }
  return (
    <div>
        <h1>Test Page</h1>
        <p>Welcome {session.user.name}</p>
    </div>
  )
}

export default TestPage