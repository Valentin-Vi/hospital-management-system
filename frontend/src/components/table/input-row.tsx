import { Calendar22 } from "@/components/ui/shadcn-io/date-picker"
import { Input } from "@/components/ui/shadcn-io/input"
import { TableCell, TableRow } from "@/components/ui/shadcn-io/table"
import { cn } from "@/utils/cn"
import type { TMedicationWithInventorySchema } from "@/models/medication/schema"
import type React from "react"

export type InputRowProps = {
  inputData: TMedicationWithInventorySchema
  setInputData: React.Dispatch<React.SetStateAction<TMedicationWithInventorySchema>>
  className?: string
}

export const InputRow = ({
  className = '',
  inputData,
  setInputData
}: InputRowProps) => {

  const setDate = (date: Date) => {
    setInputData(prev => ({ ...prev, expirationDate: date }))
  }

  return (
    <TableRow className={cn('', className)}>
      <TableCell />
      <TableCell>
      </TableCell>
      <TableCell>
        <Input value={inputData.name} onChange={(e) => setInputData(prev => ({ ...prev, name: e.target.value }))} placeholder="Name..." type="text"/>
      </TableCell>
      <TableCell>
        <Input value={inputData.category} onChange={(e) => setInputData(prev => ({ ...prev, category: e.target.value  }))} placeholder="Category..." type="text"/>
      </TableCell>
      <TableCell>
        <Calendar22 date={inputData.expirationDate} setDate={(date) => setDate(date)} disablePastDates/>
      </TableCell>
      <TableCell>
        <Input value={inputData.brandName} onChange={(e) => setInputData(prev => ({ ...prev, brandName: e.target.value }))} placeholder="Brand Name..." type="text"/>
      </TableCell>
      <TableCell>
        <Input value={inputData.genericName} onChange={(e) => setInputData(prev => ({ ...prev, genericName: e.target.value  }))} placeholder="Generic Name..." type="text"/>
      </TableCell>
      <TableCell>
        <Input value={inputData.strength} onChange={(e) => setInputData(prev => ({ ...prev, strength: e.target.value  }))} placeholder="Strength..." type="text"/>
      </TableCell>
      <TableCell>
        <Input value={inputData.form} onChange={(e) => setInputData(prev => ({ ...prev, form: e.target.value  }))} placeholder="Form..." type="text"/>
      </TableCell>
      <TableCell>
        <Input value={inputData.inventory.quantity} onChange={(e) => setInputData(prev => ({ ...prev, inventory: { ...inputData.inventory, quantity: Number.parseInt(e.target.value) }}))} placeholder="Quantity..." type="number"/>
      </TableCell>
      <TableCell>
        <Input value={inputData.inventory.minimumQuantity} onChange={(e) => setInputData(prev => ({ ...prev, inventory: { ...inputData.inventory, minimumQuantity: Number.parseInt(e.target.value) }}))} placeholder="Minimum Quantity..." type="number"/>
      </TableCell>
    </TableRow>
  )
}
