import { Medication } from "@/models/medication"

export type LowStockMedication = {
  medication: Medication
  totalStock: number
}
