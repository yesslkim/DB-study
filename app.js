import express from 'express';
import mongoose from 'mongoose';
import mockTasks from './data/mock.js';
import 'dotenv/config';
import Task from './models/Task.js';

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('db connected'));

const app = express();
// NOTE: Express 애플리케이션에서 JSON 형태의 요청 body를 파싱하기 위해 사용되는 미들웨어
app.use(express.json());

app.get('/tasks', async (req, res) => {
    // NOTE: 쿼리 스트링
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;

    const tasks = await Task
        .find()
        .sort({
            createdAt: sort === 'oldest' ? 'asc' : 'desc'
        })
        .limit(count);

    res.send(tasks);
});

app.get('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    const task = await Task.findById(id);

    if (task) {
        res.send(task);
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;

    const ids = mockTasks.map(t => t.id);

    newTask.id = Math.max(...ids) + 1;
    newTask.isComplete = false;
    newTask.createdAt = new Date();
    newTask.updatedAt = new Date();

    mockTasks.push(newTask);

    res.status(201).send(newTask)
});

app.patch('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = mockTasks.find(t => t.id === id);

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
    const idx = mockTasks.findIndex(t => t.id === id);

    if (task >= 0) {
        mockTasks.splice(idx, 1);
        res.sendStatus(204); // NOTE: status만 보낼때 
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
})


app.listen(3000, () => console.log('server started'));
