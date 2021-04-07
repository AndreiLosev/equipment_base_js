

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
                item.No.toString(),
                item.doc_title,
                item.manufacturer ? item.manufacturer : '',
                item.validation_place ? item.validation_place : '',
                item.validation_cost !== null
                    ? TableUtils.validation_cost_to_str(item.validation_cost)
                    : '',
                item.factory_number ? item.factory_number : '',
                item.inventory_number,
                item.k_v_a ? item.k_v_a : '',
                item.no_certificate ? item.no_certificate : '',
                item.last_verification_date !== null
                    ? new Date(item.last_verification_date).toLocaleDateString()
                    : '',
                item.checking_manometers !== null
                    ? new Date(item.checking_manometers).toLocaleDateString()
                    : '',
                item.next_verification_date !== null
                    ? new Date(item.next_verification_date).toLocaleDateString()
                    : '',
                item.notes ? item.notes : ''
            ]}
        }, {} as {[key: string]: string[]})
    }

    static array_to_object = (array: string[], key: string) => {
        const [id, acttual] = key.split('_').map(i => parseInt(i))
        return {
            id, acttual, No: parseInt(array[0]), doc_title: array[1], 
            manufacturer: array[2] ? array[2] : null,
            validation_place: array[3] ? array[3] : null,
            validation_cost: array[4] ? TableUtils.str_to_validation_cost(array[4]) : null,
            factory_number: array[5] ? array[5] : null,
            inventory_number: array[6],
            k_v_a: array[7] ? array[7] : null,
            no_certificate: array[8] ? array[8] : null,
            last_verification_date: array[9]
                ? TableUtils.str_date_to_number(array[9])
                : null,
            checking_manometers: array[10]
                ? TableUtils.str_date_to_number(array[10])
                : null,
            next_verification_date: array[11]
                ? TableUtils.str_date_to_number(array[11])
                : null,
            notes: array[12] ? array[12] : null
        }
        

    }

    static validation_cost_to_str = (validation_cost: number) => {
        const str = validation_cost.toString()
        const len = str.length
        const integer = str.slice(0, len -2)
        const fractional = str.slice(len - 2)
        return `${integer},${fractional}`
    }

    static str_to_validation_cost = (validation_cost: string) => {
        const [integer, fractional] = validation_cost.split(',').map(i => parseInt(i))
        return integer * 100 + fractional
    }

    static str_date_to_number = (str_loacl_date: string) => {
        const [day, month, year] = str_loacl_date.split('.').map(i => parseInt(i))
        return +new Date(year, month - 1, day)
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
