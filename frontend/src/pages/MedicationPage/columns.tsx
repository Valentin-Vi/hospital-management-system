import type { TUserSchema } from "@models/schemas"
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<TUserSchema>()

export default [
  columnHelper.accessor('userId', {
    header: 'Id',
    cell: info => <div className="text-center">{ info.getValue() }</div>,
  }),
  columnHelper.accessor('type', {
    header: 'Type',
    cell: info => <div className="text-center">{ info.getValue() }</div>,
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('firstname', {
    header: 'Firstname',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('lastname', {
    header: 'Lastname',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('enabled', {
    header: 'Enabled',
    cell: info => JSON.stringify(info.getValue())
  }),
]

