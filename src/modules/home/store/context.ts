'use client'

import { Dispatch, createContext } from 'react'
import { TAction } from './actions'
import initialState, { IMainStore } from './initialState'

interface IContextProps {
  state: IMainStore
  dispatch: Dispatch<TAction>
}
const MainContext = createContext<IContextProps>({
  state: initialState,
  dispatch: () => {}
})

export default MainContext