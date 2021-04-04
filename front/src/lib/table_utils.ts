export class TableUtils {
    static column_width = <T extends {width: number, visible: boolean}>(obj: T[]) => {
        const extroLen = obj.reduce((acc, item) => {
           if (item.visible) return acc
           else return acc + item.width
        }, 0)
        const k = (100 - extroLen) / 100
        return obj.map(item => ({...item, width: item.width / k}))
    }
}