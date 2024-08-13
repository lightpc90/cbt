import { resolve } from 'path';
import * as XLSX from 'xlsx'

type ExcelRowType = {
    question: string;
    options: string;
    answer: string;
}

export function excelToObject(file: File): Promise<ExcelRowType[]>{
return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.onload = (e: any)=>{
        const data = new Uint8Array(e.target.result as ArrayBuffer);
        const workbook = XLSX.read(data, {type: 'array'});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json<ExcelRowType>(worksheet)
        resolve(jsonData);

}
reader.onerror = (e: any)=>{
    reject(e);
}
reader.readAsArrayBuffer(file)
})
}