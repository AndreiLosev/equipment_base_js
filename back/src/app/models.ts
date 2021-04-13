import {DB} from '../lib/sql'

export type TEquipment = {
    id: number,
    No: number,
    validation_cost: number | null,
    last_verification_date: number | null,
    checking_manometers: number | null,
    next_verification_date: number | null,
    actual: number,
    doc_title: string,
    manufacturer: string | null,
    validation_place: string | null,
    factory_number: string | null,
    inventory_number: string,
    k_v_a: string | null,
    no_certificate: string | null,
    notes: string | null,
}

export type TEquipmentKeys = keyof TEquipment

export const NumKeys = [
    'id', 'No', 'validation_cost', 'next_verification_date', 'next_verification_date', 'actual',
] as const

export const StrKeys = [
    'doc_title', 'manufacturer', 'validation_place', 'k_v_a', 'no_certificate', 'notes',
] as const

export type TatableName = {table_name: string}

export type Search_by = {
    table_name: string,
    columns_and_conditions: {
        name: TEquipmentKeys,
        value: string | number,
        conditions: '<' | '>' | '=' | '',
    }[],
}


export type Appkeys = 'connect_db'
export type AppValue = DB
