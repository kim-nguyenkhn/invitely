import * as yup from 'yup';

export const EventSchema = yup.object({
    name: yup
        .string()
        .max(40, 'Must be 40 characters or less')
        .required('Please enter a name for your event.'),
    startTime: yup.date().required('Please enter a date for your event.').nullable(),
    // TODO: implement Location
});
