"use client";

import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { AppointmentRange } from "@/interfaces";
import { TimeValidationError } from "@mui/x-date-pickers/models";

interface Props {
  date: Dayjs | null | undefined;
  disableDate?: Date;
  handleError?: (error: TimeValidationError) => void;
  handleChange: (newValue: Dayjs | null) => void;
  datesDisable: AppointmentRange[];
}

export default function CustomTimePicker({
  date,
  disableDate,
  handleError,
  handleChange,
  datesDisable,
}: Props) {
  const shouldDisableTime = (time: Dayjs) => {
    const now = dayjs(); // Obtiene el tiempo actual

    const disableBeforeDate = disableDate
      ? dayjs(disableDate).add(4, "minute")
      : now;

    // Deshabilita si `time` es menor que 4 minutos después de `disableDate`, si existe
    if (time.isBefore(disableBeforeDate)) return true;

    // Deshabilita si `time` es menor que el tiempo actual
    if (time.isBefore(now)) {
      return true;
    }

    // Verifica si el tiempo `time` está dentro de cualquier rango en `datesDisable`
    return datesDisable.some((dateRange) => {
      const startTime = dayjs(dateRange.startDate);
      const endTime = dayjs(dateRange.finalDate);
      // Verifica si el tiempo `time` está dentro del rango [startTime, endTime]
      return time.isAfter(startTime) && time.isBefore(endTime);
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        label="Hora Final"
        value={date}
        onError={handleError}
        onChange={handleChange}
        sx={{
          "& .MuiSvgIcon-root": {
            color: "#fff", // Color del icono en el TimePicker
          },
        }}
        shouldDisableTime={shouldDisableTime}
      />
    </LocalizationProvider>
  );
}
