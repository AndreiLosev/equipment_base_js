

export class TableUtils {
    static column_width = <T extends {width: number, visible: boolean}>(obj: T[]) => {
        const extroLen = obj.reduce((acc, item) => {
           if (item.visible) return acc
           else return acc + item.width
        }, 0)
        const k = (100 - extroLen) / 100
        return obj.map(item => ({...item, width: item.width / k}))
    }

    static objects_to_arrays = (objects: TEquipment[]) => {
        return objects.reduce((acc, item) => {
            return {...acc, [`${item.id}_${item.actual}`]: [
                item.No.toString(), item.doc_title,
                item.manufacturer ? item.manufacturer : '',
                item.validation_place ? item.validation_place : '',
                item.validation_cost ? item.validation_cost.toString() : '',
                item.factory_number ? item.factory_number : '',
                item.inventory_number, item.k_v_a ? item.k_v_a : '',
                item.no_certificate ? item.no_certificate : '',
                item.last_verification_date
                    ? new Date(item.last_verification_date).toLocaleDateString()
                    : '',
                item.checking_manometers
                    ? new Date(item.checking_manometers).toLocaleDateString()
                    : '',
                item.next_verification_date
                    ? new Date(item.next_verification_date).toLocaleDateString()
                    : '',
                item.notes ? item.notes : ''
            ]}
        }, {} as {[key: string]: string[]})
    }

    static array_to_object = (array: string[], key: string) => {
        const [id, acttual] = key.split('_')
        return {
            id, acttual, No: parseInt(array[0]),
        }
        

    }
    
}

// No: "№ п/п",
// doc_title: "Наименование документа (дела)",
// manufacturer: "Производитель",
// validation_place: "Где проводилась к/п/а",
// validation_cost: "Стоимость к/п/а",
// factory_number: "Заводской номер",
// inventory_number: "Инвентарный номер",
// k_v_a: "к/п/а",
// no_certificate: "№ свидет. аттестата",
// last_verification_date: "Дата поверки/калибровки",
// checking_manometers: "Проверка манометров предприятия",
// next_verification_date: "Дата следующей поверки/калибровки",
// notes: "Примечания",

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
