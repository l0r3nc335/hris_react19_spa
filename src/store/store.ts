import { createSlice, configureStore } from '@reduxjs/toolkit'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const uiSlice = createSlice({
    name: 'ui',
    initialState: { sidebarOpen: false },
    reducers: {
        toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen }
    }
})

export const { toggleSidebar } = uiSlice.actions
export const store = configureStore({ 
    reducer: { ui: uiSlice.reducer } 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () =>  useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
