import React, { useEffect, useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { getEmployeeAppoinments } from "@/actions/employee/get-employee-appoinments";
import { postClientAppoinment } from "@/actions/appointments/post-client-appoinment";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify"; // Importamos toast
import { useRouter } from "next/navigation";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";

interface Props {
  employeeId: string;
  onAppointmentSubmit: () => void;
}

interface Appointments {
  id: string;
  appointmentDate: Date;
  finalDate: Date | null;
}

export const AppointmentForm = ({ employeeId, onAppointmentSubmit }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [description, setDescription] = useState(""); // Estado para la descripción
  const [appointments, setAppointments] = useState<Appointments[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      const res = await getEmployeeAppoinments(employeeId);
      if (res?.appointments) {
        setAppointments(res.appointments);
        console.log("Citas encontradas:", res.appointments);
      } else {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, [employeeId]);

  // Función para verificar si la hora está ocupada
  const shouldDisableTime = (time: Dayjs) => {
    const now = dayjs(); // Obtiene el tiempo actual

    // Deshabilita si la hora es antes que la hora actual
    if (time.isBefore(now)) {
      return true;
    }

    // Iterar sobre los rangos de citas existentes
    return appointments.some((appointment) => {
      const appointmentStart = dayjs(appointment.appointmentDate);
      const appointmentEnd = appointment.finalDate
        ? dayjs(appointment.finalDate)
        : appointmentStart.add(1, 'hour'); // Si no hay finalDate, se asume una duración de 1 hora

      // Deshabilita el tiempo si está dentro del rango de cualquier cita existente
      return time.isAfter(appointmentStart) && time.isBefore(appointmentEnd);
    });
  };

  const handleSubmit = async () => {
    if (selectedDate && userId && description) {
      const formattedDate = selectedDate.format("YYYY-MM-DD HH:mm:ss");

      // Usar toast.promise para manejar la notificación
      await toast.promise(
        postClientAppoinment({
          appointmentDate: new Date(formattedDate),
          status: "pending",
          userSchedulerId: userId,
          userScheduledId: employeeId,
          description: description,
        }),
        {
          pending: "Agendando cita...",
          success: "Cita agendada con éxito!",
          error: "Error al agendar la cita. Intenta nuevamente.",
        }
      ).then(() => {
        router.refresh();
        onAppointmentSubmit();
      }).catch((error) => {
        console.error(error);
      });
    } else {
      toast.error("Por favor, completa todos los campos.");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
        <MobileDateTimePicker
          label="Selecciona fecha y hora"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          minDate={dayjs()}
          shouldDisableTime={(time, view) => {
            if (view === "hours") {
              return shouldDisableTime(time);
            }
            return false; 
          }}
        />

        <TextField
          label="Descripción"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />

        <Button type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </Box>
    </LocalizationProvider>
  );
};
