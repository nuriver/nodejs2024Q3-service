import * as bcrypt from 'bcrypt';

const hashPassword = async (
  plainPassword: string,
  saltRounds: number,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};

export default hashPassword;
