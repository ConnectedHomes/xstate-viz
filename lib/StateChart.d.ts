import React from 'react';
import { StateNode, State, EventObject, Interpreter } from 'xstate';
export declare const StyledStateChart: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
interface StateChartProps {
    className?: string;
    machine: StateNode<any> | string;
    onSave: (machineString: string) => void;
    height?: number | string;
}
export interface EventRecord {
    event: EventObject;
    time: number;
}
export interface StateChartState {
    machine: StateNode<any>;
    current: State<any, any>;
    preview?: State<any, any>;
    previewEvent?: string;
    view: string;
    code: string;
    toggledStates: Record<string, boolean>;
    service: Interpreter<any>;
    error?: any;
    events: Array<EventRecord>;
}
export declare function toMachine(machine: StateNode<any> | string): StateNode<any>;
export declare const StateChart: React.FC<StateChartProps>;
export {};
