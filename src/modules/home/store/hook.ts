'use client'

import { use } from 'react'
import ChatContext from './context'

const useChatContext = () => {
  return use(ChatContext)
}

export default useChatContext