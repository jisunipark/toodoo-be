const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const todos = [
  {
    id: 1,
    checked: false,
    todo: '자바스크립트 공부하기',
    date: '24. 12. 4.',
  },
  {
    id: 2,
    checked: false,
    todo: '알고리즘 강의 듣기',
    date: '24. 12. 4.',
  },
  {
    id: 3,
    checked: false,
    todo: '투두리스트 만들기',
    date: '24. 12. 4.',
  },
];

app.get('/api/todos', (req, res) => {
  res.status(200).send(todos);
});

app.get('/api/todos/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  const findTodo = todos.find((todo) => todo.id === parsedId);
  if (isNaN(parsedId)) return res.status(400).send({ message: 'Bad Request. Invalid ID.' });
  if (!findTodo) return res.sendStatus(404);
  else return res.status(200).send(findTodo);
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos[todos.length - 1].id + 1,
    ...req.body,
  };
  todos.push(newTodo);
  res.status(200).send(newTodo);
});

app.patch('/api/todos/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(400).send({ message: 'Bad Request. Invalid ID.' });

  const findTodoIndex = todos.findIndex((todo) => todo.id === parsedId);
  if (findTodoIndex === 1) return response.sendStatus(404);

  todos[findTodoIndex] = { ...todos[findTodoIndex], ...req.body };
  res.sendStatus(200);
});

app.delete('/api/todos/:id', (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) return res.status(400).send({ message: 'Bad Request. Invalid ID.' });

  const findTodoIndex = todos.findIndex((todo) => todo.id === parsedId);
  if (findTodoIndex === 1) return response.sendStatus(404);

  todos.splice(findTodoIndex, 1);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`listening on port ${PORT}`));
