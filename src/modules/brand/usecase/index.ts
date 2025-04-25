import { v7 } from "uuid";
import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";

import { IBrandUseCase } from "../interface";
import { Brand } from "../model/brand";
import {
  BrandCreateDTO,
  BrandCondDTO,
  BrandUpdateDTO,
  BrandCreateSchema,
} from "../model/dto";
import { ModelStatus } from "../../../share/model/base-model";

export class BrandUseCase implements IBrandUseCase {
  constructor(
    private readonly repository: IRepository<
      Brand,
      BrandCondDTO,
      BrandUpdateDTO
    >
  ) {}

  // create
  async create(data: BrandCreateDTO): Promise<string> {
    const {
      success,
      data: parseData,
      error,
    } = BrandCreateSchema.safeParse(data);
    const newId = v7();
    if (!success) {
      throw new Error(error.message);
    }
    const newBrand = {
      ...parseData,
      id: newId,
      status: ModelStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.insert(newBrand);
    return newId;
  }

  // getDetail
  getDetail(id: string): Promise<Brand | null> {
    throw new Error("Method not implemented.");
  }
  // list
  list(cond: BrandCondDTO, paging: PagingDTO): Promise<Array<Brand>> {
    throw new Error("Method not implemented.");
  }
  // update
  update(id: string, brand: BrandUpdateDTO): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  // delete
  delete(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
