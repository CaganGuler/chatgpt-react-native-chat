import express from 'express';
import cors from 'cors';
import { environment } from './config.js';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
	apiKey: environment.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/api/chat', async (req, res) => {
	const { messages } = req.body;
	const newArray = messages.map(({ id, ...keepAttrs }) => keepAttrs)

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: newArray,
		temperature: 0.2,
		max_tokens: 3000
	})
	const responseMessage = {
		role: "assistant",
		content: response.data.choices[0].message.content.trim(),
		id: response.data.id
	};
	res.json({
		data: responseMessage,
	});


})


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
