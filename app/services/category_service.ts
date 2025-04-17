import Category from "#models/category";

export class CategoryService {
  async all() {
    return await Category.query()
  }
}