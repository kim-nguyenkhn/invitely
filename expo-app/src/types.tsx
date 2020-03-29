import * as yup from 'yup';

export const EventSchema = yup.object({
    color: yup.string().notRequired(),
    description: yup.string().notRequired(),
    name: yup.string().max(15, 'Must be 15 characters or less').required(),
    eventType: yup.string().oneOf(['Single', 'Multi']).required(),
    startTime: yup.date().required(),
});

export type Event = yup.InferType<typeof EventSchema>;

export interface Navigation {
    goBack: () => void;
    navigate: (scene: string) => void;
    setOptions: (options: unknown) => void;
}
