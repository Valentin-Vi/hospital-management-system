import useBackend from "@/hooks/BackendProvider"
import MedicationsTable from "./MedicationTable"
import { useQuery } from "@tanstack/react-query"
import { type TMedicationSchema } from "@/models/schemas/Medication"
import { useEffect, useState } from "react"

export default () => {
  
  const [tableData, setTableData] = useState<TMedicationSchema[]>([])

  const { getEntireMedicationsInventory } = useBackend()

  const { data } = useQuery({
    queryKey: ['medications', 'get-all'],
    queryFn: async () => await getEntireMedicationsInventory(),
  })

  useEffect(() => {
    
    console.log(data)
    if(data) {
      setTableData(data ?? []);
    }
  }, [data])

  return (
    <div className="p-4">
      <MedicationsTable data={tableData} setData={setTableData} />
    </div>
  )
}
