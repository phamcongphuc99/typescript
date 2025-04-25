import { Router } from "express";

import { Sequelize } from "sequelize";
import { init, modelName } from "./infras/repository/dto";
import { MySQLCategoryRepository } from "./infras/repository/repo";
import { CategoryUseCase } from "./usecase";
import { CategoryHttpService } from "./infras/transport/http-service";
// Adjust the path as needed

export const setupCategoryModuleHexagon = (sequelize: Sequelize) => {
  init(sequelize);

  const repository = new MySQLCategoryRepository(sequelize, modelName);
  const useCase = new CategoryUseCase(repository);
  const httpService = new CategoryHttpService(useCase);
  const router = Router();

  router.get("/categories", httpService.listCategoryAPI.bind(httpService));
  router.get("/categories/:id", httpService.getCategoryAPI.bind(httpService));
  router.post(
    "/categories",
    httpService.createANewCategoryAPI.bind(httpService)
  );
  router.patch(
    "/categories/:id",
    httpService.updateCategoryAPI.bind(httpService)
  );
  router.delete(
    "/categories/:id",
    httpService.deleteCategoryAPI.bind(httpService)
  );
  return router;
};
