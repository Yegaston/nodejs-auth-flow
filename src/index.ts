import { startServer } from "./startServer";
import "reflect-metadata";
import { createTypeormConn } from "./createTypeormConn";

createTypeormConn();
startServer();