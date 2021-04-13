import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import {AppThunk} from '../app/store'
export const VISIBLE_KEY = 'VISIBLE_KEY'

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
    selected_row: '',
    edit_row: '',
    toolbar_disabled: false,
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
    visible_new_table_window: false,
}

type BoolFild = 'visible_settings_show' | 'visible_new_table_window'

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        add_row: state => {
            const fake_id = `new_${Date.now()}`
            state.text = {...state.text, [fake_id]: ["", "", "", "", "", "", "", "", "",  "",  "", "",  "",]}
            state.edit_row = fake_id
            state.toolbar_disabled = true
        },
        set_column_visible: (state, action: PayloadAction<{column: number, visible: boolean}>) => {
            state.columns[action.payload.column].visible = action.payload.visible
        },
        set_value: (state, action: PayloadAction<{row: string, column: number, value: string}>) => {
            state.text[action.payload.row][action.payload.column] = action.payload.value
        },
        show_window: (state, action: PayloadAction<{fild_name: BoolFild, visible: boolean}>) => {
            state[action.payload.fild_name] = action.payload.visible
        },
        slect_row: (state, action: PayloadAction<string>) => {
            state.selected_row = action.payload
        },
        undo_changes: state => {
            delete(state.text[state.edit_row])
            state.edit_row = ''
            state.toolbar_disabled = false
        } 
    },
})


export const TableActtion = {
    ...tableSlice.actions,
}

export const TableReduser = tableSlice.reducer