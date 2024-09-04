# todo-api

- Node.js 공부한 내용 정리

#### Express 기본 코드

```JS
import express from 'express';

const app = express();

// 라우트 정의

app.listen(3000, () => console.log('Server Started'));

```

#### CRUD

```JS
app.method(path, handler)

// method: HTTP 메소드 이름
// path: 엔드포인트 경로
// handler(req, res): 리퀘스트 로직을 처리하고 리스폰스를 돌려주는 핸들러 함수.

app.get('/some/path', (req, res) => {
  // 리퀘스트 처리
});

// CREATE
app.post('/tasks', async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).send(newTask);
});

// READ
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});

app.get('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

// UPDATE
app.patch('/tasks/:id', async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task) {
    Object.keys(req.body).forEach((key) => {
      task[key] = req.body[key];
    });
    await task.save();
    res.send(task);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

// DELETE
app.delete('/tasks/:id', async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (task) {
    res.sendStatus(204);
  } else {
    res.status(404).send({ message: 'Cannot find given id.' });
  }
});

// 필터링
app.get('/tasks', async (req, res) => {
    /** 쿼리 파라미터
     *  - sort: 'oldest'인 경우 오래된 태스크 기준, 나머지 경우 새로운 태스크 기준
     *  - count: 태스크 개수
     */
    const sort = req.query.sort;
    const count = Number(req.query.count) || 0;

    const sortOption = { createdAt: sort === 'oldest' ? 'asc' : 'desc' };
    const tasks = await Task.find().sort(sortOption).limit(count);

    res.send(tasks);
  })
);
```

- 비동기 코드에서 오류 발생 시 서버가 죽기 때문에 처리가 필요함

```
function asyncHandler(handler) {
  return async function (req, res) {
    try {
      await handler(req, res);
    } catch (e) {
      // e.name(오류 이름), e.message(오류 메시지) 이용해서 오류 처리
    }
  };
}
```

#### REQUEST

```JS
req.query;  // { foo: '1', bar: '2' }
req.params // { id: '1', name: 'james' }
req.body;  // { field1: 'value1', field2: 'value2' }
```

#### RESPONSE

```JS
res.send();
res.status();
res.sendStatus(); // res없이 status만
```

#### mongoose

- mongoose는 MongoDB의 ODM 라이브러리이다.
- [mongoose에 대한 설명](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)
- [validation 공식문서](https://mongoosejs.com/docs/validation.html)
