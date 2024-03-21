import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import routes from './routes';

class App {
  constructor() {
    this.server = express();

    mongoose.connect(
      'mongodb+srv://devhouse:devhouse@devhouse.axnvngy.mongodb.net/?retryWrites=true&w=majority&appName=DevHouse',
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors({}));
    // ao clicar na url, ele abre no navegador
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '../uploads'))
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
