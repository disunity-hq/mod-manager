import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import { GamesMap, GameData } from '../../models';
import { GAME_API_BASE_URL } from './constants';
import { map } from 'rxjs/operators';
import { TargetInfo } from '../../models/TargetInfo';

interface SerializedGameData {
  name: string;
  id: string;
}

type SerializedGamesResponse = SerializedGameData[];

export const getAll = (): Observable<GamesMap> =>
  ajax.getJSON<SerializedGamesResponse>(GAME_API_BASE_URL).pipe(
    map(
      (res): GamesMap => {
        const data = res.map((game): GameData => ({ name: game.name, id: game.id }));
        const obj: GamesMap = {};
        for (const gameData of data) {
          obj[gameData.id] = gameData;
        }
        return obj;
      }
    )
  );

export const findTargetByHash = (hash: string): Observable<TargetInfo> =>
  ajax.getJSON<TargetInfo>(GAME_API_BASE_URL + `/autodetect?hash=${hash}`);
