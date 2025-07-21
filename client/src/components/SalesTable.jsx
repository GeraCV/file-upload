import Table from 'react-bootstrap/Table'
import ListItem from './ListItem'

const SalesTable = ({ sales }) => {
    return (
        <Table striped bordered hover className="my-5">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Producto</th>
                    <th>Numero de productos</th>
                    <th>Cantidad</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody>
                {sales.length ? (
                    sales.map((el) => (
                        <ListItem
                            key={el.id}
                            id={el.id}
                            name={el.name}
                            numberProducts={el.numberProducts}
                            quantitySold={el.quantitySold}
                            createdAt={el.createdAt}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan={5} className="text-center">
                            {' '}
                            Sin resultados
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    )
}

export default SalesTable
