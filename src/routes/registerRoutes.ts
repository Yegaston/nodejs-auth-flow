import { Router } from "express";
import { registerUser } from "../modules/register/register";

export const routerRegister = Router();

routerRegister.get("/", (req, res) => {
  res.send("No me dejes solo, muero en los despojos.");
});

routerRegister.post("/", async (req, res) => {
  const response = req.body;
  const userData = {
    email: response.email,
    password: response.password
  };

  const registerRes = await registerUser(userData);
  if (registerRes === null) {
    res.send("Register Succesfully");
  } else {
    console.log(registerRes);
  }

});
