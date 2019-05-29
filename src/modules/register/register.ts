import * as bcrypt from "bcrypt";

import { User } from "../../entity/User";
import uuid = require("uuid");

export const registerUser = async userData => {
  console.log(
    "User y Password Register Function",
    userData.email,
    userData.password
  );

  // Hash password:
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(userData.password, salt);
  const id = await uuid.v4();
  const user = User.create({
    id,
    email: userData.email,
    password: hashPass
  });

  await User.save(user);
  return null;
};
