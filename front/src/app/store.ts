import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import {NavReduser} from '../stateSlices/navigations'

export const store = configureStore({
  reducer: {
    navigation: NavReduser,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
