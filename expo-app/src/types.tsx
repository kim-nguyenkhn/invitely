import * as yup from 'yup';

export const EventSchema = yup.object({
    eventDescription: yup.string().notRequired(),
    eventName: yup.string().max(15, 'Must be 15 characters or less').required('Required'),
    eventType: yup.string().oneOf(['Single', 'Multi']).required('Required'),
    startTime: yup.date().required('Required'),
});

export type Event = yup.InferType<typeof EventSchema>;

export interface Navigation {
    goBack: () => void;
    navigate: (scene: string) => void;
    setOptions: (options: unknown) => void;
}
