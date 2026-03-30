import {
  Action,
  CommonResponse,
  copyToClipboard,
  DataColumn,
  DataList,
  deleteApi,
  enqueueMessage,
  getAdminPath,
  getApi,
  getLocalMessage,
  setUrlParams,
  useAppDispatch,
} from 'one-public-ui'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { CONSTANT } from '@/common/constants.ts'
import type { Post } from '@/features/admin/posts/types/post'

const PostListPage = (): React.ReactNode => {
  const dispatch = useAppDispatch()
  const nav = useNavigate()
  const [data, setData] = React.useState<Post[]>([])

  const columns: DataColumn[] = [
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

  const navToDetail = (id: string): void => {
    nav(setUrlParams(CONSTANT.ROUTE_URL.POST_ID, id))
  }

  const navToUpdate = (id: string): void => {
    nav(setUrlParams(getAdminPath() + CONSTANT.ROUTE_URL.ADMIN_POST_UPDATE, id))
  }

  const deleteData = (id: string): void => {
    deleteApi<CommonResponse>(setUrlParams(CONSTANT.API_URL.POST_ADMIN_ID, id))
      .then((res: CommonResponse) => {
        const post: Post = res.results as Post
        console.debug(res.results as Post)
        dispatch(
          enqueueMessage({
            message: {
              code: 'I00100003',
              message: getLocalMessage('messages.notices.I00100003', [
                post.title as string,
              ]),
              detail: null,
            },
            status: 200,
            type: 'success',
          })
        )
        getData()
      })
      .catch((err: CommonResponse) => {
        console.error(err)
      })
  }

  const actions: Action[] = [
    {
      name: getLocalMessage('buttons.copyId'),
      events: {
        handleClick: copyToClipboard,
      },
    },
    {
      type: 'separator',
    },
    {
      name: getLocalMessage('buttons.details'),
      events: {
        handleClick: navToDetail,
      },
    },
    {
      name: getLocalMessage('buttons.edit'),
      events: {
        handleClick: navToUpdate,
      },
    },
    {
      name: getLocalMessage('buttons.delete'),
      events: {
        handleClick: deleteData,
      },
    },
  ]

  useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    getApi<CommonResponse>(CONSTANT.API_URL.POST_ADMIN, {}).then(
      (res: CommonResponse) => {
        setData(res.results as Post[])
      }
    )
  }

  return (
    <div className="w-full">
      <DataList<Post> columns={columns} data={data} actions={actions} selectable />
    </div>
  )
}

export default PostListPage
