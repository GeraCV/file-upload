import Button from 'react-bootstrap/Button'

const LoadFileButton = ({ handleShow }) => {
    return (
        <Button variant="primary" onClick={handleShow}>
            Cargar archivo
        </Button>
    )
}

export default LoadFileButton
