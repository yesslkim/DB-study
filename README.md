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
