import type { TMedicationSchema } from "@models/schemas"
import { createColumnHelper } from "@tanstack/react-table"
import { capitalize } from "utils"

const columnHelper = createColumnHelper<TMedicationSchema>()

export default [
  columnHelper.accessor('medication_id', {
    header: 'ID',
    cell: info => <div className="text-center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => capitalize(info.getValue().toString()),
  }),
  columnHelper.accessor('category', {
    header: 'Category',
    cell: info => capitalize(info.getValue().toString()),
  }),
  columnHelper.accessor('expiration_date', {
    header: 'Expiration Date',
    cell: info => {
      const date = info.getValue()
      return <div className="text-center">{ info.getValue().toString() }</div>
    },
  }),
  columnHelper.accessor('brandName', {
    header: 'Brand Name',
    cell: info => capitalize(info.getValue().toString()),
  }),
  columnHelper.accessor('genericName', {
    header: 'Generic Name',
    cell: info => capitalize(info.getValue().toString()),
  }),
  columnHelper.accessor('strength', {
    header: 'Strength',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('form', {
    header: 'Form',
    cell: info => capitalize(info.getValue().toString()),
  }),
]
