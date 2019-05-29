import * as express from "express";
import * as morgan from "morgan";
import { routerRegister } from "./routes/registerRoutes";
// Create a new express application instance
const app: express.Application = express();

// Settings
app.set('port', process.env.PORT || 3500);

// Midlewares
app.use(morgan("dev"));
app.use(express.json())


// Routes


app.get("/", function(req, res) {
  res.send("Ndeah dijo el coscueano!");
});
app.use("/register", routerRegister);




export const startServer = () => {
  app.listen(app.get('port'), function() {
    console.log("Example app listening on port ", app.get('port'));
  });
};
