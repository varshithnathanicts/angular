export interface DoctorAvailabilityResponse {
    doctorId: number;
    localDate: string;         // ISO date string, e.g. "2025-06-24"
    availableSlots: string[];  // e.g. ["09:00", "09:30", …]
  }
  