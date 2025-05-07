import express, { json } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';

function shuffleWords(sentence) {
  const words = sentence.split(' ');
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }

  return words;
}

function getRandomElementWithIndex(arr) {
  const index = Math.floor(Math.random() * arr.length);
  return { element: arr[index], index };
}


const sentences = [
  "I am a boy",
  "She is a doctor",
  "They are friends",
  "We love coding",
  "He plays football",
  "The cat is sleeping",
];

const app = express();
const port = 5000;

app.use(json());

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demo API',
      version: '1.0.0',
      description: 'A simple Express API with Swagger',
    },
  },
  apis: ['./index.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', serve, setup(swaggerSpec));

/**
 * @swagger
 * /api/:
 *   get:
 *     summary: Welcome message
 *     responses:
 *       200:
 *         description: A welcome message
 */
app.get('/api/', (req, res) => {
  res.send('Welcome to your assessment api!');
});

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Returns a list of questions
 *     responses:
 *       200:
 *         description: List of words to be reorganized into sentences with their indices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   words:
 *                     type: array
 *                     items:
 *                       type: string
 *             example:
 *               - id: 0
 *                 words: ["a", "is", "This", "table"]
 *               - id: 1
 *                 words: ["an", "is", "This", "assessment"]
 */
app.get('/api/questions', (req, res) => {
  const preparedQuestions = sentences.map((sentence, index) => {
    const words = shuffleWords(sentence);

    return {
      id: index,
      words,
    }
  });
  res.json({ preparedQuestions });
});

/**
 * @swagger
 * /api/question:
 *   get:
 *     summary: Returns a random question
 *     responses:
 *       200:
 *         description: A single list of words to be reorganized into a sentence with the question index
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 words:
 *                   type: array
 *                   items:
 *                     type: string
 *             example:
 *               id: 0
 *               words: ["a", "is", "This", "table"]
 */
app.get('/api/question', (req, res) => {
    const preparedSentence = getRandomElementWithIndex(sentences);
    const words = shuffleWords(preparedSentence.element);

    const preparedResponse = {
      id: preparedSentence.index,
      words,
    };

    res.json({ preparedResponse });
});

/**
 * @swagger
 * /api/video:
 *   get:
 *     summary: Returns a random question
 *     responses:
 *       200:
 *         description: A url for testing video streaming in the app
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *             example:
 *               url: http://somevideourl
 */
app.get('/api/video', (req, res) => {
  res.json({url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'});
});


/**
 * @swagger
 * /api/solve:
 *   post:
 *     summary: Evaluates the answer sent with the correct answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               sentence:
 *                 type: string
 *           example:
 *             id: 0
 *             sentence: "I am a boy"
 *     responses:
 *       200:
 *         description: Correct answer or incorrect answer response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             examples:
 *               correct:
 *                 value: { "message": "Correct! Let's continue..." }
 *               incorrect:
 *                 value: { "message": "Dang, you'll get it next time..." }
 */
app.post('/api/solve', (req, res) => {
  const { id, sentence } = req.body;

  const selectedSentence = sentences[id];

  console.log(selectedSentence);
  console.log(sentence);
  
  if (selectedSentence === sentence) {
    res.json({ message: "Correct! Let's continue..." });
  }

  res.json({ message: "Dang, you'll get it next time..." });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/api-docs`);
});
