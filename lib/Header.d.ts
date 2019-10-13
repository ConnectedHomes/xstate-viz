/// <reference types="react" />
import { Actor } from 'xstate/lib/Actor';
export declare const notificationsActor: Actor & {
    notify: (message: string) => void;
};
export declare function Header(): JSX.Element;
