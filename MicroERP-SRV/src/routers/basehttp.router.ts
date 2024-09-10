import { Router } from 'express';
import { BaseHttpController } from '../controllers/basehttp.controller';

export abstract class BaseHttpRouter<T> {
  public router: Router;

  protected constructor(protected controller: BaseHttpController<T>) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/getAll', (req, res) => this.controller.getAll(req, res));
    this.router.get('/getById/:id', (req, res) => this.controller.getById(req, res));
    this.router.post('/create', (req, res) => this.controller.create(req, res));
    this.router.get('/deleteById/:id', (req, res) => this.controller.deleteById(req, res));
    this.router.put('/updateById/:id', (req, res) => this.controller.updateById(req, res));
  }
}
