import type { FormFieldItem } from 'one-public-ui'
import { getLocalMessage } from 'one-public-ui'
import { z } from 'zod/v4'

export const newPostItems: FormFieldItem[] = [
  {
    name: 'title',
    label: getLocalMessage('labels.post.title'),
    type: 'text',
    defaultValue: '',
    validate: z.string().min(1, { message: getLocalMessage('Title is required') }),
  },
  {
    name: 'overview',
    label: getLocalMessage('labels.post.overview'),
    type: 'text',
    defaultValue: '',
    validate: z.string().min(0, { message: getLocalMessage('Overview is required') }),
  },
  {
    name: 'content',
    label: getLocalMessage('labels.post.content'),
    type: 'textarea',
    defaultValue: '',
    validate: z.string().min(0, { message: getLocalMessage('Content is required') }),
  },
]

export const postItems: FormFieldItem[] = newPostItems
