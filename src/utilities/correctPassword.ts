import * as bcrypt from 'bcrypt';

const correctPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

export default correctPassword;
