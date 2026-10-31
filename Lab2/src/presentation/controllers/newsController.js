class NewsController {
  constructor({ createNews, getAllNews, getNewsById, updateNews, deleteNews }) {
    this.createNews = createNews;
    this.getAllNews = getAllNews;
    this.getNewsById = getNewsById;
    this.updateNews = updateNews;
    this.deleteNews = deleteNews;
  }

  async create(req, res) {
    try {
      const news = await this.createNews.execute(req.body);
      res.status(201).json(news);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const list = await this.getAllNews.execute();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getById(req, res) {
    try {
      const news = await this.getNewsById.execute(req.params.id);
      res.json(news);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const updated = await this.updateNews.execute(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const result = await this.deleteNews.execute(req.params.id);
      res.json(result);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
}

module.exports = NewsController;