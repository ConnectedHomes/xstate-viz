/// <reference types="styled-components" />
import React from 'react';
import { EventObject, State, Interpreter } from 'xstate';
export declare const StyledHeader: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>;
export declare const StyledLogo: import("styled-components").StyledComponentClass<{
    className?: string | undefined;
}, any, Pick<{
    className?: string | undefined;
}, "className"> & {
    theme?: any;
}>;
export declare const StyledLink: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, any, React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>>;
export declare const StyledLinks: import("styled-components").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>>;
interface GithubUser {
    login: string;
    avatar_url: string;
}
interface AppMachineContext {
    query: {
        gist?: string;
        code?: string;
        layout?: string;
    };
    token?: string;
    machine: any;
    user?: GithubUser;
    /**
     * Gist ID
     */
    gist?: {
        id: string;
        owner: GithubUser;
    };
}
export declare const AppContext: React.Context<{
    state: State<AppMachineContext, EventObject>;
    send: (event: any) => void;
    service: Interpreter<AppMachineContext, any, EventObject>;
}>;
export declare function App(): JSX.Element;
export {};
