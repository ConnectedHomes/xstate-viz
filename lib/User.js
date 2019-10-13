var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React, { useContext } from 'react';
import { AppContext } from './App';
import styled from 'styled-components-web';
var StyledUser = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  display: grid;\n  grid-template-columns: 1fr 3rem;\n  grid-template-rows: 50% 50%;\n  grid-template-areas:\n    'name avatar'\n    'details avatar';\n  padding: 0.5rem 0;\n\n  > figure {\n    margin: 0;\n    grid-area: avatar;\n\n    > img {\n      height: 100%;\n      border-radius: 0.5rem;\n    }\n  }\n"], ["\n  height: 100%;\n  display: grid;\n  grid-template-columns: 1fr 3rem;\n  grid-template-rows: 50% 50%;\n  grid-template-areas:\n    'name avatar'\n    'details avatar';\n  padding: 0.5rem 0;\n\n  > figure {\n    margin: 0;\n    grid-area: avatar;\n\n    > img {\n      height: 100%;\n      border-radius: 0.5rem;\n    }\n  }\n"])));
export var User = function () {
    var _a = useContext(AppContext), state = _a.state, send = _a.send;
    var user = state.context.user;
    return (React.createElement("div", null, !state.matches({ auth: 'authorized' }) ? (React.createElement("button", { onClick: function () { return send('LOGIN'); } }, "Login")) : state.matches({ auth: { authorized: { user: 'loaded' } } }) ? (React.createElement(StyledUser, null,
        React.createElement("div", null, user.login),
        React.createElement("figure", null,
            React.createElement("img", { src: user.avatar_url })))) : (React.createElement("div", null, "loading user"))));
};
var templateObject_1;
