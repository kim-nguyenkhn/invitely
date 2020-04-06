import * as yup from 'yup';

export const EventSchema = yup.object({
    color: yup.string().notRequired(),
    description: yup.string().notRequired(),
    name: yup.string().max(40, 'Must be 40 characters or less').required(),
    startTime: yup.date().required().nullable(),
});

export type Event = yup.InferType<typeof EventSchema>;

export interface Navigation {
    goBack: () => void;
    navigate: (scene: string) => void;
    setOptions: (options: unknown) => void;
}
