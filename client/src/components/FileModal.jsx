import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import { API_URL } from '../env'
const FileModal = ({ show, handleClose, getSales }) => {
    const [file, setFile] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleForm = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formData = new FormData()
        formData.append('file', file)

        const request = await fetch(`${API_URL}/api/process-sales`, {
            method: 'POST',
            body: formData,
        })

        const response = await request.json()
        enqueueSnackbar(response.message, {
            autoHideDuration: 1500,
            variant: request.status === 200 ? 'success' : 'warning',
        })

        if (request.status === 200) {
            getSales()
        }
        setIsLoading(false)
        handleClose()
    }

    const saveFile = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton={false} className="justify-content-center">
                <Modal.Title>Cargar archivo</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleForm}>
                <Modal.Body>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Archivo CSV</Form.Label>
                        <Form.Control name="file" type="file" onChange={saveFile} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" disabled={isLoading}>
                        {isLoading ? 'Procesando...' : 'Aceptar'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default FileModal
