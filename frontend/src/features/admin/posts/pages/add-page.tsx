import { type CommonResponse, type FormFieldItem, getLocalMessage } from 'one-public-ui'
import {
  EditForm,
  enqueueMessage,
  getAdminPath,
  postApi,
  useAppDispatch,
} from 'one-public-ui'
import React from 'react'
import { useNavigate } from 'react-router'
import { z } from 'zod/v4'

import { Card, CardContent } from '@/common/components/ui/card'
import { CONSTANT } from '@/common/constants'
import type { CreatePostRequest, Post } from '@/features/admin/posts/types/post'

// const UserFormSchema = z.object(arrayToObject(testData, 'name', 'validate'))

const AddPostPage = (): React.JSX.Element => {
  const nav = useNavigate()
  const dispatch = useAppDispatch()

  const newPostItems: FormFieldItem[] = [
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
