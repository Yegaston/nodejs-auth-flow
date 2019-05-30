import * as bcrypt from "bcrypt";

import { User } from "../../entity/User";
import { v4 } from "uuid";
import * as yup from "yup";
import { failedValidations, emailAlreadyTaken } from "../errorMessages";


const date = new Date();
export const registerUser = async userData => {
  let userSchema = yup.object().shape({
    email: yup.string().email(),
    password: yup.string(),
    createdOn: yup.string()
  });
  const email = userData.email;
  const password = userData.email;

  const userAlreadyExist = await User.findOne({ where: { email: email } });
  console.log("Search Email: ", userAlreadyExist);

  if (userAlreadyExist) {
    return {path: "register", errMessage: emailAlreadyTaken};
  }

  // Hash password:
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  const id = await v4();

  const dataToValidate = {
    id,
    email,
    password: hashPass,
    registerAt: date.getTime().toString()
  };

  // Validate user.
  const userValid = await userSchema.isValid(dataToValidate);

  if (userValid) {
    const user = User.create(dataToValidate);
    await User.save(user);
  } else {
    return {path: "register", errMessage: failedValidations};
  }

  // Register user
  return null;
};
