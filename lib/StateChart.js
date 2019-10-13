var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import styled from 'styled-components-web';
import { Machine, assign, send, spawn, interpret } from 'xstate';
import * as XState from 'xstate';
import { StateChartContainer } from './VizTabs';
import { StatePanel } from './StatePanel';
import { EventPanel } from './EventPanel';
import { CodePanel } from './CodePanel';
import { raise } from 'xstate/lib/actions';
var StyledViewTab = styled.li(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0 1rem;\n  border-bottom: 2px solid transparent;\n  list-style: none;\n  text-transform: uppercase;\n  user-select: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:not([data-active]):hover {\n    border-color: var(--color-secondary-light);\n  }\n\n  &[data-active] {\n    border-color: var(--color-secondary);\n  }\n"], ["\n  padding: 0 1rem;\n  border-bottom: 2px solid transparent;\n  list-style: none;\n  text-transform: uppercase;\n  user-select: none;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  &:not([data-active]):hover {\n    border-color: var(--color-secondary-light);\n  }\n\n  &[data-active] {\n    border-color: var(--color-secondary);\n  }\n"])));
var StyledViewTabs = styled.ul(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  margin: 0;\n  padding: 0;\n  flex-grow: 0;\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n"], ["\n  display: flex;\n  width: 100%;\n  height: 100%;\n  flex-direction: row;\n  justify-content: flex-start;\n  align-items: stretch;\n  margin: 0;\n  padding: 0;\n  flex-grow: 0;\n  flex-shrink: 0;\n  position: sticky;\n  top: 0;\n"])));
var StyledSidebar = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background-color: var(--color-sidebar);\n  color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 2rem 1fr;\n  border-top-left-radius: 1rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);\n"], ["\n  background-color: var(--color-sidebar);\n  color: white;\n  overflow: hidden;\n  display: grid;\n  grid-template-columns: 1fr;\n  grid-template-rows: 2rem 1fr;\n  border-top-left-radius: 1rem;\n  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);\n"])));
var StyledView = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  // overflow: hidden;\n"], ["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-items: stretch;\n  // overflow: hidden;\n"])));
export var StyledStateChart = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  grid-area: content;\n  display: grid;\n  grid-template-columns: 1fr var(--sidebar-width, 25rem);\n  grid-template-rows: 1fr;\n  grid-column-gap: 1rem;\n  font-family: sans-serif;\n  font-size: 12px;\n  overflow: hidden;\n  max-height: inherit;\n\n  > ", " {\n    grid-column: 2 / 3;\n    grid-row: 1 / -1;\n  }\n\n  > ", " {\n    grid-column: 1 / 2;\n    grid-row: 1 / -1;\n  }\n\n  > * {\n    max-height: inherit;\n    overflow-y: auto;\n  }\n"], ["\n  grid-area: content;\n  display: grid;\n  grid-template-columns: 1fr var(--sidebar-width, 25rem);\n  grid-template-rows: 1fr;\n  grid-column-gap: 1rem;\n  font-family: sans-serif;\n  font-size: 12px;\n  overflow: hidden;\n  max-height: inherit;\n\n  > ", " {\n    grid-column: 2 / 3;\n    grid-row: 1 / -1;\n  }\n\n  > ", " {\n    grid-column: 1 / 2;\n    grid-row: 1 / -1;\n  }\n\n  > * {\n    max-height: inherit;\n    overflow-y: auto;\n  }\n"])), StyledSidebar, StyledViewTabs);
export function toMachine(machine) {
    if (typeof machine !== 'string') {
        return machine;
    }
    var createMachine;
    // export {
    //   Machine,
    //   StateNode,
    //   State,
    //   matchesState,
    //   mapState,
    //   actions,
    //   assign,
    //   send,
    //   sendParent,
    //   interpret,
    //   Interpreter,
    //   matchState,
    //   spawn
    // };
    try {
        createMachine = new Function('Machine', 'interpret', 'assign', 'send', 'sendParent', 'spawn', 'raise', 'actions', 'XState', machine);
    }
    catch (e) {
        throw e;
    }
    var machines = [];
    var machineProxy = function (config, options) {
        var machine = Machine(config, options);
        machines.push(machine);
        return machine;
    };
    createMachine(machineProxy, interpret, assign, send, XState.sendParent, spawn, raise, XState.actions, XState);
    return machines[machines.length - 1];
}
var StyledStateViewActions = styled.ul(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  margin: 0;\n  padding: 0;\n  list-style: none;\n"], ["\n  margin: 0;\n  padding: 0;\n  list-style: none;\n"])));
var StyledStateViewAction = styled.li(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  white-space: nowrap;\n  overflow-x: auto;\n"], ["\n  white-space: nowrap;\n  overflow-x: auto;\n"])));
var StateChart = /** @class */ (function (_super) {
    __extends(StateChart, _super);
    function StateChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = (function () {
            var machine = toMachine(_this.props.machine);
            // const machine = this.props.machine;
            return {
                current: machine.initialState,
                preview: undefined,
                previewEvent: undefined,
                view: 'definition',
                machine: machine,
                code: typeof _this.props.machine === 'string'
                    ? _this.props.machine
                    : "Machine(" + JSON.stringify(machine.config, null, 2) + ")",
                toggledStates: {},
                service: interpret(machine, {}).onTransition(function (current) {
                    _this.handleTransition(current);
                }),
                events: []
            };
        })();
        _this.svgRef = React.createRef();
        return _this;
    }
    StateChart.prototype.handleTransition = function (state) {
        var _this = this;
        var formattedEvent = {
            event: state.event,
            time: Date.now()
        };
        this.setState({ current: state, events: this.state.events.concat(formattedEvent) }, function () {
            if (_this.state.previewEvent) {
                // this.setState({
                //   preview: this.state.service.nextState(this.state.previewEvent)
                // });
            }
        });
    };
    StateChart.prototype.componentDidMount = function () {
        this.state.service.start();
    };
    StateChart.prototype.componentDidUpdate = function (prevProps) {
        var machine = this.props.machine;
        if (machine !== prevProps.machine) {
            this.updateMachine(machine.toString());
        }
    };
    StateChart.prototype.renderView = function () {
        var _this = this;
        var _a = this.state, view = _a.view, current = _a.current, machine = _a.machine, code = _a.code, service = _a.service, events = _a.events;
        var onSave = this.props.onSave;
        switch (view) {
            case 'definition':
                return (React.createElement(CodePanel, { code: code, onChange: function (code) { return _this.updateMachine(code); }, onSave: onSave }));
            case 'state':
                return React.createElement(StatePanel, { state: current, service: service });
            case 'events':
                return (React.createElement(EventPanel, { state: current, service: service, records: events }));
            default:
                return null;
        }
    };
    StateChart.prototype.updateMachine = function (code) {
        var machine;
        try {
            machine = toMachine(code);
        }
        catch (e) {
            console.error(e);
            alert('Error: unable to update the machine.\nCheck the console for more info.');
            return;
        }
        this.reset(code, machine);
    };
    StateChart.prototype.reset = function (code, machine) {
        var _this = this;
        if (code === void 0) { code = this.state.code; }
        if (machine === void 0) { machine = this.state.machine; }
        this.state.service.stop();
        this.setState({
            code: code,
            machine: machine,
            events: [],
            current: machine.initialState
        }, function () {
            _this.setState({
                service: interpret(_this.state.machine)
                    .onTransition(function (current) {
                    _this.handleTransition(current);
                    // TODO: fix events
                    // this.setState({ current, events: [] }, () => {
                    //   if (this.state.previewEvent) {
                    //     this.setState({
                    //       preview: this.state.service.nextState(
                    //         this.state.previewEvent
                    //       )
                    //     });
                    //   }
                    // });
                })
                    .start()
            }, function () {
                console.log(_this.state.service);
            });
        });
    };
    StateChart.prototype.render = function () {
        var _this = this;
        var _a = this.state, code = _a.code, service = _a.service;
        return (React.createElement(StyledStateChart, { className: this.props.className, key: code, style: {
                background: 'var(--color-app-background)',
                // @ts-ignore
                '--color-app-background': '#FFF',
                '--color-border': '#dedede',
                '--color-primary': 'rgba(87, 176, 234, 1)',
                '--color-primary-faded': 'rgba(87, 176, 234, 0.5)',
                '--color-primary-shadow': 'rgba(87, 176, 234, 0.1)',
                '--color-link': 'rgba(87, 176, 234, 1)',
                '--color-disabled': '#c7c5c5',
                '--color-edge': 'rgba(0, 0, 0, 0.2)',
                '--color-edge-active': 'var(--color-primary)',
                '--color-secondary': 'rgba(255,152,0,1)',
                '--color-secondary-light': 'rgba(255,152,0,.5)',
                '--color-sidebar': '#272722',
                '--radius': '0.2rem',
                '--border-width': '2px'
            } },
            React.createElement(StateChartContainer, { service: service, onReset: function () { return _this.reset(); } }),
            React.createElement(StyledSidebar, null,
                React.createElement(StyledViewTabs, null, ['definition', 'state', 'events'].map(function (view) {
                    return (React.createElement(StyledViewTab, { onClick: function () { return _this.setState({ view: view }); }, key: view, "data-active": _this.state.view === view || undefined }, view));
                })),
                this.renderView())));
    };
    return StateChart;
}(React.Component));
export { StateChart };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7;
