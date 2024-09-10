import express, { Request, Response } from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import bodyParser from 'body-parser';
import { initializeRouters } from './routers/routersInitializer';

// Initialize Firestore database
const serviceAccount = require(__dirname + "/microerp-7b08c-firebase-adminsdk-1frx7-d9ff8e7d57.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://microerp-7b08c.firebaseio.com',
});

export const db = admin.firestore();

class App {
  public app: express.Application;
  private port: number | string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.initializeMiddlewares();
    this.initializeRouters();
    this.handleFallback();
    this.handleErrors();
  }

  private initializeMiddlewares(): void {
    this.app.use(express.static(__dirname + "/public"));
    this.app.use(cors());
    this.app.use(bodyParser.json());
  }

  private initializeRouters(): void {
    initializeRouters(this.app, db);
  }

  private handleFallback(): void {
    this.app.use((req: Request, res: Response) => {
      res.redirect('/');
    });
  }

  private handleErrors(): void {
    process.on('uncaughtException', (error: Error) => {
      console.error('Error: ', error);
    });
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}

const appInstance = new App();
appInstance.start();