export const formatDate = (isoDateString: string) => {
    const dateObj = new Date(isoDateString);
    const today = new Date();

    const isToday = dateObj.getFullYear() === today.getFullYear() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getDate() === today.getDate();

    if (isToday) {
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };
        return dateObj.toLocaleString('en-US', timeOptions as object);
    } else {
        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        return dateObj.toLocaleString('en-US', dateOptions as object);
    }
}