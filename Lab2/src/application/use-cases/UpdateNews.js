class UpdateNews {
  constructor(newsRepository) {
    this.newsRepository = newsRepository;
  }
  async execute(id, data) {
    const existing = await this.newsRepository.findById(id);
    if (!existing) throw new Error('Новость не найдена');
    const updated = { ...existing, ...data };
    return await this.newsRepository.update(id, updated);
  }
}
module.exports = UpdateNews;