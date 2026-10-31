const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate News API',
      version: '1.0.0',
      description: 'REST API для управления новостями агентства недвижимости (in-memory, лимит 50 записей)',
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        News: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            author: { type: 'string' },
            content: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/presentation/routes/*.js'], // путь к файлам с JSDoc-аннотациями
};

module.exports = swaggerJsdoc(options);