class GetNewsById {
  constructor(newsRepository) {
    this.newsRepository = newsRepository;
  }
  async execute(id) {
    const news = await this.newsRepository.findById(id);
    if (!news) throw new Error('Новость не найдена');
    return news;
  }
}
module.exports = GetNewsById;