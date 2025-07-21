const ListItem = ({ id, name, numberProducts, quantitySold, createdAt }) => {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{numberProducts}</td>
            <td>${quantitySold}</td>
            <td>{createdAt}</td>
        </tr>
    )
}

export default ListItem
