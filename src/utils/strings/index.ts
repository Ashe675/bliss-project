export const slugify = (name: string) => {
    return name
        .trim() // Eliminar espacios iniciales y finales
        .replace(/\s+/g, '-') // Reemplazar espacios con guiones
        .normalize('NFD') // Descomponer caracteres con acentos
        .replace(/[\u0300-\u036f]/g, '') // Eliminar marcas diacríticas (acentos)
        .replace(/ñ/g, 'n') // Reemplazar la ñ con n
        .replace(/[^a-zA-Z0-9-]/g, '') // Eliminar caracteres no alfanuméricos, excepto guiones
        .toLowerCase(); // Convertir todo a minúsculas
};
