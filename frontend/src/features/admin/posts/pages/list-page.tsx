import { Checkbox } from '@radix-ui/react-checkbox'
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/table-core'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import {
  CommonResponse,
  DataList,
  DataPagination,
  deleteApi,
  getApi,
} from 'one-public-ui'
import { getLocalMessage, setUrlParams } from 'one-public-ui/lib/utils'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

import { Button } from '@/common/components/ui/button.tsx'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu.tsx'
import { CONSTANT } from '@/common/constants.ts'
import type { Post } from '@/features/admin/posts/types/post'

const PostListPage = (): React.ReactNode => {
  const nav = useNavigate()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [data, setData] = React.useState<Post[]>([])

  const columns: ColumnDef<Post>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() ? 'indeterminate' : false)
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <div className="capitalize">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'overview',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Overview
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue('overview')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const post = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(post.id!)}>
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  nav(
                    setUrlParams(
                      CONSTANT.ROUTE_URL.ADMIN + CONSTANT.ROUTE_URL.POST_EDIT,
                      undefined,
                      { id: post.id! }
                    )
                  )
                }}
              >
                {getLocalMessage('buttons.edit')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteData(post.id!)}>
                {getLocalMessage('buttons.delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

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

  const deleteData = (id: string) => {
    deleteApi<CommonResponse>(setUrlParams(CONSTANT.API_URL.POST_ADMIN_ID, id)).then(
      (res: CommonResponse) => {
        console.debug(res)
        getData()
      }
    )
  }

  return (
    <div className="w-full">
      {/*<DataToolBar table={table} />*/}
      <DataList table={table} columns={columns} />
      <DataPagination table={table} />
    </div>
  )
}

export default PostListPage
