import { type CommonResponse, type FormFieldItem, getLocalMessage } from 'one-public-ui'
import {
  EditForm,
  enqueueMessage,
  getAdminPath,
  getApi,
  putApi,
  setUrlParams,
  useAppDispatch,
} from 'one-public-ui'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { z } from 'zod/v4'

import { Card, CardContent } from '@/common/components/ui/card'
import { CONSTANT } from '@/common/constants'
import type { Post, UpdatePostRequest } from '@/features/admin/posts/types/post'

const UpdatePostPage = (): React.JSX.Element => {
  const nav = useNavigate()
  const dispatch = useAppDispatch()
  const { id } = useParams()

  const [loadingData, setLoadingData] = React.useState<boolean>(true)
  const [data, setData] = React.useState<Post | null>(null)

  const postItems: FormFieldItem[] = [
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

  useEffect(() => {
    if (id) {
      getApi<CommonResponse>(setUrlParams(CONSTANT.API_URL.POST_ADMIN_ID, id)).then(
        (res: CommonResponse) => {
          setData(res.results! as Post)
          setLoadingData(false)
          console.log('Update Page:', res.results! as Post)
        }
      )
    }
  }, [id])

  const submitForm = (values: Post) => {
    console.debug('Update Post:', values)
    if (id) {
      putApi<CommonResponse>(
        setUrlParams(CONSTANT.API_URL.POST_ADMIN_ID, id),
        values as UpdatePostRequest
      ).then((res: CommonResponse) => {
        console.log(res.results! as Post)
        dispatch(
          enqueueMessage({
            message: {
              code: 'S2000002',
              message: 'Updated Successfully',
              detail: null,
            },
            status: 200,
            type: 'success',
          })
        )
        nav(getAdminPath() + CONSTANT.ROUTE_URL.ADMIN_POST)
      })
    }
  }

  return (
    <Card>
      <CardContent>
        <EditForm<Post>
          id={id as string}
          data={data!}
          loadingData={loadingData}
          items={postItems}
          submitForm={submitForm}
        />
      </CardContent>
    </Card>
  )
}

export default UpdatePostPage
