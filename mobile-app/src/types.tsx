export interface Event {
    title: string;
    description: string;
}

export interface Navigation {
    navigate: (scene: string) => void;
};