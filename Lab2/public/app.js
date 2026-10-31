const API = '/api/news';

// DOM
const newsContainer = document.getElementById('news-container');
const sectionList = document.getElementById('section-list');
const sectionAdd = document.getElementById('section-add');
const navList = document.getElementById('nav-list');
const navAdd = document.getElementById('nav-add');
const formAdd = document.getElementById('form-add');
const addMessage = document.getElementById('add-message');

// Навигация
navList.addEventListener('click', () => {
  sectionList.classList.remove('hidden');
  sectionAdd.classList.add('hidden');
  navList.classList.add('active');
  navAdd.classList.remove('active');
  loadNews();
});

navAdd.addEventListener('click', () => {
  sectionAdd.classList.remove('hidden');
  sectionList.classList.add('hidden');
  navAdd.classList.add('active');
  navList.classList.remove('active');
  addMessage.textContent = '';
  formAdd.reset();
});

// Загрузка списка <button class="btn-edit" onclick="editNews('${item.id}')">Редактировать</button> 
async function loadNews() {
  newsContainer.innerHTML = '<p>Загрузка...</p>';
  try {
    const res = await fetch(API);
    if (!res.ok) throw new Error('Ошибка загрузки');
    const news = await res.json();
    if (news.length === 0) {
      newsContainer.innerHTML = '<p>Пока нет новостей. Добавьте первую!</p>';
      return;
    }
    newsContainer.innerHTML = news.map(item => `
      <div class="news-card" data-id="${item.id}">
        <h3>${escapeHtml(item.title)}</h3>
        <div class="meta">Автор: ${escapeHtml(item.author)} • ${new Date(item.createdAt).toLocaleString()}</div>
        <p>${escapeHtml(item.content)}</p>
        <div class="actions">
          
          <button class="btn-delete" onclick="deleteNews('${item.id}')">Удалить</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    newsContainer.innerHTML = `<p style="color:red">${err.message}</p>`;
  }
}

// Добавление
formAdd.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('add-title').value.trim();
  const author = document.getElementById('add-author').value.trim();
  const content = document.getElementById('add-content').value.trim();
  if (!title || !author || !content) {
    addMessage.textContent = 'Заполните все поля';
    addMessage.style.color = 'red';
    return;
  }
  try {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, content }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Ошибка добавления');
    }
    addMessage.textContent = 'Новость добавлена!';
    addMessage.style.color = 'green';
    formAdd.reset();
    // Переключиться на список через 0.8 с
    setTimeout(() => navList.click(), 800);
  } catch (err) {
    addMessage.textContent = '❌ ' + err.message;
    addMessage.style.color = 'red';
  }
});

// Удаление
async function deleteNews(id) {
  if (!confirm('Удалить эту новость?')) return;
  try {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Ошибка удаления');
    loadNews();
  } catch (err) {
    alert(err.message);
  }
}

// Редактирование (простое: prompt)
async function editNews(id) {
  const res = await fetch(`${API}/${id}`);
  if (!res.ok) return alert('Новость не найдена');
  const news = await res.json();
  const newTitle = prompt('Новый заголовок:', news.title);
  if (newTitle === null) return;
  const newAuthor = prompt('Новый автор:', news.author);
  if (newAuthor === null) return;
  const newContent = prompt('Новое содержание:', news.content);
  if (newContent === null) return;

  try {
    const updateRes = await fetch(`${API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, author: newAuthor, content: newContent }),
    });
    if (!updateRes.ok) throw new Error('Ошибка обновления');
    loadNews();
  } catch (err) {
    alert(err.message);
  }
}

// Экранирование HTML
function escapeHtml(str) {
  return String(str).replace(/[&<>"]/g, s => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[s]));
}

// Первоначальная загрузка
loadNews();