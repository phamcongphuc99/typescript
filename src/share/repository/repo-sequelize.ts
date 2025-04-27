import { Op, Sequelize } from "sequelize";
import { IRepository } from "../interface";
import { PagingDTO } from "../model/paging";
import { ModelStatus } from "../model/base-model";

export abstract class BaseRepositorySequelize<Entity, Cond, UpdateDTO>
  implements IRepository<Entity, Cond, UpdateDTO>
{
  constructor(
    private readonly sequelize: Sequelize,
    private readonly modelName: string
  ) {}
  async findByCond(cond: UpdateDTO): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName].findOne({
      where: cond as any,
    });

    if (!data) {
      return null;
    }

    const persistenceData = data.get({ plain: true });
    return persistenceData as Entity;
  }

  // get data by id
  async get(id: string): Promise<Entity | null> {
    const data = await this.sequelize.models[this.modelName].findByPk(id);

    if (!data) {
      return null;
    }
    const persistenceData = data.get({ plain: true });

    return {
      ...persistenceData,
      createdAt: persistenceData.createdAt,
      updatedAt: persistenceData.updatedAt,
    } as Entity;
  }

  // get all data
  async list(cond: UpdateDTO, paging: PagingDTO): Promise<Array<Entity>> {
    const { page, limit } = paging;
    const condSQL = { ...cond, status: { [Op.ne]: ModelStatus.DELETED } };
    const total = await this.sequelize.models[this.modelName].count({
      where: condSQL,
    });
    paging.total = total;
    const rows = await this.sequelize.models[this.modelName].findAll({
      where: condSQL,
      limit: limit,
      offset: (page - 1) * limit,
      order: [["id", "DESC"]],
    });

    return rows.map((row) => row.get({ plain: true }));
  }

  // insert data
  async insert(data: Entity): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data as any);
    return true;
  }

  // update data
  async update(id: string, data: Cond): Promise<boolean> {
    await this.sequelize.models[this.modelName].update(data as any, {
      where: {
        id,
      },
    });
    return true;
  }

  // delete data
  async delete(id: string, isHard: boolean = false): Promise<boolean> {
    if (isHard) {
      await this.sequelize.models[this.modelName].update(
        {
          status: ModelStatus.DELETED,
        },
        {
          where: {
            id,
          },
        }
      );
      return true;
    } else {
      await this.sequelize.models[this.modelName].destroy({
        where: {
          id,
        },
      });
      return true;
    }
  }
}
