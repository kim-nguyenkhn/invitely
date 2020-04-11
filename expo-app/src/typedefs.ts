import * as yup from 'yup';
import { EventSchema } from './schemas';

export type Event = yup.InferType<typeof EventSchema>;

export interface Navigation {
    goBack: () => void;
    navigate: (scene: string) => void;
    setOptions: (options: unknown) => void;
}

export enum ScreenNames {
    Dashboard = 'Dashboard',
    CreateEvent = 'CreateEvent',
    AddGuests = 'AddGuests',
}
