import { OpenAI } from 'openai'
import { v4 as uuidv4 } from 'uuid'
import type { EmbeddingModel } from 'openai/resources'

if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_EMBEDDINGS_MODEL) {
	throw new Error(
		'One or more required environment variables are undefined: OPENAI_API_KEY, OPENAI_EMBEDDINGS_MODEL'
	)
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export default async function generatePoints({
	content,
	title
}: {
	content: string
	title: string
}): Promise<{ id: string; vector: number[]; payload: Record<any, any> }[]> {
	const maxCharactersPerCall = 2000
	let embeddings: { id: string; vector: number[]; payload: Record<any, any> }[] = []

	// Split content into chunks if it exceeds the max character limit
	for (let i = 0; i < content.length; i += maxCharactersPerCall) {
		const chunk = content.slice(i, i + maxCharactersPerCall)
		const response = await openai.embeddings.create({
			model: process.env.OPENAI_EMBEDDINGS_MODEL as EmbeddingModel,
			input: chunk
		})

		const id = uuidv4()

		embeddings.push({
			id,
			vector: response.data[0].embedding,
			payload: { title, date: new Date().toISOString(), content: chunk }
		})
	}

	return embeddings
}
