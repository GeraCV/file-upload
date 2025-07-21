import Database from '../config/db.js'

export class ApiModel {

    static async getSales () {
        return Database.query (`
            SELECT
                sale.id,
                product.name,
                format(sale.number_products, 0) AS numberProducts,
                format(sale.quantity_sold, 2) AS quantitySold,
                DATE_FORMAT(sale.created_at, '%Y-%m-%d %H:%i:%s') as createdAt
            FROM
                sale
            LEFT JOIN
                product
            ON sale.product_id = product.id;
        `)
    }

    static async insertSale ({productId, numberProducts, quantitySold}) {
        return Database.query (`
            INSERT INTO
                sale (product_id, number_products, quantity_sold)
            VALUES
                (?,?,?);
        `,[productId, numberProducts,  quantitySold])
    }
}