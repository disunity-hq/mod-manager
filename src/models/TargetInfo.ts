export interface TargetInfo {
  disunityVersions: string[];
  name: string;
  displayName: string;
  hashes: TargetHashes;
  path: string;
}

export interface TargetHashes {
  executable: string;
  path: string;
}
