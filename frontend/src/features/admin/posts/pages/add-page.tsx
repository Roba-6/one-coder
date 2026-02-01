import type { CommonResponse } from 'one-public-ui'
import {
  EditForm,
  enqueueMessage,
  getAdminPath,
  postApi,
  useAppDispatch,
} from 'one-public-ui'
import React from 'react'
import { useNavigate } from 'react-router'

import { Card, CardContent } from '@/common/components/ui/card'
import { CONSTANT } from '@/common/constants'
import { newPostItems } from '@/features/admin/posts/columns/form-items'
import type { CreatePostRequest, Post } from '@/features/admin/posts/types/post'

// const UserFormSchema = z.object(arrayToObject(testData, 'name', 'validate'))

const AddPostPage = (): React.JSX.Element => {
  const nav = useNavigate()
  const dispatch = useAppDispatch()

  const submitForm = (data: Post) => {
    console.debug('New Post:', data)
    postApi<CommonResponse>(
      CONSTANT.API_URL.POST_ADMIN,
      data as CreatePostRequest
    ).then((res: CommonResponse) => {
      console.debug('Add Post:', res.results! as Post)
      dispatch(
        enqueueMessage({
          message: {
            code: 'S2000002',
            message: 'Added Successfully',
            detail: null,
          },
          status: 200,
          type: 'success',
        })
      )
      nav(getAdminPath() + CONSTANT.ROUTE_URL.ADMIN_POST)
    })
  }

  return (
    <Card>
      <CardContent>
        <EditForm items={newPostItems} submitForm={submitForm} />
      </CardContent>
    </Card>
  )
}

export default AddPostPage
