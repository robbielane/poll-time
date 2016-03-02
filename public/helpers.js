import crypto from 'crypto';

let helpers = {
  generateId: () => {
    return crypto.randomBytes(10).toString('hex');
  }
}

export default helpers;
