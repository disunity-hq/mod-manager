import { hashFile, hashText } from '../promisified';

import { TargetHashes } from '../../models/TargetInfo';

const calcTargetHashes = async (filePath: string) => {
  const executable = await hashFile(filePath);
  const pathHash = await hashText(filePath);
  const results: TargetHashes = { executable, path: pathHash };
  return results;
};

export default calcTargetHashes;
