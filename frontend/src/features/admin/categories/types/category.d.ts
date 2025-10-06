interface CategoryBase {
  name: string
  alias: string
}

export interface Category extends CategoryBase {
  id?: string
  name?: string
  alias?: string
}

export type CategoryRequest = CategoryBase
