import type { TUserSchema } from "@models/schemas"
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table"
import columns from '@pages/MedicationPage/columns';
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";


type TMedicationsTableParams = {
  data: TUserSchema[]
}

export default function MedicationsTable({ data }: TMedicationsTableParams) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable<TUserSchema>({
    data,
    columns,
    
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableRowSelection: true,

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    
    state: {
      pagination,
      sorting
    }
  })

  function handleRowSelection(rowId: string) {
    if (rowSelection[rowId]) {
      setRowSelection({})
    } else {
      setRowSelection({ [rowId]: true })
    }
  }

  return (
    <div>
      <div
      className='
        flex flex-row
      '>
        <div
        className='
          flex flex-row
        '>

          <button className='
            rounded
            flex flex-row
            text-xs
            h-5
            p-0.5 ps-1 pe-1
            bg-gray-100 text-gray-700
            hover:bg-yellow-100 hover:text-yellow-900
          '>
            <span className='
              flex items-center justify-center
              mr-0.5
            '>
              <HiOutlinePencilAlt />
            </span>
            <span className=''>Update</span>
          </button>

          <button className='
            flex flex-row
            rounded
            text-xs
            h-5
            bg-gray-100 text-gray-700
            ml-1 p-0.5 ps-1 pe-1
            hover:bg-red-100 hover:text-red-900
          '>
            <span className='
              flex items-center justify-center
              mr-0.5
            '>
              <HiOutlineTrash />
            </span>
            <span className=''>Delete</span>
          </button>

          <button className='
            flex flex-row
            rounded
            text-xs
            h-5
            ml-1 p-0.5 ps-1 pe-1
            bg-gray-100 text-gray-700
            hover:bg-green-100 hover:text-green-900
          '>
            <span className='
              flex items-center justify-center
              mr-0.5
            '>
              <AiOutlinePlusCircle />
            </span>
            <span className=''>Create</span>
          </button>
        </div>

        <div className='flex flex-row w-full justify-end '>
          <div>
            <button
              className="
                mr-1
                rounded-[50%]
                text-gray-400 bg-gray-100
                hover:text-blue-950 hover:bg-sky-100"
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
          </div>
          <div>
            <button
              className="
                mr-1
                rounded-[50%]
                text-gray-400 bg-gray-100
                hover:text-blue-950 hover:bg-sky-100"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <MdKeyboardArrowLeft />
            </button>
          </div>

          <div>
            <button
              className="
                mr-1
                rounded-[50%]
                text-gray-400 bg-gray-100
                hover:text-blue-950 hover:bg-sky-100"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
          <div>
            <button
              className="
                mr-1
                rounded-[50%]
                text-gray-400 bg-gray-100
                hover:text-blue-950 hover:bg-sky-100"
              onClick={() => table.lastPage()}
              disabled={pagination.pageIndex === (table.getPageCount() - 1)}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
        </div>
      </div>
      <table
        className="w-full border-black text-xs"
      >
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr
              key={hg.id}
              className="border-b-1 border-black"
            >
              {hg.headers.map((h) => (
                <th
                  key={h.id}
                  colSpan={h.colSpan}
                  onClick={h.column.getToggleSortingHandler()}
                  className="border-[0.5px] border-black"
                >
                  {h.isPlaceholder ?
                    null : 
                    flexRender(
                      h.column.columnDef.header,
                      h.getContext()
                    )
                  }
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              className={`select-none ${rowSelection[row.id] ? 'ring-1 ring-orange-200 bg-orange-100 hover:bg-orange-100' : ''}`}
              key={row.id}
              onClick={() => { handleRowSelection(row.id) }}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="
                    pl-1 pr-1
                    text-left
                    border-[0.5px] border-black
                    text-xs
                  "
                >
                  { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
