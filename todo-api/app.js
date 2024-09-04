import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import Task from './models/Task.js';

mongoose.connect(process.env.DATABASE_URL).then(() => console.log('db connected'));

const corsOptions = {
    origin: ['http://127.0.0.1:3000'],
};

const app = express();
app.use(cors(corsOptions));
// NOTE: Express 애플리케이션에서 JSON 형태의 요청 body를 파싱하기 위해 사용되는 미들웨어
app.use(express.json());

const asyncHandler = (handler) => {
    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (e) {
            if (e.name === 'ValidationError') {
                res.status(400).send({ message: e.message });
            } else if (e.name === 'CastError') {
                res.status(404).send({ message: 'cannot find given id' });
            } else {
                res.status(500).send({ message: e.message });
            }
        }
    }
}

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

app.get('/tasks/:id', asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const task = await Task.findById(id);

    if (task) {
        res.send(task);
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
}));

app.post('/tasks', asyncHandler(async (req, res) => {
    const newTask = await Task.create(req.body);
    res.status(201).send(newTask)
}));

app.patch('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    const task = await Task.findById(id);

    if (task) {
        Object.keys(req.body).forEach(key => {
            task[key] = req.body[key];
        });
        await task.save();
        res.send(task);
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const id = Number(req.params.id);
    const task = await Task.findByIdAndDelete(id);

    if (task) {
        res.sendStatus(204); // NOTE: status만 보낼때 
    } else {
        res.status(404).send({ message: '해당 task를 찾을 수 없습니다.' })
    }
})


app.listen(3000, () => console.log('server started'));
