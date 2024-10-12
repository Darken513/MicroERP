import { Request, Response } from 'express';
import { BaseHttpService } from '../services/basehttp.service';

export abstract class BaseHttpController<T> {
  protected service: BaseHttpService<T>;

  constructor(service: BaseHttpService<T>) {
    this.service = service;
  }

  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const defs = await this.service.getAll();
      res.json({ defs });
    } catch (error) {
      console.error('Error getting documents:', error);
      res.status(500).json({ title: 'Error', body: 'Pas de données disponibles.' });
    }
  }

  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const def = await this.service.getById(req.params.id);
      if (!def) {
        res.status(404).json({ title: 'Erreur', body: "L'article n'a pas été trouvé." });
      } else {
        res.json({ def });
      }
    } catch (error) {
      console.error('Error getting document:', error);
      res.status(500).json({ title: 'Erreur', body: 'Pas de données disponibles.' });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const def = await this.service.create(req.body);
      res.json({ new: def });
    } catch (error) {
      console.error('Error adding document:', error);
      res.status(500).json({ done: false });
    }
  }

  public async deleteById(req: Request, res: Response): Promise<void> {
    try {
      await this.service.deleteById(req.params.id);
      res.json({ done: true });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(500).json({ done: false });
    }
  }

  public async updateById(req: any, res: any): Promise<void> {
    const { id } = req.params;
    const data = req.body;
    try {
      await this.service.updateById(id, data);
      res.status(200).send({ message: `Document with id ${id} updated successfully` });
    } catch (error) {
      console.error('Error deleting document:', error);
      res.status(400).send({ done: false });
    }
  }
}