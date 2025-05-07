This API runs on port **5000** and offers a simple interactive sentence reconstruction game. It features several endpoints to interact with shuffled sentences, submit answers, and access documentation. Below is a summary of the available endpoints:

### 📌 API Endpoints

- `GET /api/`  
  Returns a welcome message confirming the API is running.

- `GET /api/questions`  
  Provides a list of all predefined sentences with their words shuffled. Each item includes an `id` and a `words` array.

- `GET /api/question`  
  Returns a single randomly chosen sentence with its words shuffled and includes the corresponding `id`.

- `POST /api/solve`  
  Accepts a sentence reconstruction attempt. Requires a JSON body with:
  - `id`: The index of the sentence.
  - `sentence`: The user's answer.
  Returns a success or failure message based on the correctness of the answer.

- `GET /api-docs`  
  Opens the Swagger UI with interactive documentation of the API.

### 🔌 Server Info

- **Port**: `5000`
- **Base URL**: `http://localhost:5000`
- **API Documentation**: `http://localhost:5000/api-docs`
