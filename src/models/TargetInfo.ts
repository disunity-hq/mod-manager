export interface DisunityVersion {
  disunityVersion: string;
  downloadUrl: string;
}

export interface TargetInfo {
  name: string;
  displayName: string;
  iconUrl?: string;
}

export interface TargetHashes {
  executable: string;
  path: string;
}

export interface TargetDetails extends TargetInfo {
  disunityVersions: DisunityVersion[];
}
