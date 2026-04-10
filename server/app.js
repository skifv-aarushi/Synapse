import express from 'express';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import notesRouter from './routes/notes.js';
import { initDatabase } from './db/database.js';

const app = express();
app.use(cors());
app.use(express.json());

await initDatabase();

app.use('/tasks', tasksRouter);
app.use('/notes', notesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Synapse API' });
});

export default app;
