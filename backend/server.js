const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Fake Database فـ الذاكرة
let links = [
  { id: 1, title: "My Portfolio 🔗", url: "https://google.com" },
  { id: 2, title: "My YouTube Channel", url: "https://youtube.com" }
];

app.get('/', (req, res) => {
  res.json({ message: "LinkHub Pro API is running 🚀 (No DB Mode)" });
});

// جيب كل اللينكات
app.get('/api/links', (req, res) => {
  res.json(links);
});

// زيد لينك جديد
app.post('/api/links', (req, res) => {
  const newLink = {
    id: Date.now(),
    title: req.body.title,
    url: req.body.url
  };
  links.push(newLink);
  res.json(newLink);
});

// مسح لينك
app.delete('/api/links/:id', (req, res) => {
  links = links.filter(l => l.id != req.params.id);
  res.json({ message: "Deleted" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} ✅ - No DB Mode`));