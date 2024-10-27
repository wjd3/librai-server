import { parseEpub } from 'epub2md'
import { dynamicImport } from 'tsimportlib'
import fs from 'fs/promises'

export default async function extractContent(filePath: string, fileType: string): Promise<string> {
	if (fileType === 'pdf') {
		const pdfJs = await dynamicImport('pdfjs-dist/legacy/build/pdf.mjs', module)

		const pdfBuffer = await fs.readFile(filePath)
		const pdfUint8Array = new Uint8Array(pdfBuffer)
		const pdfDocument = await pdfJs.getDocument({ data: pdfUint8Array }).promise
		const numPages = pdfDocument.numPages
		let text = ''

		for (let i = 1; i <= numPages; i++) {
			const page = await pdfDocument.getPage(i)
			const content = await page.getTextContent()
			const pageText = content.items.map((item: any) => item.str).join(' ')
			text += pageText + ' '
		}

		return text.trim()
	} else if (fileType === 'epub') {
		const epubContent = await parseEpub(filePath)
		const markdownContent =
			epubContent?.sections?.map((section) => section.toMarkdown()).join('\n\n') || ''

		return markdownContent
	} else if (fileType === 'txt') {
		return fs.readFile(filePath, 'utf8')
	} else {
		throw new Error('Unsupported file type')
	}
}
