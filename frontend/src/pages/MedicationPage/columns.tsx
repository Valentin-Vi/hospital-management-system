import { Button } from "@/components/ui/shadcn-io/button"
import { Checkbox } from "@/components/ui/shadcn-io/checkbox"
import type { TMedicationWithInventorySchema } from "@/models/medication/schema"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/shadcn-io/dropdown-menu"
import type { Column, ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

type SortableHeaderProps = React.PropsWithChildren<{
  column: Column<TMedicationWithInventorySchema>;
  className?: string;
}>;

const SortableHeader = ({
  column,
  children,
  className = ''
}: SortableHeaderProps) => (
  <Button
    className={className}
    variant={column.getIsSorted() ? "default" : "ghost"}
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    { children }
    <ArrowUpDown />
  </Button>
)

export default [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
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
    accessorKey: "medicationId",
    filterFn: 'includesString',
    header: ({ column }) => (<SortableHeader column={column}>ID</SortableHeader>),
    cell: ({ row }) => (
      <div className="font-bold">{row.getValue("medicationId")}</div>
    )
  },
  {
    accessorKey: "name",
    header: ({ column }) => (<SortableHeader column={column}>Name</SortableHeader>),
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "category",
    header: () => <div className="text-right">Category</div>,
    cell: ({ row }) => {
      return <div className="text-right font-medium">{row.getValue("category")}</div>
    },
  },
  {
    accessorKey: "expirationDate",
    header: () => <div className="text-right">Expiration Date</div>,
    cell: ({ row }) => {
      return <div className="text-right">{row.getValue("expirationDate")}</div>
    },
  },
  {
    accessorKey: "brandName",
    header: ({ column }) => (<SortableHeader column={column}>Brand name</SortableHeader>),
    cell: ({ row }) => <div className="lowercase">{row.getValue("brandName")}</div>,
  },
  {
    accessorKey: "genericName",
    header: ({ column }) => (<SortableHeader column={column}>Generic name</SortableHeader>),
  },
  {
    accessorKey: 'strength',
    header: () => <div className="text-right">Strength</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue('strength')}</div>,
  },
  {
    accessorKey: 'form',
    header: () => <div className="text-right">Form</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue('form')}</div>,
  },
  {
    id: 'quantity',
    accessorFn: (row) => row.inventory?.quantity ?? 0,
    header: ({ column }) => (<SortableHeader column={column}>Quantity</SortableHeader>),
    cell: ({ row }) => <div className="text-right">{ row.getValue('quantity') }</div>,
  }, {
    id: 'minimumQuantity',
    accessorFn: (row) => row.inventory?.minimumQuantity ?? 0,
    header: ({ column }) => (<SortableHeader column={column}>Minimum quantity</SortableHeader>),
    cell: ({ row }) => <div className="text-right">{ row.getValue('minimumQuantity') }</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(`${row.original.medicationId}`)}
          >
            Copy medication ID
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem>View customer</DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
] as ColumnDef<TMedicationWithInventorySchema>[]
