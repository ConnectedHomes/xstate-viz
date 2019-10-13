var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useState } from 'react';
import { Machine, assign, actions } from 'xstate';
import { produce } from 'immer';
import { log } from 'xstate/lib/actions';
import styled from 'styled-components-web';
export var notificationsMachine = Machine({
    id: 'notifications',
    context: {
        notifications: []
    },
    initial: 'inactive',
    states: {
        inactive: {},
        active: {
            entry: log(),
            on: {
                'NOTIFICATION.DISMISS': {
                    actions: assign({
                        notifications: function (ctx, e) {
                            return produce(ctx.notifications, function (draft) {
                                draft.pop();
                            });
                        }
                    })
                }
            }
        }
    },
    on: {
        'NOTIFICATIONS.QUEUE': {
            target: '.active',
            actions: [
                assign({
                    notifications: function (ctx, e) {
                        return produce(ctx.notifications, function (draft) {
                            draft.push(e.data);
                        });
                    }
                }),
                actions.send('NOTIFICATION.DISMISS', { delay: 'TIMEOUT' })
            ]
        }
    }
}, {
    delays: {
        TIMEOUT: 5000
    }
});
var StyledNotifications = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n\n  > * {\n    pointer-events: auto;\n  }\n"], ["\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  pointer-events: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: center;\n\n  > * {\n    pointer-events: auto;\n  }\n"])));
var StyledNotification = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 0.5rem 1rem;\n  margin: 1rem;\n  border-radius: 1rem;\n  background: #2f86eb;\n  color: white;\n  font-weight: bold;\n  animation: notification-slideDown calc(var(--timeout, 4000) * 1ms) ease both;\n  will-change: transform;\n\n  &[data-type='success'] {\n    background: #40d38d;\n  }\n\n  &[data-type='info'] {\n    background: #2f86eb;\n  }\n\n  @keyframes notification-slideDown {\n    from {\n      transform: translateY(-100%);\n    }\n    20%,\n    to {\n      transform: none;\n    }\n    20%,\n    50% {\n      opacity: 1;\n    }\n    from,\n    to {\n      opacity: 0;\n    }\n  }\n"], ["\n  padding: 0.5rem 1rem;\n  margin: 1rem;\n  border-radius: 1rem;\n  background: #2f86eb;\n  color: white;\n  font-weight: bold;\n  animation: notification-slideDown calc(var(--timeout, 4000) * 1ms) ease both;\n  will-change: transform;\n\n  &[data-type='success'] {\n    background: #40d38d;\n  }\n\n  &[data-type='info'] {\n    background: #2f86eb;\n  }\n\n  @keyframes notification-slideDown {\n    from {\n      transform: translateY(-100%);\n    }\n    20%,\n    to {\n      transform: none;\n    }\n    20%,\n    50% {\n      opacity: 1;\n    }\n    from,\n    to {\n      opacity: 0;\n    }\n  }\n"])));
export var Notifications = function (_a) {
    var notifier = _a.notifier;
    var _b = useState(), current = _b[0], setCurrent = _b[1];
    useEffect(function () {
        notifier.subscribe(function (state) {
            setCurrent(state);
        });
    }, []);
    if (!current) {
        return null;
    }
    return (React.createElement(StyledNotifications, null, current.context.notifications.map(function (notification, i) {
        return (React.createElement(StyledNotification, { key: i, "data-type": notification.type, style: {
                // @ts-ignore
                '--timeout': 5000
            } },
            notification.message,
            React.createElement("button", { onClick: function () {
                    return notifier.send({ type: 'NOTIFICATION.DISMISS', index: i });
                } }, "x")));
    })));
};
var templateObject_1, templateObject_2;
