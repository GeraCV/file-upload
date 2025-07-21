import { ApiModel } from '../models/ApiModel.js'
import fs from 'fs'
import { format } from '@fast-csv/format'
import { parse } from '@fast-csv/parse'

export class ApiController {

    static async getSales (req, res) {
        try {
            const sales = await ApiModel.getSales()
            if(!sales.length) {
                return res.status(404).json({message: 'No se encontraron resultados.'})
            }

            return res.json({data: sales})
        } catch (error) {
            return res
                .status(500)
                .json({message: 'Hubo un error al procesar la solicitud.'})
        }
    }

    static generateCsvFile (req, res) {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename="ventas.csv"')
        const fileStream = format({ headers: ['product_id', 'number', 'quantity'] })
        fileStream.pipe(res)

        for (let i = 1; i <= 50000; i++) {
            fileStream.write({
                product_id: ((i - 1) % 10) + 1,
                number: Math.floor(Math.random() * 20) + 1,
                quantity: Math.round((Math.random() * 999 + 1) * 100) / 100,
            })
        }

        fileStream.end()
    }

    static async processSalesFile (req, res) {
        const fileUploadedPath = req.file.path
        const data = {}
        fs.createReadStream(fileUploadedPath)
            .pipe(parse({ headers: true }))
            .on('data', (row) => {
                const productId = row.product_id
                const quantity = parseFloat(row.quantity)
                const number = parseFloat(row.number)

                if (!isNaN(quantity) && !isNaN(number)) {
                    if (!data[productId])
                        data[productId] = { quantity: 0, number: 0 }

                    data[productId].quantity += quantity
                    data[productId].number += number
                }
            })

            .on('end', async () => {
                fs.unlink(fileUploadedPath, (error) => {
                    if(error) {
                        console.error(`Error al eliminar el archivo: ${error.message}`)
                    }
                })

                let insertedRecords = 0
                for (const [productId, { number, quantity }] of Object.entries(data)) {

                    const insertResult = await ApiModel.insertSale({
                        productId: productId,
                        numberProducts: number,
                        quantitySold: quantity
                    })

                    insertedRecords += insertResult.affectedRows
                }

                if(Object.keys(data).length === insertedRecords) {
                    res.json({ message: 'Información procesada correctamente' })
                } else {
                    res.status(500).json({ message: 'Hubo un error al procesar la información.' })
                }
            })
            .on('error', (error) => {
                console.error(error)
                res.status(500).json({message: 'Error al procesar el archivo'})
            })
    }
}