import { MdKeyboardArrowRight, MdKeyboardArrowLeft, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { LuLoaderPinwheel, LuTriangleAlert } from "react-icons/lu";

import { useEffect, useMemo, useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table"

import LoadingPage from 'pages/LoadingPage/LoadingPage';

import useBackend from 'hooks/BackendProvider';

import columns from '@pages/MedicationPage/columns';

import { Button } from '@components/ui/button';
import type { TMedicationSchema } from "@models/schemas";
import { SearchField } from "@components/ui/search-field";
import { DropdownMenu } from "@components/ui/drop-down";
import { CreationRow } from "./creation-row";
import type Medication from "models/Medication";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const searchOptions = [
  'Id',
  'Name',
  'Category',
  'Brand Name',
  'Generic Name',
  'Strength',
  'Form'
]

const createFields = [
  'Name',
  'Category',
  'Brand Name',
  'Generic Name',
  'Strength',
  'Form'
]

const MedicationPage = () => {
  // Backend Access
  const { getPaginatedMedications, getFilteredPaginatedMedications, deleteMedicationRow } = useBackend();
  

  // Table State
  const [tableData, setTableData] = useState<TMedicationSchema[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  })
  const [deletedRows, setDeletedRows] = useState<RowSelectionState>({});
  const columnMemo = useMemo(() => columns, [])

  // Row Manipulation Creation State
  const [isCreationViewOpen, setIsCreationViewOpen] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setIsCreationViewOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Row Search State
  const [searchColumn, setSearchColumn] = useState<string>('Name');
  const [searchValue, setSearchValue] = useState<string>('');

  // Table Pagination State
  const [canGetNextPage, setCanGetNextPage] = useState<boolean>(true);
  
  // Table Init Rows Query
  const { data, isLoading } = useQuery({
    queryKey: ['medications', 'tableData'],
    queryFn: async () => getPaginatedMedications(pagination.pageIndex, pagination.pageSize)
  })
  useEffect(() => {
    if(data) setTableData(data);
  }, [data])
  if(isLoading && !tableData) return <LoadingPage />;

  // Table Search Query
  const { refetch } = useQuery({
    queryKey: ['medications', 'tableData', 'filtered', searchValue, pagination.pageIndex, pagination.pageSize],
    queryFn: async () => {
      if(!searchValue) return getPaginatedMedications(pagination.pageIndex, pagination.pageSize);
      return getFilteredPaginatedMedications(pagination.pageIndex, pagination.pageSize, {
        column: searchColumn.toLowerCase(),
        value: searchValue
      })
    },
    enabled: false
  })

  // Table Pagination Query
  const { refetch: fetchNextPage, isLoading: isNextPageLoading} = useQuery({
    queryKey: ['medications', 'tableData', 'next'],
    queryFn: async () => getPaginatedMedications(pagination.pageIndex + 1, pagination.pageSize),
    enabled: false
  });
  const { refetch: fetchPreviousPage, isLoading: isPreviousPageLoading } = useQuery({
    queryKey: ['medications', 'tableData', 'previous'],
    queryFn: async () => getPaginatedMedications(pagination.pageIndex - 1, pagination.pageSize),
    enabled: false
  });

  // Table Deletion Query
  const { refetch: deleteRow, isLoading: isDeletionLoading } = useQuery({
    queryKey: ['medications', 'tableData', 'delete'],
    queryFn: async () => {
      const deleteRowId = table.getRowModel().rows[Number.parseInt(Object.keys(rowSelection)[0])].original.medication_id;

      return deleteMedicationRow(deleteRowId)
    },
    enabled: false
  })
  
  // Table Initialization
  const table = useReactTable<TMedicationSchema>({
    data: tableData ?? [],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columns: columnMemo,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
    manualPagination: true,
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
      sorting,
      rowSelection,
    },
  })

  const handleRowSelection = (rowId: string) => {
    if (rowSelection[rowId]) {
      setRowSelection({})
    } else {
      setRowSelection({ [rowId]: true })
    }
  }

  const handleSearch = async () => {
    const res = await refetch()
    if(res.data) {
      setTableData(res.data)
      setPagination(old => ({ ...old, pageIndex: 0 }));
      setCanGetNextPage(true);
      setDeletedRows({})
    };
  };

  const insertRow = (med: Omit<Medication, 'medication_id'>) => {
    
  }

  const updateRow = ( ) => {

  }

  const styleTableRow = (rowId: string) => {
    let style = 'hover: cursor-pointer '
    if(rowSelection[rowId] && !deletedRows[rowId]) {
      style += 'bg-yellow-200 text-yellow-900 trannsition duration-300 ease-in-out'
    }
    if(deletedRows[rowId]) {
      style += 'bg-red-200 text-red-900 trannsition duration-500 ease-in-out'
    }
    return style
  }

  console.log(sorting)

  const rowManipulation = {
    handleDeleteRow: async () => {
      if(isDeletionLoading) {
        return;
      }
      const res = await deleteRow();
      if(res.data) {
        setDeletedRows(old => ({ ...old, [Object.keys(rowSelection)[0]]: true }))
      }
      console.log(deletedRows)
    },

    handleCreateRow: () => {
      setIsCreationViewOpen(prev => !prev)
    }
  }

  const drawSortIcons = (headerId: string) => {
    if(sorting[0] === undefined) return;
    const sortId = sorting[0].id;
    const sortDesc = sorting[0].desc;
    
    if(sortId === headerId) {
      if(sortDesc) {
        return <TiArrowSortedUp />
      } else {
        return <TiArrowSortedDown />
      }
    } else {
      return;
    }
  }
  
  const pageManipulation = {
    handleNextPageClick: async () => {
      console.log(isNextPageLoading || !canGetNextPage)
      if(isNextPageLoading) {
        return;
      };
      setPagination(old => ({ ...old, pageIndex: old.pageIndex + 1 }));
      const res = await fetchNextPage();
      if(res.data && res.data.length) {
        setTableData(res.data)
        return;
      };
      setCanGetNextPage(false);
    },
  
    handlePreviousPageClick: async () => {
      if(isPreviousPageLoading) {
        return;
      }
      setCanGetNextPage(true);
      setPagination(old => ({ ...old, pageIndex: old.pageIndex - 1 }));
      const res = await fetchPreviousPage()
      if(res.data) setTableData(res.data);
    },

    handleFirstPageClick: () => {
      table.firstPage()
    },
  
    handleLastPageClick: () => {
      table.lastPage()
    }
  }

  return (
    <div className='relative flex flex-col p-2 pt-0 w-full'>
      
      {/* Top Tool Bar */}
      <div className='flex flex-row w-full py-2 px-4 max-h-11.5 justify-between'>
        <div className='flex flex-row gap-1'>
          <Button variant='skeleton' disabled={false} shape='round' Icon={HiOutlinePencilAlt} displayText="Update" onClick={() => null} />
          <Button variant='skeleton' disabled={false} shape='round' Icon={HiOutlineTrash} displayText='Disable' onClick={rowManipulation.handleDeleteRow} />
          <Button variant={isCreationViewOpen ? 'green' : 'skeleton'} disabled={isCreationViewOpen} shape='round' Icon={AiOutlinePlusCircle} displayText='Create' onClick={rowManipulation.handleCreateRow} />
        </div>

        <div className="flex flex-row gap-1">
          <DropdownMenu currentValue={searchColumn} setCurrentValue={setSearchColumn} options={searchOptions}/>
          <SearchField searchValue={searchValue} setSearchValue={setSearchValue} searchFn={handleSearch} variant="skeleton"/>
        </div>

        <div className='flex flex-row gap-1'>
          <Button variant={isPreviousPageLoading || pagination.pageIndex === 0 ? 'disabled' : 'skeleton'} disabled={isPreviousPageLoading || pagination.pageIndex === 0} shape='round' Icon={MdKeyboardDoubleArrowLeft} displayText='First' onClick={pageManipulation.handleFirstPageClick} />
          <Button className={isNextPageLoading ? 'pointer-events-none animate-spin' : ''} variant={isPreviousPageLoading || pagination.pageIndex === 0 ? 'disabled' : 'skeleton'} disabled={isPreviousPageLoading || pagination.pageIndex === 0} shape='round' Icon={isPreviousPageLoading ? LuLoaderPinwheel : MdKeyboardArrowLeft} displayText='Previous' onClick={pageManipulation.handlePreviousPageClick} />
          <Button className={isNextPageLoading ? 'pointer-events-none animate-spin' : ''} variant={isNextPageLoading || !canGetNextPage ? 'disabled' : 'skeleton'} disabled={(isNextPageLoading || !canGetNextPage)} shape='round' Icon={isNextPageLoading ? LuLoaderPinwheel : MdKeyboardArrowRight} displayText='Next' onClick={pageManipulation.handleNextPageClick} />
          <Button variant={!canGetNextPage ? 'disabled' : 'skeleton'} disabled={!canGetNextPage} shape='round' Icon={MdKeyboardDoubleArrowRight} displayText='Last' onClick={() => null} />
        </div>
      </div>

      {/* Table Wrapper */}
      <div className='flex flex-col justify-center rounded-md overflow-hidden border border-black'>
        
        {/* Creation View */}
        { isCreationViewOpen ? 
          <div className="relative">
            <CreationRow onApproval={()=> null} ref={boxRef} fields={createFields}/>
          </div>
        : null }
        
        {/* Medication Table */}
        <table>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => (
                  <th className={`${sorting[0]?.id === h.id ? 'bg-black text-white' : 'text-black bg-white hover:bg-gray-300'}   hover:cursor-pointer font-medium  border-b border-black  transition ease-in-out p-1 ps-4 pe-4`} key={h.id} colSpan={h.colSpan} onClick={h.column.getToggleSortingHandler()}>
                    {h.isPlaceholder ? null : 
                      <div className="flex flex-row justify-between items-center">
                        <div>
                          {flexRender(
                            h.column.columnDef.header,
                            h.getContext()
                          )}
                        </div>
                        <div>{ drawSortIcons(h?.id) }</div>
                      </div>
                    }
                  </th>
                ))}
              </tr>
            ))}
          </thead>
            { tableData.length ? (
              <tbody className={(isCreationViewOpen ? 'blur-xs pointer-events-none ' : undefined) + ' transition-all duration-300 ease-in-out'}>
                {
                  table.getRowModel().rows.map((row) => (
                    <tr className={styleTableRow(row.id)} key={row.id} onClick={() => { handleRowSelection(row.id) }}>
                      {row.getVisibleCells().map((cell) => (
                        <td className='overflow-hidden px-2' key={cell.id}>
                          { flexRender(cell.column.columnDef.cell, cell.getContext()) }
                        </td>
                      ))}
                    </tr>
                  ))
                }
              </tbody>
            ) : null}
        </table>

        {/* No Data View */}
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
