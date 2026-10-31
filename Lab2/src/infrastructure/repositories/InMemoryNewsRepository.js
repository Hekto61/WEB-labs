const NewsRepository = require('./NewsRepository');

class InMemoryNewsRepository extends NewsRepository {
  constructor() {
    super();
    this.news = []; // массив записей
  }

  async create(news) {
    this.news.push(news);
    return news;
  }

  async findAll() {
    return [...this.news];
  }

  async findById(id) {
    return this.news.find(n => n.id === id) || null;
  }

  async update(id, data) {
    const index = this.news.findIndex(n => n.id === id);
    if (index === -1) return null;
    this.news[index] = { ...this.news[index], ...data };
    return this.news[index];
  }

  async delete(id) {
    const index = this.news.findIndex(n => n.id === id);
    if (index === -1) return false;
    this.news.splice(index, 1);
    return true;
  }

  async count() {
    return this.news.length;
  }
}

module.exports = InMemoryNewsRepository;