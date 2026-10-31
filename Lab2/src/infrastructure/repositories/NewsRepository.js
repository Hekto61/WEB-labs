// Абстрактный интерфейс — не зависит от конкретной реализации
class NewsRepository {
  async create(news) { throw new Error('Not implemented'); }
  async findAll() { throw new Error('Not implemented'); }
  async findById(id) { throw new Error('Not implemented'); }
  async update(id, data) { throw new Error('Not implemented'); }
  async delete(id) { throw new Error('Not implemented'); }
  async count() { throw new Error('Not implemented'); }
}

module.exports = NewsRepository;