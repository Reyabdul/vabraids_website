/**
 * 30-minute time-of-day options between startHour and endHour (24h clock).
 * Used by the inquiry form's time-slot picker.
 * @returns {Array<{ value: string, label: string }>}
 */
export function generateTimeOptions(startHour = 9, endHour = 18) {
  const options = [];
  for (let minutes = startHour * 60; minutes < endHour * 60; minutes += 30) {
    const hours24 = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const asDate = new Date(2000, 0, 1, hours24, mins);
    options.push({
      value: `${String(hours24).padStart(2, '0')}:${String(mins).padStart(2, '0')}`,
      label: asDate.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }),
    });
  }
  return options;
}

/**
 * Format a date + "HH:mm" time value as "Thu, Sep 12 · 2:30 PM" for
 * display in the trigger field and the form's hidden serialized value.
 */
export function formatSlot(date, timeValue) {
  if (!date || !timeValue) return '';
  const [hours, minutes] = timeValue.split(':').map(Number);
  const withTime = new Date(date);
  withTime.setHours(hours, minutes, 0, 0);
  const dateLabel = withTime.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  const timeLabel = withTime.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
  return `${dateLabel} · ${timeLabel}`;
}
