import { z } from 'zod';

export const InventorySchema = z.object({
  inventoryId: z.number().int().nonnegative(),
  medicationId: z.number().int().nonnegative(),
  quantity: z.number().int().min(0),
  minimum_quantity: z.number().int().min(0),
});

export type TInventorySchema = z.infer<typeof InventorySchema>;

// Schema for the inventory object as used in InventoryDal
export const MedicationInventoryItemSchema = z.object({
  itemId: z.number().int().nonnegative(),
  productId: z.number().int().nonnegative(),
  quantity: z.number().int().min(0),
  minimunQuantity: z.number().int().min(0),
});

export type TMedicationInventoryItem = z.infer<typeof MedicationInventoryItemSchema>;

