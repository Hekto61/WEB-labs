class DeleteNews {
  constructor(newsRepository) {
    this.newsRepository = newsRepository;
  }
  async execute(id) {
    const existing = await this.newsRepository.findById(id);
    if (!existing) throw new Error('Новость не найдена');
    await this.newsRepository.delete(id);
    return { message: 'Новость удалена' };
  }
}
module.exports = DeleteNews;