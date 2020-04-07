import { format as dateFnsFormat } from 'date-fns';

/**
 * Given a Date object, return it as "February 22, 2020 at 3:30 PM".
 */
export function localeStringFromDate(dateObject: Date) {
    if (!dateObject) return null;

    return dateFnsFormat(dateObject, 'iiii, MMMM d, yyyy, h:mm b');
}
