import express from 'express';
import tasks from './data/mock.js';

const app = express();

app.get('/tasks', (req, res) => {
    // NOTE: 쿼리 스트링
    const sort = req.query.sort; 
    const count = Number(req.query.count);
    
    const getSortedTasks = sort === 'oldest'
        ? (a, b) => a.createdAt - b.createdAt
        : (a, b) => b.createdAt - a.createdAt;

    let newTasks = tasks.sort(getSortedTasks);

    if(count) {
        newTasks = newTasks.slice(0,count);
    }
    // NOTE: res.send() : 자바스크립트의 객체를 JSON으로 리턴함
    res.send(newTasks);
});

app.listen(3000, () => console.log('server started'));
