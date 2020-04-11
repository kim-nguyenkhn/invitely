import * as yup from 'yup';

export const EventSchema = yup.object({
    color: yup.string().notRequired(),
    description: yup.string().notRequired(),
    name: yup.string().max(40, 'Must be 40 characters or less').required(),
    startTime: yup.date().required().nullable(),
});
