var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useEffect, useRef } from 'react';
import { Machine, assign } from 'xstate';
import AceEditor from 'react-ace';
import { isBuiltInEvent } from './utils';
import styled from 'styled-components-web';
import { useMachine } from '@xstate/react';
import { StyledButton } from './Button';
import { format } from 'date-fns';
function getNextEvents(state) {
    var nextEvents = state.nextEvents;
    return nextEvents.filter(function (eventType) {
        return !isBuiltInEvent(eventType);
    });
}
var StyledEventPanelEvents = styled.ul(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  list-style: none;\n  padding: 0;\n  overflow-y: scroll;\n"], ["\n  list-style: none;\n  padding: 0;\n  overflow-y: scroll;\n"])));
var StyledEventPanelEvent = styled.li(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0.5rem;\n\n  > pre {\n    margin: 0;\n    flex-grow: 1;\n  }\n\n  &[data-builtin] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  details {\n    width: 100%;\n  }\n\n  summary {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n\n    > :first-child {\n      margin-right: auto;\n    }\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 0.5rem;\n\n  > pre {\n    margin: 0;\n    flex-grow: 1;\n  }\n\n  &[data-builtin] {\n    opacity: 0.5;\n    cursor: not-allowed;\n  }\n\n  details {\n    width: 100%;\n  }\n\n  summary {\n    width: 100%;\n    display: flex;\n    flex-direction: row;\n    justify-content: flex-start;\n    align-items: center;\n\n    > :first-child {\n      margin-right: auto;\n    }\n  }\n"])));
var StyledEventPanel = styled.section(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  display: grid;\n  grid-template-rows: 1fr 10rem;\n  grid-template-areas: 'events' 'editor';\n  overflow: hidden;\n"], ["\n  display: grid;\n  grid-template-rows: 1fr 10rem;\n  grid-template-areas: 'events' 'editor';\n  overflow: hidden;\n"])));
var StyledEventPanelButton = styled.button(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  appearance: none;\n  margin-right: 0.5rem;\n  background-color: var(--color-primary);\n  border: none;\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 2rem;\n  font-size: 0.75em;\n  font-weight: bold;\n"], ["\n  appearance: none;\n  margin-right: 0.5rem;\n  background-color: var(--color-primary);\n  border: none;\n  color: white;\n  padding: 0.25rem 0.5rem;\n  border-radius: 2rem;\n  font-size: 0.75em;\n  font-weight: bold;\n"])));
var StyledEventPanelEditor = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject([""], [""])));
var sendEventContext = {
    eventCode: JSON.stringify({ type: '' }, null, 2)
};
var sendEventMachine = Machine({
    id: 'sendEvent',
    initial: 'idle',
    context: sendEventContext,
    states: {
        idle: {
            on: {
                UPDATE: {
                    actions: assign({
                        eventCode: function (_, e) { return e.value; }
                    })
                },
                AUTOFILL: {
                    actions: [
                        assign({
                            eventCode: function (_, e) { return e.value; }
                        }),
                        'moveCursor'
                    ]
                },
                UPDATE_AND_SEND: {
                    actions: [
                        assign({
                            eventCode: function (_, e) { return e.value; }
                        }),
                        'sendToService'
                    ]
                },
                SEND: {
                    actions: 'sendToService'
                }
            }
        }
    }
});
export var EventPanel = function (_a) {
    var records = _a.records, state = _a.state, service = _a.service;
    var _b = useMachine(sendEventMachine, {
        execute: false
    }), current = _b[0], send = _b[1], sendEventService = _b[2];
    var editorRef = useRef(null);
    var eventsRef = useRef(null);
    useEffect(function () {
        sendEventService.execute(current, {
            sendToService: function (ctx) { return service.send(JSON.parse(ctx.eventCode)); },
            moveCursor: function () {
                if (editorRef.current) {
                    editorRef.current.moveCursorTo(1);
                    editorRef.current.navigateLineEnd();
                    editorRef.current.focus();
                }
            }
        });
    }, [current, service]);
    useEffect(function () {
        if (eventsRef.current) {
            eventsRef.current.scrollTop = eventsRef.current.scrollHeight;
        }
    }, [eventsRef.current, records.length]);
    return (React.createElement(StyledEventPanel, null,
        React.createElement(StyledEventPanelEvents, { ref: eventsRef }, records.map(function (_a, i) {
            var event = _a.event, time = _a.time;
            var pastEventCode = JSON.stringify(event, null, 2);
            var isBuiltIn = isBuiltInEvent(event.type);
            return (React.createElement(StyledEventPanelEvent, { key: i, title: "Double-click to send, click to edit", "data-builtin": isBuiltIn || undefined },
                React.createElement("details", null,
                    React.createElement("summary", null,
                        isBuiltIn ? (React.createElement("em", null, event.type)) : (React.createElement(React.Fragment, null,
                            React.createElement("strong", { title: event.type }, event.type),
                            React.createElement(StyledButton, { "data-size": "small", onClick: function (e) {
                                    !isBuiltIn
                                        ? send('UPDATE_AND_SEND', { value: pastEventCode })
                                        : undefined;
                                } }, "Replay"),
                            React.createElement(StyledButton, { "data-size": "small", onClick: function (e) {
                                    e.stopPropagation();
                                    send('AUTOFILL', { value: pastEventCode });
                                } }, "Edit"))),
                        React.createElement("time", null, format(time, 'hh:mm:ss.SS'))),
                    React.createElement("pre", null, isBuiltIn ? event.type : JSON.stringify(event, null, 2)))));
        })),
        React.createElement(StyledEventPanelEditor, null,
            getNextEvents(state).map(function (nextEvent) {
                return (React.createElement(StyledEventPanelButton, { key: nextEvent, onClick: function (e) {
                        e.stopPropagation();
                        send('AUTOFILL', {
                            value: JSON.stringify({
                                type: nextEvent
                            }, null, 2)
                        });
                    } }, nextEvent));
            }),
            React.createElement(AceEditor, { ref: function (r) {
                    if (!r) {
                        return;
                    }
                    editorRef.current = r.editor;
                }, mode: "javascript", theme: "monokai", editorProps: { $blockScrolling: true }, value: current.context.eventCode, onChange: function (value) {
                    send('UPDATE', { value: value });
                }, setOptions: { tabSize: 2, fontSize: '12px' }, width: "100%", height: '8em', showGutter: false, readOnly: false, cursorStart: 3 }),
            React.createElement(StyledButton, { onClick: function () { return service.send(JSON.parse(current.context.eventCode)); } }, "Send"))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
