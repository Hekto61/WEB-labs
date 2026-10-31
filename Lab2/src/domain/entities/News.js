class News {
  constructor({ id, title, author, content, createdAt }) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.content = content;
    this.createdAt = createdAt || new Date().toISOString();
  }
}

module.exports = News;