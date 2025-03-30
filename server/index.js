import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import postRoutes from './routes/posts.js';

dotenv.config();
// TEMP STARTS
// const arr1 = [
//   [1, 2, 3],
//   [4, 5],
// ];
// const arr2 = [0, [0.1, [[1, [1.1]], 2, 3], [4, 5], 6, 7], 8];
// function flatten(arr, level = 1) {
//   if (level === 0) return arr;
//   return arr.reduce(function (flat, toFlatten) {
//     return flat.concat(
//       Array.isArray(toFlatten) ? flatten(toFlatten, level - 1) : toFlatten
//     );
//   }, []);
// }

// console.log(flatten(arr1, 0));
// console.log(flatten(arr2, 0));
import fs from 'fs';
console.log('Start');

setTimeout(() => {
  console.log('Timeout 1');
}, 700);

setImmediate(() => {
  console.log('Immediate 1');
});

process.nextTick(() => {
  console.log('nextTick 1');
});

new Promise((resolve) => {
  resolve('Resolved 1');
}).then((res) => {
  console.log(res);
});

setTimeout(() => {
  console.log('Timeout 2');
}, 300);

fs.readFile('package.json', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File Read Complete:', data);
});

console.log('End');

// TENP ENDS

const app = express();

app.use(cors());
app.use('/posts', postRoutes);
app.use('/post', postRoutes);

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;

const CONNECTION_STRING = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.6qqqd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_STRING, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);

console.log(CONNECTION_STRING);
