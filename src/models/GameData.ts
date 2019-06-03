export interface GameData {
  name: string;
  id: string;
}

export interface GamesMap {
  [id: string]: GameData;
}
