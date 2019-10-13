import React from 'react';
import { State } from 'xstate';
import { Actor } from 'xstate/lib/Actor';
interface Notification {
    type: 'info' | 'success' | 'warning' | 'error';
    message: string;
}
interface NotificationsContext {
    notifications: Array<Notification>;
}
export declare const notificationsMachine: import("xstate").StateMachine<NotificationsContext, any, import("xstate").EventObject>;
interface NotificationsProps {
    notifier: Actor<State<NotificationsContext>>;
}
export declare const Notifications: React.FunctionComponent<NotificationsProps>;
export {};
