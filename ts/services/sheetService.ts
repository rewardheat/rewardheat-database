import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'

let lcohDataCached: {labels: any, data: any}  | undefined = undefined;
export function getLCOHData() {
    if (lcohDataCached) return lcohDataCached

    let lcoh = xlsx.readFile('data-sheets/lcoh_bar.xlsx')

    let lcoh_json = xlsx.utils.sheet_to_json(lcoh.Sheets['Sheet1'])

    let labels: string[] = []
    let data: {[key: string]: number[]} = {}

    lcoh_json.forEach((row: any) => {
        labels.push(row['__EMPTY'])
        Object.keys(row).forEach(key => {
            if (key !== '__EMPTY') {
                if(data[key]) {
                    data[key].push(Number(Number(row[key]).toFixed(2)))
                } else {
                    data[key] = [Number(Number(row[key]).toFixed(2))]
                }
            }
        })
    })

    let dataRows = Object.entries(data)
                    .map(([key, list]) => [key, ...list])

    lcohDataCached = {
        labels: labels, 
        data: dataRows
    }

    return lcohDataCached
}

let lcoh2DataCached: {labels: any, data: any}  | undefined = undefined;
export function getLCOH2Data() {
    if (lcoh2DataCached) return lcoh2DataCached

    let lcoh = xlsx.readFile('data-sheets/lcoh2_bar.xlsx')

    let lcoh_json = xlsx.utils.sheet_to_json(lcoh.Sheets['Sheet1'])

    let labels: string[] = []
    let data: {[key: string]: number[]} = {}

    lcoh_json.forEach((row: any) => {
        labels.push(row['__EMPTY'])
        Object.keys(row).forEach(key => {
            if (key !== '__EMPTY') {
                if(data[key]) {
                    data[key].push(Number(Number(row[key]).toFixed(2)))
                } else {
                    data[key] = [Number(Number(row[key]).toFixed(2))]
                }
            }
        })
    })

    let dataRows = Object.entries(data)
                    .map(([key, list]) => [key, ...list])

    lcoh2DataCached = {
        labels: labels, 
        data: dataRows
    }

    return lcoh2DataCached
}

let calcDataCached: {data: any} | undefined = undefined;
export function getData() {
    if (calcDataCached) return calcDataCached

    let lcoh = xlsx.readFile('data-sheets/data.xlsx')

    let lcoh_json = xlsx.utils.sheet_to_json(lcoh.Sheets['Sheet1'])

    let data: {[key: string]: string[]} = {}

    lcoh_json.forEach((row: any) => {
        Object.keys(row).forEach(key => {
            if(data[key]) {
                data[key].push(row[key])
            } else {
                data[key] = [row[key]]
            }
        })
    })

    let dataRows = Object.entries(data)
                    .map(([key, list]) => [key, ...list])

    calcDataCached = {
        data: dataRows
    }

    return calcDataCached
}

let calcDataDetailedCached: any[] | undefined = undefined;
export function getDataDetailed(row_id: number) {
    if (calcDataDetailedCached) return calcDataDetailedCached[row_id]

    let lcoh = xlsx.readFile('data-sheets/dataDetailed.xlsx')
    calcDataDetailedCached = xlsx.utils.sheet_to_json(lcoh.Sheets['Sheet1'])

    return calcDataDetailedCached[row_id]
}

let simpleShemeCached: any | undefined = undefined;
export function readSimpleSheme(row_id: any) {
    if (simpleShemeCached) return simpleShemeCached[row_id]

    simpleShemeCached = {}

    const folder = 'public/assets/sheme/simple_sheme'
    fs.readdirSync(folder).forEach(file => {
        const idx = parseInt(file.substring(7))
        simpleShemeCached[idx]
            ? simpleShemeCached[idx].push(file)
            : simpleShemeCached[idx] = [file]
    })

    return simpleShemeCached[row_id]
}

let shemeCached: any | undefined = undefined;
export function readSheme(row_id: any) {
    if (shemeCached) return shemeCached[row_id]

    shemeCached = {}

    const folder = 'public/assets/sheme/sheme'
    fs.readdirSync(folder).forEach(file => {
        const idx = parseInt(file.substring(7))
        shemeCached[idx]
            ? shemeCached[idx].push(file)
            : shemeCached[idx] = [file]
    })

    return shemeCached[row_id]
}