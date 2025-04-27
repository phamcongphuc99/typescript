// console.log("HI CURD");
import express, { Request, Response } from "express";
import { config } from "dotenv";
import { setupCategoryModuleHexagon } from "./modules/category";
import sequelize from "./share/component/sequelize";
import { setupBrandHexagon } from "./modules/brand";

config({ path: __dirname + "/.env" });

(async () => {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");

  const app = express();
  const port = process.env.PORT || 3000;
  const db = process.env.DB_NAME;
  app.use(express.json());
  app.get("/", (req: Request, res: Response) => {
    console.log("PORT from .env:", process.env.PORT);
    // res.send(process.env.PORT);
  });

  // app.use("/v1", setupCategoryModule(sequelize));
  app.use("/v1", setupCategoryModuleHexagon(sequelize));
  app.use("/v1", setupBrandHexagon(sequelize));
  app.listen(port, () => {
    console.log(`run port  ${port}`);
  });
})();
