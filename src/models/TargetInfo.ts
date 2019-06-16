export interface TargetInfo {
  disunityVersions: string[];
  name: string;
  hashes: TargetHashes;
}

export interface TargetHashes {
  executable: string;
  path: string;
}
