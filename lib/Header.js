import React from 'react';
import { Notifications, notificationsMachine } from './Notifications';
import { StyledHeader, StyledLogo, StyledLinks, StyledLink } from './App';
import { interpret } from 'xstate';
var notificationsService = interpret(notificationsMachine)
    .onTransition(function (s) { return console.log(s); })
    .start();
export var notificationsActor = {
    toJSON: function () { return ({ id: 'notifications' }); },
    id: 'notifications',
    send: notificationsService.send.bind(notificationsService),
    subscribe: notificationsService.subscribe.bind(notificationsService),
    notify: function (message) {
        return notificationsService.send({
            type: 'NOTIFICATIONS.QUEUE',
            data: {
                type: 'success',
                message: message
            }
        });
    }
};
export function Header() {
    return (React.createElement(StyledHeader, null,
        React.createElement(Notifications, { notifier: notificationsActor }),
        React.createElement(StyledLogo, null),
        React.createElement(StyledLinks, null,
            React.createElement(StyledLink, { href: "https://github.com/davidkpiano/xstate", target: "_xstate-github" }, "GitHub"),
            React.createElement(StyledLink, { href: "https://xstate.js.org/docs", target: "_xstate-docs" }, "Docs"),
            React.createElement(StyledLink, { href: "https://spectrum.chat/statecharts", target: "_statecharts-community" }, "Community"))));
}
