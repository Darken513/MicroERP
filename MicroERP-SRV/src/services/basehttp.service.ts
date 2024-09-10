import { Firestore, CollectionReference, DocumentSnapshot } from 'firebase-admin/firestore';

export abstract class BaseHttpService<T> {
  protected collectionRef: CollectionReference<T>;

  constructor(db: Firestore, collectionName: string) {
    this.collectionRef = db.collection(collectionName) as CollectionReference<T>;
  }

  public async getAll(): Promise<T[]> {
    const snapshot = await this.collectionRef.get();
    return snapshot.docs.map((doc: DocumentSnapshot<T>) => ({
      id: doc.id,
      ...doc.data()
    } as T));
  }

  public async getById(id: string): Promise<T | null> {
    const docSnapshot = await this.collectionRef.doc(id).get();
    if (!docSnapshot.exists) return null;
    return { id, ...docSnapshot.data() } as T;
  }

  public async create(data: T): Promise<T> {
    const tosave = {
      ...data,
      created_at: new Date(),
    };
    const docRef = await this.collectionRef.add(tosave as T);
    return {id:docRef.id, ...tosave};
  }

  public async deleteById(id: string): Promise<void> {
    await this.collectionRef.doc(id).delete();
  }

  public async updateById(id: string, data: Partial<T>): Promise<void> {
    const docRef = this.collectionRef.doc(id);
    const exists = (await docRef.get()).exists;
    if (!exists) {
      throw new Error(`Document with id ${id} does not exist`);
    }
    await docRef.update({
      ...data,
      updated_at: new Date(), // Optionally, track when the update happened
    });
  }
}
