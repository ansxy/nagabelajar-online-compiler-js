import { Config } from "./config/config";
import { app } from "./pkg/express/express";
import { Server } from "./server";
require("dotenv").config();

try {
  const config = new Config();
  const server = new Server(config);
  const appEnv = config.getAppConfig();
  const sv = server.start(app);
  sv.listen(appEnv.port, () => {
    console.log(`Server is running on port ${appEnv.port}`);
  });
} catch (error) {
  console.error(`Error: ${error}`);
}
