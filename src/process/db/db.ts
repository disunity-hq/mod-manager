import { app } from 'electron';
import Datastore from 'nedb';
import { TargetInfo } from '../../models/TargetInfo';
import { readdir } from '../promisified';
import { basename } from 'path';
import { promisify } from 'util';
import { getNameFromTarget } from '../helpers';

const INFO_ID = 'target_info';

const dbFactory = (filename: string): Datastore =>
  new Datastore({ filename: `${app.getPath('userData')}/data/${filename}`, autoload: true });

class DatabaseManager {
  private db: { [key: string]: Datastore } = {};

  public createTargetDB(target: TargetInfo): Promise<void> {
    const filename = getNameFromTarget(target);
    return new Promise((resolve, reject) => {
      const db = dbFactory(`${filename}.db`);
      db.insert({ _id: INFO_ID, ...target }, err => {
        if (err) reject(err);
        else resolve();
      });

      this.db[filename] = db;
    });
  }

  public async loadTargetDBs(): Promise<void> {
    const files = (await readdir(`${app.getPath('userData')}/data`))
      .filter(f => f.endsWith('.db'))
      .map(f => basename(f).slice(0, -3));

    const db: { [key: string]: Datastore } = {};
    for (const filename of files) {
      db[filename] = dbFactory(`${filename}.db`);
    }

    this.db = db;
  }

  public getTargetNames(): string[] {
    return Object.keys(this.db);
  }

  public getTargetInfo(targetId: string): Promise<TargetInfo> {
    const targetDb = this.db[targetId];
    const findOne = promisify(targetDb.findOne.bind(targetDb));
    return findOne({ _id: INFO_ID }, { _id: 0 });
  }
}

const db = new DatabaseManager();

export default db;
