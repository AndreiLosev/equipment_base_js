import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {AppThunk} from '../app/store'


const initialState = {
    columns: [
        { width: 3, visible: true },
        { width: 12, visible: true },
        { width: 11, visible: true },
        { width: 9, visible: true },
        { width: 8, visible: true },
        { width: 8, visible: true },
        { width: 8, visible: true },
        { width: 4, visible: true },
        { width: 10, visible: true },
        { width: 9, visible: true },
        { width: 9, visible: true },
        { width: 9, visible: true },
    ],
    rows_height: [1, 1],
    text: [
        [
            "№ п/п", "Наименование документа (дела)", "Производитель",
            "Где проводилась к/п/а", "Стоимость к/п/а", "Заводской номер",
            "Инвентарный номер", "к/п/а", "№ свидет. аттестата", "Дата поверки/калибровки",
            "Проверка манометров предприятия", "Дата следующей поверки/калибровки",
        ],
        [
            '', '', '', '', '', '', '', '', '', '', '', '',
        ],
    ],
}


const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        set_rows_height: (state, action: PayloadAction<{row: number, height: number}>) => {
            state.rows_height[action.payload.row] = action.payload.height
        },
        set_column_visible: (state, action: PayloadAction<{column: number, visible: boolean}>) => {
            state.columns[action.payload.column].visible = action.payload.visible
        },
        set_value: (state, action: PayloadAction<{row: number, column: number, value: string}>) => {
            console.log('chech')
            state.text[action.payload.row][action.payload.column] = action.payload.value
        },
    },
})

export const change_cell = (value: string, row: number, column: number): AppThunk => (dispatch, getState) => {
    const pixel_per_char = 7.4
    const windiw_wodth_on_px = document.documentElement.clientWidth
    const cell_len_on_px = getState().tableState.columns[column].width * windiw_wodth_on_px / 100
    const rows_height = getState().tableState.rows_height[row]
    const value_len_on_px = value.length * pixel_per_char
    if (cell_len_on_px * rows_height < value_len_on_px) {
        const height = getState().tableState.rows_height[row] + 1
        dispatch(tableSlice.actions.set_rows_height({row, height}))
    }
    dispatch(tableSlice.actions.set_value({row, column, value}))
}

export const TableActtion = {
    change_cell, ...tableSlice.actions,
}

export const TableReduser = tableSlice.reducer