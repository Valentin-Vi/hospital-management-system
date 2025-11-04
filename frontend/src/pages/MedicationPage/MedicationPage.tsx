import { useQuery } from '@tanstack/react-query';
import LoadingPage from 'pages/LoadingPage/LoadingPage';
import useBackend from 'hooks/BackendProvider';
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table"
import columns from '@pages/MedicationPage/columns';
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useEffect, useMemo, useState } from 'react';
import type { TUserSchema } from '@models/schemas';
import { Button } from '@components/ui/button';
import { LuTriangleAlert } from "react-icons/lu";


function MedicationPage() {
  const [tableData, setTableData] = useState<TUserSchema[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const columnMemo = useMemo(() => { return columns }, [])
  
  const { getPaginatedUsers } = useBackend();
  
  const { data, isLoading } = useQuery({
    queryKey: ['medications', 'tableData'],
    queryFn: async () => getPaginatedUsers(0, 10)
  })
  
  useEffect(() => {
    if(data) setTableData(data)
  }, [data])

  if(isLoading && !tableData) return <LoadingPage />;
  
  const table = useReactTable<TUserSchema>({
    data: tableData ?? [],
    columns: columnMemo,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    enableRowSelection: true,

    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,

    meta: {
      updateData: (rowIndex: number, columnId: string, value: any) => {
        setTableData(old =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        )
      },
    },

    state: {
      pagination,
      sorting,
      rowSelection,
    },
  })

  function handleRowSelection(rowId: string) {
    if (rowSelection[rowId]) {
      setRowSelection({})
    } else {
      setRowSelection({ [rowId]: true })
    }
  }

  function onDisableRowPress() {
    const rowId = +Object.keys(rowSelection)[0]

    console.log(rowId)
    console.log(tableData[rowId]['enabled'])

    setTableData(prev => {
      prev[rowId]['enabled'] = !prev[rowId]['enabled'];
      return prev
    })
  }

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row justify-between'>
        <div className='flex flex-row p-1 gap-1'>
          <Button variant="ghost" shape='round' Icon={HiOutlinePencilAlt} displayText="Update" onClick={() => null} />
          <Button variant='ghost' shape='round' Icon={HiOutlineTrash} displayText='Disable' onClick={() => null} />
          <Button variant='ghost' shape='round' Icon={AiOutlinePlusCircle} displayText='Create' onClick={() => null} />
        </div>

        <div className='flex flex-row p-1 gap-1'>
          <Button variant='ghost' shape='round' Icon={MdKeyboardDoubleArrowLeft} displayText='First' onClick={() => null} />
          <Button variant='ghost' shape='round' Icon={MdKeyboardArrowLeft} displayText='Previous' onClick={() => null} />
          <Button variant='ghost' shape='round' Icon={MdKeyboardArrowRight} displayText='Next' onClick={() => null} />
          <Button variant='ghost' shape='round' Icon={MdKeyboardDoubleArrowRight} displayText='Last' onClick={() => null} />
        </div>
      </div>
      <div className='flex flex-col justify-center rounded-md overflow-hidden border border-black'>
        <table>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th className="bg-gray-200 font-medium text-black border-b border-black hover:bg-black hover:text-white transition ease-in-out p-1 ps-4 pe-4" key={h.id} colSpan={h.colSpan} onClick={h.column.getToggleSortingHandler()}>
                    {h.isPlaceholder ? null : 
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
            { tableData.length ? (
              <tbody>
                {
                  table.getRowModel().rows.map((row) => (
                    <tr className={`select-none ${rowSelection[row.id] ? 'ring-1 ring-orange-200 bg-orange-100 hover:bg-orange-100' : ''}`} key={row.id} onClick={() => { handleRowSelection(row.id) }}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="text-md">
                          { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                        </td>
                      ))}
                    </tr>
                  ))
                }
              </tbody>
            ) : null}
        </table>
        { tableData.length ? null : (
            <div className='flex flex-col w-full min-h-24 items-center text-black justify-center'>                  
              <LuTriangleAlert className='text-2xl'/>
              <p className='font-semibold'>No data</p>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default MedicationPage;
