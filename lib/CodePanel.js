import React, { useCallback } from 'react';
import { Editor } from './Editor';
import { toMachine } from './StateChart';
import { getEdges } from 'xstate/lib/graph';
export var CodePanel = function (_a) {
    var code = _a.code, onChange = _a.onChange, onSave = _a.onSave;
    var handleChange = useCallback(function (code) {
        try {
            var machine = toMachine(code);
            getEdges(machine);
            onChange(code);
        }
        catch (e) {
            console.error(e);
        }
    }, [onChange]);
    return React.createElement(Editor, { code: code, onChange: handleChange, onSave: onSave });
};
