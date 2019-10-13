import React from 'react';
import { Interpreter } from 'xstate';
interface StateChartContainerProps {
    service: Interpreter<any, any>;
    onReset: () => void;
}
export declare const StyledStateChartContainer: import("styled-components-web").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>;
export declare const StateChartContainer: React.SFC<StateChartContainerProps>;
export {};
