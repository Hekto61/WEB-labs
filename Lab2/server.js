const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/presentation/swagger');

// Infrastructure
const InMemoryNewsRepository = require('./src/infrastructure/repositories/InMemoryNewsRepository');

// Use Cases
const CreateNews = require('./src/application/use-cases/CreateNews');
const GetAllNews = require('./src/application/use-cases/GetAllNews');
const GetNewsById = require('./src/application/use-cases/GetNewsById');
const UpdateNews = require('./src/application/use-cases/UpdateNews');
const DeleteNews = require('./src/application/use-cases/DeleteNews');

// Presentation
const NewsController = require('./src/presentation/controllers/NewsController');
const newsRoutes = require('./src/presentation/routes/newsRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // фронтенд

// --- Сборка зависимостей (Dependency Injection) ---
const newsRepo = new InMemoryNewsRepository();

const createNews = new CreateNews(newsRepo, 50);
const getAllNews = new GetAllNews(newsRepo);
const getNewsById = new GetNewsById(newsRepo);
const updateNews = new UpdateNews(newsRepo);
const deleteNews = new DeleteNews(newsRepo);

const newsController = new NewsController({
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Маршруты
app.use('/api/news', newsRoutes(newsController));

// Редирект с корня на Swagger (удобно для проверки)
app.get('/', (req, res) => res.redirect('/api-docs'));

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
  //console.log(`Фронтенд: http://localhost:${PORT}/index.html`);
});