interface PostBase {
  title: string
  overview: string
  content: string
}

export interface Post extends PostBase {
  id?: string
  title?: string
  overview?: string
  content?: string
}

export type PostRequest = PostBase
