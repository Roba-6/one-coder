import { zodResolver } from '@hookform/resolvers/zod'
import { CommonResponse, getApi, postApi, putApi } from 'one-public-ui'
import { arrayToObject, getLocalMessage, setUrlParams } from 'one-public-ui/lib/utils'
import i18n from 'one-public-ui/locales/configs'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { z } from 'zod'

import { Button } from '@/common/components/ui/button.tsx'
import { Card, CardContent } from '@/common/components/ui/card.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/common/components/ui/form.tsx'
import { Input } from '@/common/components/ui/input.tsx'
import { Skeleton } from '@/common/components/ui/skeleton.tsx'
import { CONSTANT } from '@/common/constants.ts'
import type { Category, CategoryRequest } from '@/features/categories/types/category'

type TestType = 'name' | 'alias'

i18n.addResourceBundle('en', 'translation', {
  labels: { category: { name: 'Category Name', alias: 'Category Alias' } },
})

i18n.addResourceBundle('ja', 'translation', {
  labels: { category: { name: 'カテゴリー名', alias: '別名' } },
})

const testData = [
  {
    name: 'name',
    label: getLocalMessage('labels.category.name'),
    type: 'text',
    placeholder: 'Programming',
    defaultValue: '',
    validate: z
      .string()
      .min(1, { message: getLocalMessage('Category Name is' + ' required') }),
  },
  {
    name: 'alias',
    label: getLocalMessage('labels.category.alias'),
    type: 'text',
    placeholder: 'Programming',
    defaultValue: '',
    validate: z.string().min(1, { message: getLocalMessage('Alias is required') }),
  },
]

const CategoryFormSchema = z.object({
  name: z.string().min(1, { message: getLocalMessage('Category Name is required') }),
  alias: z.string().min(1, { message: getLocalMessage('Alias is required') }),
})

const CategoryEditPage = (): React.ReactNode => {
  const nav = useNavigate()
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: arrayToObject(testData, 'name', 'defaultValue'),
  })
  const { search } = useLocation()
  const id = new URLSearchParams(search).get('id')
  const [loadingData, setLoadingData] = React.useState<boolean>(true)

  useEffect(() => {
    console.debug('form: ', form)
    if (id) {
      console.debug('edit mode')
      getApi<CommonResponse>(setUrlParams(CONSTANT.API_URL.CATEGORY_ADMIN_ID, id)).then(
        (res: CommonResponse) => {
          form.reset(res.results! as Category)
          setLoadingData(false)
        }
      )
    } else {
      console.debug('add mode')
    }
  }, [form, id])

  const submitForm = (values: Category) => {
    console.log(values)
    if (id) {
      putApi<CommonResponse>(
        setUrlParams(CONSTANT.API_URL.CATEGORY_ADMIN_ID, id),
        values
      ).then((res: CommonResponse) => {
        console.log(res.results! as Category)
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
      postApi<CommonResponse>(
        CONSTANT.API_URL.CATEGORY_ADMIN,
        values as CategoryRequest
      ).then((res: CommonResponse) => {
        console.log(res.results! as Category)
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
        nav(CONSTANT.ROUTE_URL.ADMIN + CONSTANT.ROUTE_URL.ADMIN_CATEGORY)
      })
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
                              <Input
                                type={item.type as string}
                                placeholder={item?.placeholder as string}
                                {...field}
                                value={field.value as string}
                              />
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
export default CategoryEditPage
