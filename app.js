import express from 'express';
import tasks from './data/mock.js';

const app = express();
// NOTE: Express 애플리케이션에서 JSON 형태의 요청 body를 파싱하기 위해 사용되는 미들웨어
app.use(express.json());

app.get('/tasks', (req, res) => {
    // NOTE: 쿼리 스트링
    const sort = req.query.sort;
    const count = Number(req.query.count);

    const getSortedTasks = sort === 'oldest'
        ? (a, b) => a.createdAt - b.createdAt
        : (a, b) => b.createdAt - a.createdAt;

    let newTasks = tasks.sort(getSortedTasks);

    if (count) {
        newTasks = newTasks.slice(0, count);
    }
    // NOTE: res.send() : 자바스크립트의 객체를 JSON으로 리턴함
    res.send(newTasks);
});

app.get('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (task) {
        res.send(task);
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;

    const ids = tasks.map(t => t.id);

    newTask.id = Math.max(...ids) + 1;
    newTask.isComplete = false;
    newTask.createdAt = new Date();
    newTask.updatedAt = new Date();

    tasks.push(newTask);

    res.status(201).send(newTask)
});

app.patch('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);

    if (task) {
        Object.keys(req.body).forEach(key => {
            task[key] = req.body[key];
        });
        task.updatedAt = new Date();

        res.send(task);
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
});

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const idx = tasks.findIndex(t => t.id === id);

    if (task >= 0) {
        tasks.splice(idx, 1);
        res.sendStatus(204); // NOTE: status만 보낼때 
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
})


app.listen(3000, () => console.log('server started'));
