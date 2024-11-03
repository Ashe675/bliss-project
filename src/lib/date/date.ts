import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // Para formateo
import isBetween from 'dayjs/plugin/isBetween'; // Si necesitas validaciones de rango

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

export function formatDateTo12Hour(date : Date) {
    return dayjs(date).format('hh:mm A'); // Formato de 12 horas
}
