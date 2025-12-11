export type TTimeSlot = {
  date: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
};

export type TDoctor = {
  doctorId: number;
  name: string;
  specialty: string;
  email: string;
};

export type TVisit = {
  visitId: number;
  visitDate: string;
  creationDate: string;
  doctor: {
    doctorId: number;
    name: string;
    specialty: string;
  };
};

class VisitService {
  private readonly baseUrl = 'http://localhost:3010/visit';

  async getAvailableSlots(startDate?: Date, endDate?: Date, doctorId?: number): Promise<TTimeSlot[]> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate.toISOString());
      if (endDate) params.append('endDate', endDate.toISOString());
      if (doctorId) params.append('doctorId', doctorId.toString());

      const response = await fetch(`${this.baseUrl}/available-slots?${params.toString()}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }

      const data = await response.json();
      return data.slots || [];
    } catch (error) {
      console.error('Error fetching available slots:', error);
      return [];
    }
  }

  async getDoctors(): Promise<TDoctor[]> {
    try {
      const response = await fetch(`${this.baseUrl}/doctors`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();
      return data.doctors || [];
    } catch (error) {
      console.error('Error fetching doctors:', error);
      return [];
    }
  }

  async requestVisit(doctorId: number, visitDate: Date): Promise<{ success: boolean; message?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/request`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          doctorId,
          visitDate: visitDate.toISOString()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, message: data.message || 'Failed to request visit' };
      }

      return { success: true, message: data.message || 'Visit requested successfully' };
    } catch (error) {
      console.error('Error requesting visit:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }

  async getMyVisits(): Promise<TVisit[]> {
    try {
      const response = await fetch(`${this.baseUrl}/my-visits`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch visits');
      }

      const data = await response.json();
      return data.visits || [];
    } catch (error) {
      console.error('Error fetching visits:', error);
      return [];
    }
  }
}

export default new VisitService();

