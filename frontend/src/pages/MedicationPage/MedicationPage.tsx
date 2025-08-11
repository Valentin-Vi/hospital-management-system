import { useQuery } from '@tanstack/react-query';
import LoadingPage from 'pages/LoadingPage/LoadingPage';
import useBackend from 'hooks/BackendProvider';
import MedicationsTable from './MedicationsTable';

function MedicationPage() {
  
  const { getPaginatedUsers } = useBackend();
  
  const { data = [], isLoading } = useQuery({
    queryKey: ['tableData'],
    queryFn: async () => {
      return await getPaginatedUsers(0, 10);
    }
  })
  
  if(isLoading) {
    return <LoadingPage />
  }

  return (
    <div>
      <MedicationsTable
        data={data}
      />
    </div>
  )
}

export default MedicationPage;
