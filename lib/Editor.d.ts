import React from 'react';
import { AceEditorProps } from 'react-ace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
interface EditorProps extends AceEditorProps {
    code: string;
    onChange: (code: string) => void;
    onSave: (code: string) => void;
    height?: string;
    changeText?: string;
    mode?: string;
}
export declare const StyledEditor: import("styled-components-web").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const StyledButtons: import("styled-components-web").StyledComponentClass<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, any, React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>;
export declare const Editor: React.FunctionComponent<EditorProps>;
export {};
