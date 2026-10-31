const News = require('../../domain/entities/News');

class CreateNews {
  constructor(newsRepository, maxRecords = 50) {
    this.newsRepository = newsRepository;
    this.maxRecords = maxRecords;
  }

  async execute({ title, author, content }) {
    if (!title || !author || !content) {
      throw new Error('Title, author и content обязательны');
    }
    const currentCount = await this.newsRepository.count();
    if (currentCount >= this.maxRecords) {
      throw new Error(`Хранилище заполнено. Максимум ${this.maxRecords} записей.`);
    }
    const news = new News({
      id: Date.now().toString(), // простой генератор id
      title,
      author,
      content,
    });
    return await this.newsRepository.create(news);
  }
}

module.exports = CreateNews;