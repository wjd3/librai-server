import express, { Request, Response } from 'express'
import multer from 'multer'
import { storeFileEmbeddingsInQdrant } from '../services/qdrantService'
import { processFile } from '../services/fileService'

const router = express.Router()
// TODO add file size limits?
const upload = multer({ dest: 'temp/uploads/' }) // Temporary storage

router.post(
	'/upload',
	upload.single('file'),
	async (req: Request, res: Response): Promise<void> => {
		try {
			const { file } = req

			if (file) {
				const fileContent = await processFile(file)
				const result = await storeFileEmbeddingsInQdrant({
					fileContent,
					fileTitle: file.originalname
				})
				res.json(result)
			} else {
				res.status(400).json({ error: 'File and user ID are required' })
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				res.status(500).json({ error: error.message })
			} else {
				res.status(500).json({ error: 'An unknown error occurred' })
			}
		}
	}
)

export default router
