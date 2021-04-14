import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
    table: true,
    log: false,
    doc: false,
    card: false,
    loading: false,
    tost: {
        type: 'success' as 'success'| 'error',
    }
}

type page = keyof typeof initialState

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        goTo: (state, action: PayloadAction<page>) => {
            (Object.keys(state) as page[]).forEach(key => {
                if (typeof state[key] === 'boolean') {
                    state[key] = false
                }
            })
            state[action.payload] = true
        },

        show_loading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const NavActtion = navigationSlice.actions
export const NavReduser = navigationSlice.reducer