'use client'

import { Dispatch, createContext } from 'react'
import { TAction } from './actions'
import initialState, { IChatState } from './initialState'

interface IContextProps {
  state: IChatState
  dispatch: Dispatch<TAction>
}
const ChatContext = createContext<IContextProps>({
  state: initialState,
  dispatch: () => {}
})

export default ChatContext