import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useState, useEffect } from 'react'
import SalesTable from './components/SalesTable'
import FileModal from './components/FileModal'
import LoadFileButton from './components/LoadFileButton'
import DownloadFileButton from './components/DownloadFileButton'
import { API_URL } from './env'

const App = () => {
    const [show, setShow] = useState(false)
    const [sales, setSales] = useState([])
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const getSales = async () => {
        const request = await fetch(`${API_URL}/api/sales`)
        const response = await request.json()
        if (request.status === 200) {
            setSales(response.data)
        }
    }

    useEffect(() => {
        getSales()
    }, [])

    return (
        <>
            <div className="container">
                <h1 className="text-center my-5"> Ventas </h1>
                <div className="d-flex gap-3 justify-content-end">
                    <DownloadFileButton />
                    <LoadFileButton handleShow={handleShow} />
                </div>
                <SalesTable sales={sales} />
            </div>
            <FileModal show={show} handleClose={handleClose} getSales={getSales} />
        </>
    )
}

export default App
