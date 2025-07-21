import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { API_URL } from '../env'
const DownloadFileButton = () => {
    const [isLoading, setIsLoading] = useState(false)

    const downloadCsvFile = async () => {
        try {
            setIsLoading(true)
            const request = await fetch(`${API_URL}/api/generate-csv-file`)
            if (request.status === 200) {
                const blob = await request.blob()
                const url = window.URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                window.URL.revokeObjectURL(url)
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Button variant="info" onClick={downloadCsvFile} disabled={isLoading}>
            {isLoading ? 'Generando archivo...' : 'Descargar CSV ventas'}
        </Button>
    )
}

export default DownloadFileButton
