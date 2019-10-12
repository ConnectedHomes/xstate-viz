import React from 'react';
import { StateNode, State } from 'xstate';
export declare const StyledStateNodeActions: import("styled-components-web").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>>;
interface StateChartNodeProps {
    stateNode: StateNode;
    current: State<any, any>;
    preview?: State<any, any>;
    onEvent: (event: string) => void;
    onPreEvent: (event: string) => void;
    onExitPreEvent: () => void;
    onReset?: () => void;
    onSelectServiceId: (serviceId: string) => void;
    toggledStates: Record<string, boolean>;
    transitionCount: number;
    level: number;
}
export declare const StateChartNode: React.FC<StateChartNodeProps>;
export {};
