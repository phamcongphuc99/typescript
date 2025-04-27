import { IRepository } from "../../../share/interface";
import { PagingDTO } from "../../../share/model/paging";

import { Brand } from "../model/brand";
import { BrandCondDTO, BrandCreateDTO, BrandUpdateDTO } from "../model/dto";

export interface IBrandUseCase {
  create(data: BrandCreateDTO): Promise<string>;
  getDetail(id: string): Promise<Brand | null>;
  list(cond: BrandCondDTO, paging: PagingDTO): Promise<Array<Brand>>;
  update(id: string, brand: BrandUpdateDTO): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export interface IBrandRepository
  extends IRepository<Brand, BrandCondDTO, BrandUpdateDTO> {}
