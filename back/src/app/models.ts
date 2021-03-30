export type TEquipmentNumber = {
    id: number,
    No: number,
    validation_cost: number | null,
    last_verification_date: number | null,
    checking_manometers: number | null,
    next_verification_date: number | null,
    actual: number,
}

export type TEquipmentString = {
    doc_title: string,
    manufacturer: string | null,
    validation_place: string | null,
    inventory_number: string,
    k_v_a: string | null,
    no_certificate: string | null,
    notes: string | null,
}
