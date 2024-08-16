import { getUserByName } from "../couchdb/user";

export const logIn = async (signInUser) => {
  const user = await getUserByName(signInUser.name);
  if (user && user.password === signInUser.pwd) {
    return user;
  }

  return null;
};
