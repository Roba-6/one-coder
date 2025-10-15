import { zodResolver } from '@hookform/resolvers/zod'
import {
  arrayToObject,
  CommonResponse,
  getApi,
  getLocalMessage,
  i18n,
  postApi,
  putApi,
  setUrlParams,
} from 'one-public-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '@/common/components/ui/button'
import { Card, CardContent } from '@/common/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form'
import { Input } from '@/common/components/ui/input'
import { Skeleton } from '@/common/components/ui/skeleton'
import { Textarea } from '@/common/components/ui/textarea'
import { CONSTANT } from '@/common/constants'
import type { Post, PostRequest } from '@/features/admin/posts/types/post'

type TestType = 'title' | 'overview' | 'content'

i18n.addResourceBundle('en', 'translation', {
  labels: { category: { name: 'Category Name', alias: 'Category Alias' } },
})

i18n.addResourceBundle('ja', 'translation', {
  labels: { category: { name: 'カテゴリー名', alias: '別名' } },
})

const testData = [
  {
    name: 'title',
    label: getLocalMessage('labels.category.title'),
    type: 'text',
    placeholder: 'Programming',
    defaultValue: '',
    validate: z
      .string()
      .min(1, { message: getLocalMessage('Category Name is' + ' required') }),
  },
  {
    name: 'overview',
    label: getLocalMessage('labels.category.overview'),
    type: 'text',
    placeholder: 'Programming',
    defaultValue: '',
    validate: z.string().min(1, { message: getLocalMessage('Alias is required') }),
  },
  {
    name: 'content',
    label: getLocalMessage('labels.category.content'),
    type: 'textarea',
    placeholder: 'Programming',
    defaultValue: '',
    validate: z.string().min(1, { message: getLocalMessage('Alias is required') }),
  },
]

const PostFormSchema = z.object({
  title: z.string().min(1, { message: getLocalMessage('Title is required') }),
  overview: z.string().min(1, { message: getLocalMessage('Overview is required') }),
  content: z.string().min(1, { message: getLocalMessage('Content is required') }),
})

const PostEditPage = (): React.ReactNode => {
  const nav = useNavigate()
  const form = useForm<z.infer<typeof PostFormSchema>>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: arrayToObject(testData, 'name', 'defaultValue'),
  })
  const { search } = useLocation()
  const id = new URLSearchParams(search).get('id')
  const [loadingData, setLoadingData] = React.useState<boolean>(true)

  useEffect(() => {
    console.debug('form: ', form)
    if (id) {
      console.debug('edit mode')
      getApi<CommonResponse>(setUrlParams(CONSTANT.API_URL.POST_ADMIN_ID, id)).then(
        (res: CommonResponse) => {
          form.reset(res.results! as Post)
          setLoadingData(false)
        }
      )
    } else {
      console.debug('add mode')
    }
  }, [form, id])

  const submitForm = (values: Post) => {
    console.log(values)
    if (id) {
      putApi<CommonResponse>(
        setUrlParams(CONSTANT.API_URL.POST_ADMIN_ID, id),
        values
      ).then((res: CommonResponse) => {
        console.log(res.results! as Post)
        // dispatch(
        //   enqueueMessage({
        //     message: {
        //       code: 'S2000002',
        //       message: 'Updated Successfully',
        //       detail: null,
        //     },
        //     status: 200,
        //     type: 'success',
        //   })
        // )
      })
    } else {
      postApi<CommonResponse>(CONSTANT.API_URL.POST_ADMIN, values as PostRequest).then(
        (res: CommonResponse) => {
          console.log(res.results! as Post)
          // dispatch(
          //   enqueueMessage({
          //     message: {
          //       code: 'S2000001',
          //       message: 'Added Successfully',
          //       detail: null,
          //     },
          //     status: 200,
          //     type: 'success',
          //   })
          // )
          nav(CONSTANT.ROUTE_URL.ADMIN + CONSTANT.ROUTE_URL.POST)
        }
      )
    }
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitForm)}>
            <div className="flex flex-col gap-6">
              {loadingData && id
                ? Array(3)
                    .fill(null)
                    .map((_, idx: number) => (
                      <div key={idx} className="grid grid-cols-6 gap-3">
                        <Skeleton className="my-2 h-4 w-auto" />
                        <Skeleton className="my-2 h-4 w-auto col-span-3" />
                      </div>
                    ))
                : testData.map((item, idx: number) => (
                    <FormField
                      key={idx}
                      control={form.control}
                      name={item.name as TestType}
                      render={({ field }) => (
                        <FormItem>
                          <div className="grid grid-cols-6 gap-3">
                            <FormLabel>{item.label as string}</FormLabel>
                            <FormControl className="col-span-3">
                              {item.type === 'textarea' ? (
                                <Textarea {...field} value={field.value as string} />
                              ) : (
                                <Input
                                  type={item.type as string}
                                  placeholder={item?.placeholder as string}
                                  {...field}
                                  value={field.value as string}
                                />
                              )}
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
              <div className="grid grid-cols-6 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="col-start-3"
                  onClick={() => {
                    nav(-1)
                  }}
                >
                  {getLocalMessage('buttons.cancel')}
                </Button>
                <Button type="submit">{getLocalMessage('buttons.create')}</Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
export default PostEditPage
