import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'; // Para formateo
import isBetween from 'dayjs/plugin/isBetween'; // Si necesitas validaciones de rango
import es from 'dayjs/locale/es'

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.locale(es);

export function formatDateTo12Hour(date: Date) {
    return dayjs(date).format('hh:mm A'); // Formato de 12 horas
}

// Función para formato latino dd/mm/yyyy hh:mm A
export function formatToLatinDateTime(date: Date) {
    return dayjs(date).format('DD/MM/YYYY hh:mm A'); // Formato latino 12 horas con AM/PM
}

// Función para fecha en español y hora en formato latino
export function formatToSpanishDateTime(date: Date) {
    return dayjs(date).format('dddd, D [de] MMMM [de] YYYY hh:mm A'); // Ejemplo: "martes, 7 de noviembre de 2024 04:30 PM"
}