import { Op, Sequelize } from "sequelize";
import { Category, categorySchema } from "../../model/model";
import { IRepository } from "../../interface";
import { PagingDTO } from "../../../../share/model/paging";
import { CategoryCondDTO, CategoryUpdateDTO } from "../../model/dto";
import { ModelStatus } from "../../../../share/model/base-model";
import { console } from "inspector";

export class MySQLCategoryRepository implements IRepository {
  constructor(
    private readonly sequelize: Sequelize,
    private modelName: string
  ) {}
  async get(id: string): Promise<Category | null> {
    const data = await this.sequelize.models[this.modelName].findByPk(id);

    if (!data) {
      return null;
    }
    const persistenceData = data.get({ plain: true });

    return {
      ...persistenceData,
      children: [],
      createdAt: persistenceData.createdAt,
      updatedAt: persistenceData.updatedAt,
    } as Category;
    // return data.get({ plain: true }) as Category;
  }

  async list(
    cond: CategoryCondDTO,
    paging: PagingDTO
  ): Promise<Array<Category>> {
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

  async insert(data: Category): Promise<boolean> {
    await this.sequelize.models[this.modelName].create(data);
    return true;
  }
  async update(id: string, data: CategoryUpdateDTO): Promise<boolean> {
    await this.sequelize.models[this.modelName].update(data, {
      where: {
        id,
      },
    });
    return true;
  }
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
