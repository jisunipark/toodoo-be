const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

let todos = [
  {
    id: 'e7ec',
    checked: false,
    todo: '자바스크립트 공부하기',
    date: '24. 12. 4.',
  },
  {
    id: '5700',
    checked: false,
    todo: '알고리즘 강의 듣기',
    date: '24. 12. 4.',
  },
  {
    id: '3c1e',
    checked: false,
    todo: '투두리스트 만들기',
    date: '24. 12. 4.',
  },
];

app.get('/todos', (req, res) => {
  res.status(200).json(todos);
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);
  if (todo) res.status(200).json(todo);
  else res.status(404).json({ error: 'Todo not found', message: '해당 todo를 찾을 수 없습니다.' });
});

app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(200).json(newTodo);
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const targetTodo = todos.find((todo) => todo.id === id);
  for (let key in req.body) {
    targetTodo[key] = req.body[key];
  }
  todos.map((todo) => {
    if (todo.id === id) return targetTodo;
  });
  res.status(200).json(targetTodo);
});

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todos = todos.filter((todo) => todo.id !== id);
    res.status(200).end();
  } else
    res.status(404).json({ error: 'Todo not found', message: '해당 todo를 찾을 수 없습니다.' });
});

app.listen(port, () => console.log(`listening on port ${port}`));
