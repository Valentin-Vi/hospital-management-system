import { useState, type ChangeEvent } from "react"
import {
  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
  type ColumnFiltersState, type PaginationState, type SortingState, type VisibilityState,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/shadcn-io/button"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/shadcn-io/dropdown-menu"
import { Input } from "@/components/ui/shadcn-io/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/shadcn-io/table"
import { ChevronDown, CirclePlus, Trash2 } from "lucide-react"

import { type TMedicationWithBatchSchema } from "@/models/medication"

import columns from "./columns"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import useBackend from "@/components/hooks/BackendProvider.tsx"
import { InputRow } from "@/components/table/input-row.tsx"
import { ButterflyButton } from "@/components/ui/butterfly-button.tsx"

const tableProps = {
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
}

const initInputRowData: TMedicationWithBatchSchema = {
  medicationId: 0,
  name: '',
  category: '',
  expirationDate: '',
  brandName: '',
  genericName: '',
  strength: '',
  form: '',
  batches: [],
};

export default function MedicationsTable() {
  const [sorting, setSorting] = useState<SortingState>([{ id: 'medicationId', desc: false }]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 })
  const [rowSelection, setRowSelection] = useState({});
  
  const [showInputRow, setShowInputRow] = useState<boolean>(false);
  const [inputRowData, setInputRowData] = useState<TMedicationWithBatchSchema>(initInputRowData)

  const { deleteMedications, insertMedicationRow, getEntireMedicationsInventory } = useBackend()
  const queryClient = useQueryClient()

  const { data: medications = [] } = useQuery<TMedicationWithBatchSchema[]>({
    queryKey: ['medications', 'get-all'],
    queryFn: async () => await getEntireMedicationsInventory(),
  })

  const table = useReactTable({
    ...tableProps,
    data: medications,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: { sorting, columnFilters, columnVisibility, pagination, rowSelection },
  })

  const selectedIds = table.getSelectedRowModel().rows;

  const deleteMutation = useMutation({
    mutationFn: async (ids: number[]) => await deleteMedications(ids),
    onSuccess: (_, ids) => {
      queryClient.setQueryData<TMedicationWithBatchSchema[]>(['medications', 'get-all'], (prev = []) =>
        prev.filter((item) => !ids.includes(item.medicationId))
      )
      table.resetRowSelection();
    }
  })

  const insertMutation = useMutation({
    mutationFn: async (payload: TMedicationWithBatchSchema) => await insertMedicationRow(payload),
    onSuccess: (completed) => {
      if (completed) {
        queryClient.invalidateQueries({ queryKey: ['medications', 'get-all'] })
        setShowInputRow(false)
        setPagination(prev => ({ pageIndex: prev.pageIndex, pageSize: 10 }))
        setInputRowData(initInputRowData)
      }
    }
  })
  
  const handleDelete = () => {
    if(selectedIds.length === 0 || deleteMutation.isPending) return;
    deleteMutation.mutate(selectedIds.map(row => row.original.medicationId))
  }

  const handleOpenInputRow = () => {
    setShowInputRow(true);
    setPagination(prev => ({ pageIndex: prev.pageIndex, pageSize: 9 }))
  }

  const handleCloseInputRow = () => {
    setShowInputRow(false);
    setPagination(prev => ({ pageIndex: prev.pageIndex, pageSize: 10 }))
  }

  const handleInsertRow = () => {
    if(insertMutation.isPending) return;
    insertMutation.mutate(inputRowData)
  }


  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex flex-row gap-2">
          <Input
            placeholder="Filter IDs..."
            value={(table.getColumn("medicationId")?.getFilterValue() as string) ?? ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => table.getColumn("medicationId")?.setFilterValue(e.target.value)}
            className="max-w-sm"
          />
          <ButterflyButton callback={handleDelete} ActionIcon={Trash2} variant='destructive' />
          <ButterflyButton callback={handleInsertRow} callbackOnOpen={handleOpenInputRow} callBackOnClose={handleCloseInputRow} ActionIcon={CirclePlus} variant='success' />

        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {
              showInputRow &&
                <InputRow inputData={inputRowData} setInputData={setInputRowData} />
            }
            {
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            }
          </TableBody>
        </Table>
        
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
