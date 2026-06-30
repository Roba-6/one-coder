import {
  type CommonResponse,
  type DataColumn,
  DataList,
  getApi,
  getLocalMessage,
} from 'one-public-ui'
import React, { useEffect } from 'react'

import { CONSTANT } from '@/common/constants'
import type { Category } from '@/features/admin/categories/types/category'

const CategoryListPage = (): React.ReactNode => {
  const [data, setData] = React.useState<Category[]>([])

  const listColumns: DataColumn[] = [
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
  ]

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getApi<CommonResponse>(CONSTANT.API_URL.POST_ADMIN, {}).then(
      (res: CommonResponse) => {
        setData(res.results as Category[])
      }
    )
  }

  return (
    <div className="w-full">
      {/*<DataToolBar table={table} />*/}
      <DataList<Category> data={data} columns={listColumns} selectable />
      {/*<DataPagination table={table} />*/}
    </div>
  )
}

export default CategoryListPage
