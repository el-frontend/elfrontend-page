'use client'

import { use } from 'react'
import MainContext from './context'

const useMainContext = () => {
  return use(MainContext)
}

export default useMainContext