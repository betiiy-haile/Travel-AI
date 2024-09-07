'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const ChatDetailPage = () => {

    const { chatId } = useParams()

  return (
    <div>
        <h1 className='text-4xl'>
              {chatId}
        </h1>
    </div>
  )
}

export default ChatDetailPage
