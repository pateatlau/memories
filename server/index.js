import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import postRoutes from './routes/posts.js';

dotenv.config();

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
