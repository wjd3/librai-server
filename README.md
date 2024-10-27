# Chatbot File Processing and Embedding Server

## Description

This project is a Node.js application that accepts EPUB, PDF, or TXT files, processes them into embeddings using the OpenAI API, and uploads them to a Qdrant database. The embeddings can then be consumed by a chatbot front-end for enhanced interaction and information retrieval.

Pairs with [librai-ui](https://github.com/wjd3/librai-ui).

## Features

- Upload files via a RESTful API.
- Supports PDF, EPUB, and TXT file formats.
- Extracts text content from uploaded files.
- Generates embeddings using OpenAI's API.
- Stores embeddings in Qdrant for efficient retrieval and consumption by an OpenAI chatbot.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=3000
   OPENAI_API_KEY=<your-openai-api-key>
   OPENAI_EMBEDDINGS_MODEL=<your-openai-embeddings-model>
   QDRANT_API_URL=<your-qdrant-api-url>
   QDRANT_API_KEY=<your-qdrant-api-key>
   QDRANT_COLLECTION=<your-qdrant-collection-name>
   ```

## Usage

1. **Build the project**:

   ```bash
   npm run build
   ```

2. **Start the server**:

   ```bash
   npm start
   ```

3. **Upload a file**:
   Use a tool like Postman or cURL to send a POST request to the server:

   ```bash
   curl -X POST http://localhost:3000/api/files/upload -F 'file=@/path/to/your/file.pdf'
   ```

   The server will respond with the status of the embedding storage operation.

## Development

For development purposes, you can run the server in watch mode:

```bash
npm run dev
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/) for the web framework.
- [Multer](https://github.com/expressjs/multer) for handling file uploads.
- [OpenAI](https://openai.com/) for the embeddings API.
- [Qdrant](https://qdrant.tech/) for the vector database.
