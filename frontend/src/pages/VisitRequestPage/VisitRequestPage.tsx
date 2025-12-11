import { useEffect, useState } from "react";
import VisitService, { type TTimeSlot, type TDoctor } from "@/services/VisitService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn-io/card";
import { Button } from "@/components/ui/shadcn-io/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/shadcn-io/dropdown-menu";
import { Calendar } from "@/components/ui/shadcn-io/calendar";
import { CalendarIcon, Clock, User, CheckCircle2, AlertCircle } from "lucide-react";
import { format, addDays, isSameDay, parseISO } from "date-fns";

export const VisitRequestPage = () => {
  const [doctors, setDoctors] = useState<TDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [availableSlots, setAvailableSlots] = useState<TTimeSlot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<TTimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TTimeSlot | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const docs = await VisitService.getDoctors();
      setDoctors(docs);
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate) return;
      
      setLoading(true);
      const startDate = new Date(selectedDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = addDays(startDate, 7); // Get slots for the week

      const slots = await VisitService.getAvailableSlots(
        startDate,
        endDate,
        selectedDoctor
      );
      setAvailableSlots(slots);
      setLoading(false);
    };

    fetchSlots();
  }, [selectedDate, selectedDoctor]);

  useEffect(() => {
    if (selectedDate && availableSlots.length > 0) {
      const filtered = availableSlots.filter(slot => {
        const slotDate = parseISO(slot.date);
        return isSameDay(slotDate, selectedDate);
      });
      setFilteredSlots(filtered);
      setSelectedSlot(null);
    } else {
      setFilteredSlots([]);
    }
  }, [selectedDate, availableSlots]);

  const handleRequestVisit = async () => {
    if (!selectedSlot) return;

    setLoading(true);
    setMessage(null);

    const result = await VisitService.requestVisit(
      selectedSlot.doctorId,
      parseISO(selectedSlot.date)
    );

    setLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: result.message || 'Visit requested successfully!' });
      // Refresh slots
      const startDate = new Date(selectedDate!);
      startDate.setHours(0, 0, 0, 0);
      const endDate = addDays(startDate, 7);
      const slots = await VisitService.getAvailableSlots(
        startDate,
        endDate,
        selectedDoctor
      );
      setAvailableSlots(slots);
      setSelectedSlot(null);
    } else {
      setMessage({ type: 'error', text: result.message || 'Failed to request visit' });
    }
  };

  const getTimeSlotsByDoctor = (date: Date) => {
    return availableSlots
      .filter(slot => isSameDay(parseISO(slot.date), date))
      .reduce((acc, slot) => {
        if (!acc[slot.doctorId]) {
          acc[slot.doctorId] = {
            doctor: doctors.find(d => d.doctorId === slot.doctorId) || {
              doctorId: slot.doctorId,
              name: slot.doctorName,
              specialty: slot.specialty,
              email: ''
            },
            slots: []
          };
        }
        acc[slot.doctorId].slots.push(slot);
        return acc;
      }, {} as Record<number, { doctor: TDoctor; slots: TTimeSlot[] }>);
  };

  const getDatesWithSlots = () => {
    const dates = new Set<string>();
    availableSlots.forEach(slot => {
      const date = parseISO(slot.date);
      dates.add(format(date, 'yyyy-MM-dd'));
    });
    return Array.from(dates).map(d => parseISO(d));
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Request a Visit</h1>
        <CalendarIcon className="h-8 w-8 text-muted-foreground" />
      </div>

      {message && (
        <Card className={message.type === 'success' ? 'border-green-500' : 'border-red-500'}>
          <CardContent className="pt-6">
            <div className={`flex items-center gap-2 ${message.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {message.type === 'success' ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <p>{message.text}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Doctor Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Select Doctor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {selectedDoctor 
                    ? doctors.find(d => d.doctorId === selectedDoctor)?.name + ' - ' + doctors.find(d => d.doctorId === selectedDoctor)?.specialty
                    : 'All Doctors'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select Doctor</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setSelectedDoctor(undefined)}>
                  All Doctors
                </DropdownMenuItem>
                {doctors.map((doctor) => (
                  <DropdownMenuItem 
                    key={doctor.doctorId} 
                    onClick={() => setSelectedDoctor(doctor.doctorId)}
                  >
                    {doctor.name} - {doctor.specialty}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date > addDays(new Date(), 30)}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Available Time Slots for {selectedDate && format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading available slots...</div>
            ) : filteredSlots.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No available slots for this date. Please select another date.
              </div>
            ) : (
              <div className="space-y-4">
                {Object.values(getTimeSlotsByDoctor(selectedDate)).map(({ doctor, slots }) => (
                  <div key={doctor.doctorId} className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      {doctor.name} - {doctor.specialty}
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {slots.map((slot) => {
                        const slotDate = parseISO(slot.date);
                        const isSelected = selectedSlot?.date === slot.date;
                        return (
                          <Button
                            key={slot.date}
                            variant={isSelected ? "default" : "outline"}
                            onClick={() => setSelectedSlot(slot)}
                            className="h-12"
                          >
                            {format(slotDate, 'HH:mm')}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Request Button */}
      {selectedSlot && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <p className="font-semibold">{selectedSlot.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{selectedSlot.specialty}</p>
                  <p className="text-sm mt-2">
                    {format(parseISO(selectedSlot.date), 'EEEE, MMMM d, yyyy')} at{' '}
                    {format(parseISO(selectedSlot.date), 'HH:mm')}
                  </p>
                </div>
                <Button
                  onClick={handleRequestVisit}
                  disabled={loading}
                  size="lg"
                >
                  {loading ? 'Requesting...' : 'Request Visit'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Visits Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Select a doctor (optional) or view all available doctors</li>
            <li>Choose a date from the calendar</li>
            <li>Pick an available time slot</li>
            <li>Click "Request Visit" to book your appointment</li>
            <li>Visits are available Monday through Friday, 9:00 AM to 5:00 PM</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

