const express = require('express');
const router = express.Router();

module.exports = (newsController) => {
  /**
   * @swagger
   * tags:
   *   name: News
   *   description: Управление новостями агентства недвижимости
   */

  /**
   * @swagger
   * /api/news:
   *   get:
   *     summary: Получить все новости
   *     tags: [News]
   *     responses:
   *       200:
   *         description: Список новостей
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/News'
   */
  router.get('/', (req, res) => newsController.getAll(req, res));

  /**
   * @swagger
   * /api/news/{id}:
   *   get:
   *     summary: Получить новость по ID
   *     tags: [News]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Новость найдена
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/News'
   *       404:
   *         description: Новость не найдена
   */
  router.get('/:id', (req, res) => newsController.getById(req, res));

  /**
   * @swagger
   * /api/news:
   *   post:
   *     summary: Создать новость
   *     tags: [News]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [title, author, content]
   *             properties:
   *               title: { type: string }
   *               author: { type: string }
   *               content: { type: string }
   *     responses:
   *       201:
   *         description: Новость создана
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/News'
   *       400:
   *         description: Ошибка валидации или хранилище заполнено
   */
  router.post('/', (req, res) => newsController.create(req, res));

  /**
   * @swagger
   * /api/news/{id}:
   *   put:
   *     summary: Обновить новость
   *     tags: [News]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title: { type: string }
   *               author: { type: string }
   *               content: { type: string }
   *     responses:
   *       200:
   *         description: Новость обновлена
   *       404:
   *         description: Новость не найдена
   */
  router.put('/:id', (req, res) => newsController.update(req, res));

  /**
   * @swagger
   * /api/news/{id}:
   *   delete:
   *     summary: Удалить новость
   *     tags: [News]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string }
   *     responses:
   *       200:
   *         description: Новость удалена
   *       404:
   *         description: Новость не найдена
   */
  router.delete('/:id', (req, res) => newsController.delete(req, res));

  return router;
};