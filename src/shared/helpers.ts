export const deepFreeze = (obj: { [key: string]: any }): void => {
  Object.freeze(obj);
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        deepFreeze(obj[key]);
      }
    }
  }
};

export const isRenderer = process && process.type === 'renderer';
