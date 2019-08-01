import { app } from 'electron';
import Datastore from 'nedb';
import { TargetInfo } from '../../models/TargetInfo';
import { readdir } from '../promisified';
import { basename, join } from 'path';
import { promisify } from 'util';
import { getNameFromTarget, getManagedPathFromTarget } from '../helpers';

const INFO_ID = 'target_info';

const dbFactory = (filename: string): Datastore =>
  new Datastore({ filename: `${app.getPath('userData')}/data/${filename}`, autoload: true });

interface DatabaseMap {
  [key: string]: Datastore;
}

class DatabaseManager {
  private db: DatabaseMap = {};

  public async createTargetDB(target: TargetInfo): Promise<void> {
    const managedFolder = getManagedPathFromTarget(target);
    const filename = join(managedFolder, 'mods.db');
    const db = dbFactory(filename);
    this.db[filename] = db;
  }

  public async loadTargetDBs(): Promise<void> {
    const files = (await readdir(`${app.getPath('userData')}/data`))
      .filter(f => f.endsWith('.db'))
      .map(f => basename(f).slice(0, -3));

    const db: DatabaseMap = {};
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
