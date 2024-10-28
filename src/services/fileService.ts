import fs from 'fs'
import path from 'path'
import extractContent from '../utils/extractContent'

interface File {
	path: string
	originalname: string
}

export async function processFile(file: File): Promise<any> {
	const filePath = path.resolve(file.path)
	const fileType = path.extname(file.originalname).toLowerCase().substring(1)

	// Extract text content based on file type
	const fileContent = await extractContent(filePath, fileType)
	console.log('File content extracted: ', file.originalname)

	// Clean up uploaded file
	fs.unlinkSync(filePath)

	return fileContent
}
