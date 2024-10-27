import { QdrantClient } from '@qdrant/js-client-rest'
import generatePoints from '../utils/generatePoints'

if (!process.env.QDRANT_API_URL || !process.env.QDRANT_API_KEY || !process.env.QDRANT_COLLECTION) {
	throw new Error(
		'One or more required environment variables are undefined: QDRANT_API_URL, QDRANT_API_KEY, QDRANT_COLLECTION'
	)
}

const qdrantClient = new QdrantClient({
	url: process.env.QDRANT_API_URL,
	apiKey: process.env.QDRANT_API_KEY
})

// Define types for the function parameters
type StoreFileEmbeddingsParams = {
	fileContent: string
	fileTitle: string
}

// Store file embeddings in Qdrant
export async function storeFileEmbeddingsInQdrant({
	fileContent,
	fileTitle
}: StoreFileEmbeddingsParams) {
	try {
		// Generate array of points (embeddings) for the file content
		const points = await generatePoints({
			content: fileContent,
			title: fileTitle
		})

		// Insert the embeddings into Qdrant with metadata
		const result = await qdrantClient.upsert(process.env.QDRANT_COLLECTION as string, {
			points
		})

		return result.status
	} catch (error) {
		console.error('Error storing embeddings in Qdrant:', error)
		throw error
	}
}
