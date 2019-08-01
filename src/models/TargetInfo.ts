export interface DisunityVersion {
  disunityVersion: string;
  downloadUrl: string;
}

export interface TargetInfo {
  name: string;
  displayName: string;
  hashes: TargetHashes;
  disunityVersions: string[];
  iconUrl?: string;
}

export interface TargetHashes {
  executable: string;
  path: string;
}
