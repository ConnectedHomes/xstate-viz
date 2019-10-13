var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
import React, { createContext } from 'react';
import { StateChart } from './index';
import styled from 'styled-components-web';
import { Machine, assign } from 'xstate';
import queryString from 'query-string';
import { useMachine } from '@xstate/react';
import { log } from 'xstate/lib/actions';
import { User } from './User';
import { examples } from './examples';
import { Header, notificationsActor } from './Header';
import Logo from './logo';
var StyledApp = styled.main(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  --sidebar-width: 25rem;\n\n  height: 100%;\n  display: grid;\n  grid-template-areas:\n    'header sidebar'\n    'content content';\n  grid-template-rows: 3rem auto;\n  grid-template-columns: auto var(--sidebar-width);\n"], ["\n  --sidebar-width: 25rem;\n\n  height: 100%;\n  display: grid;\n  grid-template-areas:\n    'header sidebar'\n    'content content';\n  grid-template-rows: 3rem auto;\n  grid-template-columns: auto var(--sidebar-width);\n"])));
export var StyledHeader = styled.header(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: stretch;\n  grid-area: header;\n  padding: 0.5rem 1rem;\n  z-index: 1;\n"], ["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: stretch;\n  grid-area: header;\n  padding: 0.5rem 1rem;\n  z-index: 1;\n"])));
export var StyledLogo = styled(Logo)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  height: 100%;\n"], ["\n  height: 100%;\n"])));
export var StyledLinks = styled.nav(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  margin-left: auto;\n\n  &,\n  &:visited {\n  }\n"], ["\n  display: flex;\n  flex-direction: row;\n  margin-left: auto;\n\n  &,\n  &:visited {\n  }\n"])));
export var StyledLink = styled.a(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  text-decoration: none;\n  color: #57b0ea;\n  text-transform: uppercase;\n  display: block;\n  font-size: 75%;\n  font-weight: bold;\n  margin: 0 0.25rem;\n"], ["\n  text-decoration: none;\n  color: #57b0ea;\n  text-transform: uppercase;\n  display: block;\n  font-size: 75%;\n  font-weight: bold;\n  margin: 0 0.25rem;\n"])));
var invokeSaveGist = function (ctx, e) {
    return fetch("https://api.github.com/gists/" + ctx.query.gist, {
        method: 'post',
        body: JSON.stringify({
            description: 'XState test',
            files: {
                'machine.js': { content: e.code }
            }
        }),
        headers: {
            Authorization: "token " + ctx.token
        }
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to save gist');
        }
        return response.json();
    });
};
var invokePostGist = function (ctx, e) {
    return fetch("https://api.github.com/gists", {
        method: 'post',
        body: JSON.stringify({
            description: 'XState test',
            files: {
                'machine.js': { content: e.code }
            }
        }),
        headers: {
            Authorization: "token " + ctx.token
        }
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to post gist');
        }
        return response.json();
    });
};
var invokeFetchGist = function (ctx) {
    return fetch("https://api.github.com/gists/" + ctx.query.gist, {
        headers: {
            Accept: 'application/json'
        }
    }).then(function (data) { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!!data.ok) return [3 /*break*/, 2];
                    _a = Error.bind;
                    return [4 /*yield*/, data.json()];
                case 1: throw new (_a.apply(Error, [void 0, (_b.sent()).message]))();
                case 2: return [2 /*return*/, data.json()];
            }
        });
    }); });
};
var getUser = function (ctx) {
    return fetch("https://api.github.com/user", {
        headers: {
            Authorization: "token " + ctx.token
        }
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Unable to get user');
        }
        return response.json();
    });
};
function createAuthActor() {
    var listener = null;
    var code = null;
    return {
        send: function (_code) {
            code = _code;
            if (listener) {
                listener(_code);
            }
        },
        listen: function (l) {
            listener = l;
            if (code) {
                listener(code);
            }
        }
    };
}
function updateQuery(query) {
    if (!window.history)
        return;
    var fullQuery = __assign({}, queryString.parse(window.location.search), query);
    window.history.replaceState(null, '', "?" + queryString.stringify(fullQuery));
}
window.updateQuery = updateQuery;
var authActor = createAuthActor();
window.authCallback = function (code) {
    authActor.send(code);
};
var query = queryString.parse(window.location.search);
var appMachine = Machine({
    id: 'app',
    context: {
        query: query,
        token: process.env.REACT_APP_TEST_TOKEN,
        gist: query.gist || undefined,
        example: examples.omni,
        user: undefined
    },
    invoke: [
        {
            id: 'test',
            src: function () { return function (cb) {
                authActor.listen(function (code) {
                    cb({ type: 'CODE', code: code });
                });
            }; }
        }
    ],
    type: 'parallel',
    states: {
        auth: {
            initial: 'checkingCode',
            states: {
                checkingCode: {
                    on: {
                        '': [
                            {
                                target: 'authorized',
                                cond: function (ctx) { return !!ctx.token; }
                            },
                            {
                                target: 'authorizing',
                                cond: function (ctx) {
                                    return !!ctx.query.code;
                                }
                            },
                            {
                                target: 'unauthorized',
                                actions: assign({
                                    example: examples.light
                                })
                            }
                        ]
                    }
                },
                authorizing: {
                    invoke: {
                        src: function (ctx, e) {
                            return fetch("http://xstate-gist.azurewebsites.net/api/GistPost?code=" + e.code)
                                .then(function (response) {
                                if (!response.ok) {
                                    throw new Error('unauthorized');
                                }
                                return response.json();
                            })
                                .then(function (data) {
                                if (data.error) {
                                    throw new Error('expired code');
                                }
                                return data;
                            });
                        },
                        onDone: {
                            target: 'authorized',
                            actions: assign({
                                token: function (ctx, e) { return e.data.access_token; }
                            })
                        },
                        onError: {
                            target: 'unauthorized',
                            actions: function (_, e) { return alert(e.data); }
                        }
                    }
                },
                authorized: {
                    type: 'parallel',
                    states: {
                        user: {
                            initial: 'fetching',
                            states: {
                                fetching: {
                                    invoke: {
                                        src: getUser,
                                        onDone: {
                                            target: 'loaded',
                                            actions: assign({
                                                // @ts-ignore
                                                user: function (_, e) { return e.data; }
                                            })
                                        }
                                    }
                                },
                                loaded: {}
                            }
                        },
                        gist: {
                            initial: 'idle',
                            states: {
                                idle: {
                                    initial: 'default',
                                    states: {
                                        default: {},
                                        patched: {
                                            after: {
                                                1000: 'default'
                                            }
                                        },
                                        posted: {
                                            after: {
                                                1000: 'default'
                                            }
                                        }
                                    }
                                },
                                patching: {
                                    invoke: {
                                        src: invokeSaveGist,
                                        onDone: {
                                            target: 'idle.patched',
                                            actions: [
                                                log(),
                                                function (ctx) { return notificationsActor.notify('Gist saved!'); }
                                            ]
                                        }
                                    }
                                },
                                posting: {
                                    invoke: {
                                        src: invokePostGist,
                                        onDone: {
                                            target: 'idle.posted',
                                            actions: [
                                                assign({
                                                    gist: function (_, e) { return e.data.id; }
                                                }),
                                                function () { return notificationsActor.notify('Gist created!'); }
                                            ]
                                        }
                                    }
                                },
                                posted: {
                                    entry: function (_a) {
                                        var gist = _a.gist;
                                        return updateQuery({ gist: gist });
                                    }
                                }
                            },
                            on: {
                                'GIST.SAVE': [
                                    { target: '.patching', cond: function (ctx) { return !!ctx.gist; } },
                                    { target: '.posting' }
                                ]
                            }
                        }
                    }
                },
                unauthorized: {
                    on: {
                        LOGIN: 'pendingAuthorization'
                    }
                },
                pendingAuthorization: {
                    entry: function () {
                        window.open('https://github.com/login/oauth/authorize?client_id=39c1ec91c4ed507f6e4c&scope=gist', 'Login with GitHub', 'width=800,height=600');
                    },
                    on: {
                        CODE: 'authorizing'
                    }
                }
            },
            on: {
                LOGIN: '.pendingAuthorization'
            }
        },
        gist: {
            initial: 'checking',
            states: {
                checking: {
                    on: {
                        '': [
                            { target: 'fetching', cond: function (ctx) { return !!ctx.query.gist; } },
                            { target: 'idle' }
                        ]
                    }
                },
                idle: {},
                fetching: {
                    invoke: {
                        src: invokeFetchGist,
                        onDone: {
                            target: 'loaded',
                            actions: assign({
                                // @ts-ignore
                                example: function (_, e) {
                                    return e.data.files['machine.js'].content;
                                }
                            })
                        },
                        onError: {
                            target: 'idle',
                            actions: [
                                assign({
                                    gist: undefined
                                }),
                                function (ctx) { return notificationsActor.notify('Gist not found.'); }
                            ]
                        }
                    }
                },
                loaded: {
                    entry: function (ctx, e) { return notificationsActor.notify('Gist loaded!'); }
                }
            }
        }
    }
});
export var AppContext = createContext({ state: appMachine.initialState, send: function () { }, service: {} });
export var App = function (_a) {
    var machine = _a.machine;
    var currentMachine = machine ? machine : appMachine;
    var _b = useMachine(currentMachine), current = _b[0], send = _b[1], service = _b[2];
    if (current.matches({ gist: 'fetching' })) {
        return React.createElement("div", null, "Loading...");
    }
    console.log(current.value);
    return (React.createElement(StyledApp, null,
        React.createElement(AppContext.Provider, { value: { state: current, send: send, service: service } },
            React.createElement(User, null),
            React.createElement(Header, null),
            React.createElement(StateChart, { machine: current.context.example, onSave: function (code) {
                    send('GIST.SAVE', { code: code });
                } }))));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
