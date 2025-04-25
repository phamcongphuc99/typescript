import { Request, Response } from "express";
import { CategoryCondDTOSchema, categoryCreateSchema } from "../../model/dto";
import { ICategoryUseCase } from "../../interface";
import { PagingDTOScheme } from "../../../../share/model/paging";
import { Category } from "../../model/model";

export class CategoryHttpService {
  constructor(private readonly useCase: ICategoryUseCase) {}

  // function create a new category
  async createANewCategoryAPI(req: Request, res: Response) {
    const { success, data, error } = categoryCreateSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    const result = await this.useCase.createANewCategory(data);
    res.status(201).json({
      message: "Category created successfully",
      data: result,
    });
  }

  // function get category
  async getCategoryAPI(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.useCase.getCategory(id);

    res.status(200).json({
      data: result,
    });
  }

  // function list category
  async listCategoryAPI(req: Request, res: Response) {
    // const {
    //   success,
    //   data: paging,
    //   error,
    // } = PagingDTOScheme.safeParse(req.query);

    // if (!success) {
    //   res.status(400).json({
    //     message: "invalid request",
    //     error: error.message,
    //   });
    //   console.log(error);
    //   return;
    // }

    const paging = {
      page: 1,
      limit: 100,
    };

    const cond = CategoryCondDTOSchema.parse(req.query);
    const result = await this.useCase.listCategory(cond, paging);

    const categoryTree = this.buildTree(result);

    res.status(200).json({
      data: categoryTree,
      paging,
      filter: cond,
    });
  }

  // function update category
  async updateCategoryAPI(req: Request, res: Response) {
    const { id } = req.params;
    const { success, data, error } = categoryCreateSchema.safeParse(req.body);
    if (!success) {
      res.status(400).json({
        message: error.message,
      });
      return;
    }
    const result = await this.useCase.updateCategory(id, data);
    res.status(200).json({
      message: "Category updated  successfully",
      data: result,
    });
  }

  // function delete category
  async deleteCategoryAPI(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this.useCase.deleteCategory(id);
    res.status(200).json({
      message: "Category deleted successfully",
      data: result,
    });
  }

  // build tree
  private buildTree(categories: Category[]): Category[] {
    const categoriesTree: Category[] = [];
    const mapChildren = new Map<string, Category[]>();

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      if (!mapChildren.get(category.id)) {
        mapChildren.set(category.id, []);
      }
      category.children = mapChildren.get(category.id);

      if (!category.parentId) {
        categoriesTree.push(category);
      } else {
        const children = mapChildren.get(category.parentId);
        children
          ? children.push(category)
          : mapChildren.set(category.parentId, [category]);
      }
    }
    return categoriesTree;
  }
}
