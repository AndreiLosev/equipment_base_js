import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import {AppThunk} from '../app/store'

const initialState = {
    columns: [
        { width: 3, visible: true, mask: '[9][9][9][9][9]' },
        { width: 12, visible: true, mask: ''},
        { width: 8, visible: true, mask: '' },
        { width: 9, visible: true, mask: '' },
        { width: 7, visible: true, mask: '[9][9][9][9][9][9][9][9][9][9][9][9],99' },
        { width: 7, visible: true, mask: ''  },
        { width: 8, visible: true, mask: ''  },
        { width: 3, visible: true, mask: '[К|П|А]'  },
        { width: 9, visible: true, mask: ''  },
        { width: 8, visible: true, mask: '99.99.9999' },
        { width: 8, visible: true, mask: '99.99.9999' },
        { width: 9, visible: true, mask: '99.99.9999' },
        { width: 9, visible: true, mask: '' },
    ],
    rows_color: { header: '#19aa8d', search: '#fff'} as {[key: string]: string},
    text: {
        header: [
            "№ п/п", "Наименование документа (дела)", "Производитель",
            "Где проводилась к/п/а", "Стоимость к/п/а", "Заводской номер",
            "Инвентарный номер", "к/п/а", "№ свидет. аттестата",
            "Дата поверки/калибровки", "Проверка манометров предприятия",
            "Дата следующей поверки/калибровки", "Примечания",
        ],
        search: [
            "", "", "", "", "", "", "", "", "",  "",  "", "",  "",
        ],
    } as {[row: string]: string[]},
    visible_settings_show: false,  
}


const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        set_column_visible: (state, action: PayloadAction<{column: number, visible: boolean}>) => {
            state.columns[action.payload.column].visible = action.payload.visible
        },
        set_value: (state, action: PayloadAction<{row: string, column: number, value: string}>) => {
            state.text[action.payload.row][action.payload.column] = action.payload.value
        },
        show_visible_settings: (state, action: PayloadAction<boolean>) => {
            state.visible_settings_show = action.payload
        }
    },
})


export const TableActtion = {
    ...tableSlice.actions,
}

export const TableReduser = tableSlice.reducer