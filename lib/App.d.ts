/// <reference types="styled-components-web" />
import React from 'react';
import { EventObject, State, Interpreter, StateMachine } from 'xstate';
export declare const StyledHeader: import("styled-components-web").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>;
export declare const StyledLogo: import("styled-components-web").StyledComponentClass<{}, any, Pick<{}, never> & {
    theme?: any;
}>;
export declare const StyledLinks: import("styled-components-web").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>;
export declare const StyledLink: import("styled-components-web").StyledComponentClass<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, any, React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>;
interface AppMachineContext {
    query: {
        gist?: string;
        code?: string;
    };
    token?: string;
    example: any;
    user: any;
    /**
     * Gist ID
     */
    gist?: string;
}
export declare const AppContext: React.Context<{
    state: State<AppMachineContext, EventObject>;
    send: (event: any) => void;
    service: Interpreter<AppMachineContext, any, EventObject>;
}>;
interface Props {
    machine: StateMachine<any, any, any>;
}
export declare const App: React.SFC<Props>;
export {};
