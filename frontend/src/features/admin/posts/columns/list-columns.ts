import type { DataColumn } from 'one-public-ui'
import { getLocalMessage } from 'one-public-ui'

export const listColumns: DataColumn[] = [
  {
    key: 'title',
    name: getLocalMessage('labels.post.title'),
    isSortable: true,
    align: 'left',
  },
  {
    key: 'overview',
    name: getLocalMessage('labels.post.overview'),
    isSortable: true,
    type: 'paragraph',
    align: 'left',
  },
  {
    key: 'createdAt',
    name: getLocalMessage('labels.createdAt'),
    isSortable: true,
    type: 'datetime',
    align: 'left',
  },
  {
    key: 'updatedAt',
    name: getLocalMessage('labels.updatedAt'),
    isSortable: true,
    type: 'datetime',
    align: 'left',
  },
]
