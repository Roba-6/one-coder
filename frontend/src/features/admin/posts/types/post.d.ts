interface PostBase {
  title: string
  overview: string
  content: string
  createdAt?: string
  updatedAt?: string
}

export interface Post extends PostBase {
  id?: string
  title?: string
  overview?: string
  content?: string
}

export type CreatePostRequest = PostBase
export type UpdatePostRequest = PostBase
