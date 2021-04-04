import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    table: true,
    log: false,
    doc: false,
    card: false,
}

type page = keyof typeof initialState

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        goTo: (state, action: PayloadAction<page>) => {
            (Object.keys(state) as page[]).forEach(key => {
                state[key] = false
            })
            state[action.payload] = true
        }
    }
})

export const NavActtion = navigationSlice.actions
export const NavReduser = navigationSlice.reducer