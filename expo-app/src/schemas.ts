import * as yup from 'yup';

export const EventSchema = yup.object({
    name: yup.string().max(40, 'Must be 40 characters or less').required(),
    startTime: yup.date().required().nullable(),
    // TODO: implement Location
});
