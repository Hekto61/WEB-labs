class GetAllNews {
  constructor(newsRepository) {
    this.newsRepository = newsRepository;
  }
  async execute() {
    return await this.newsRepository.findAll();
  }
}
module.exports = GetAllNews;