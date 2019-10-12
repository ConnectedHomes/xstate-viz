import React, { Component, createContext, useState, useReducer } from 'react';
import { StateChart, notificationsMachine, Notifications } from './index';
import styled from 'styled-components-web';
import { Machine, assign, EventObject, State, Interpreter, StateMachine } from 'xstate';
import queryString from 'query-string';
import { useMachine } from '@xstate/react';
import { log, send } from 'xstate/lib/actions';
import { User } from './User';

import { examples } from './examples';
import { Header, notificationsActor } from './Header';
import { Logo } from './logo';
import { Loader } from './Loader';
import { LayoutButton, StyledLayoutButton } from './LayoutButton';
import { toMachine } from './StateChart';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  grid-area: header;
  padding: 0.5rem 1rem;
  z-index: 1;
  white-space: nowrap;
`;

const StyledApp = styled.main`
  --color-app-background: #fff;
  --color-border: #c9c9c9;
  --color-primary: rgba(87, 176, 234, 1);
  --color-primary-faded: rgba(87, 176, 234, 0.5);
  --color-primary-shadow: rgba(87, 176, 234, 0.1);
  --color-link: rgba(87, 176, 234, 1);
  --color-disabled: #b3b3b3;
  --color-edge: #c9c9c9;
  --color-edge-active: var(--color-primary);
  --color-secondary: rgba(255, 152, 0, 1);
  --color-secondary-light: rgba(255, 152, 0, 0.5);
  --color-sidebar: #272722;
  --color-gray: #555;
  --color-failure: #ee7170;
  --color-success: #31ae00;
  --radius: 0.2rem;
  --border-width: 2px;
  --sidebar-width: 25rem;
  --shadow: 0 0.5rem 1rem var(--shadow-color, rgba(0, 0, 0, 0.2));
  --duration: 0.2s;
  --easing: cubic-bezier(0.5, 0, 0.5, 1);

  height: 100%;
  display: grid;
  grid-template-areas:
    'header sidebar'
    'content content';
  grid-template-rows: 3rem auto;
  grid-template-columns: auto var(--sidebar-width);
  overflow: hidden;

  > ${StyledLayoutButton} {
    display: inline-block;
    grid-row: 2;
    grid-column: -1;
  }

  @media (max-width: 900px) {
    grid-template-columns: 50% 50%;
  }

  &[data-embed] {
    grid-template-rows: 0 auto;

    > ${StyledHeader} {
      display: none;
    }
  }
`;

export const StyledLogo = styled(Logo)`
  height: 2rem;
`;

export const StyledLink = styled.a`
  text-decoration: none;
  color: #57b0ea;
  text-transform: uppercase;
  display: block;
  font-size: 75%;
  font-weight: bold;
  margin: 0 0.25rem;
`;

export const StyledLinks = styled.nav`
  display: flex;
  flex-direction: row;

  > ${StyledLink} {
    line-height: 2rem;
    margin-left: 1rem;
  }

  &,
  &:visited {
  }
`;

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

const invokeSaveGist = (ctx: AppMachineContext, e: EventObject) => {
  return fetch(`https://api.github.com/gists/` + ctx.gist!.id, {
    method: 'post',
    body: JSON.stringify({
      description: 'Generated by XState Viz: https://xstate.js.org/viz',
      public: true,
      files: {
        'machine.js': { content: e.code }
      }
    }),
    headers: {
      Authorization: `token ${ctx.token}`
    }
  }).then(async response => {
    if (!response.ok) {
      throw new Error((await response.json()).message);
    }

    return response.json();
  });
};

const invokePostGist = (ctx: AppMachineContext, e: EventObject) => {
  return fetch(`https://api.github.com/gists`, {
    method: 'post',
    body: JSON.stringify({
      description: 'Generated by XState Viz: https://xstate.js.org/viz',
      public: true,
      files: {
        'machine.js': { content: e.code }
      }
    }),
    headers: {
      Authorization: `token ${ctx.token}`
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Unable to post gist');
    }

    return response.json();
  });
};

function parseGist(gistQuery: string): string | null {
  const gistMatch = gistQuery.match(/([a-zA-Z0-9]{32})/);

  return !gistMatch ? null : gistMatch[0];
}

const invokeFetchGist = (ctx: AppMachineContext) => {
  const gist = parseGist(ctx.query.gist!);
  if (!gist) {
    return Promise.reject('Invalid gist ID.');
  }
  return fetch(`https://api.github.com/gists/${gist}`, {
    headers: {
      Accept: 'application/json'
    }
  }).then(async data => {
    if (!data.ok) {
      throw new Error((await data.json()).message);
    }

    return data.json();
  });
};

const getUser = (ctx: AppMachineContext) => {
  return fetch(`https://api.github.com/user`, {
    headers: {
      Authorization: `token ${ctx.token}`
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Unable to get user');
    }

    return response.json();
  });
};

function createAuthActor() {
  let listener: ((code: string) => void) | null = null;
  let code: string | null = null;

  return {
    send(_code: string) {
      code = _code;

      if (listener) {
        listener(_code);
      }
    },
    listen(l: (code: string) => void) {
      listener = l;

      if (code) {
        listener(code);
      }
    }
  };
}

function updateQuery(query: Record<string, string | undefined>): void {
  if (!window.history) return;

  const fullQuery = {
    ...queryString.parse(window.location.search),
    ...query
  };

  window.history.replaceState(null, '', `?${queryString.stringify(fullQuery)}`);
}

(window as any).updateQuery = updateQuery;

const authActor = createAuthActor();

(window as any).authCallback = (code: string) => {
  authActor.send(code);
};

const query = queryString.parse(window.location.search);

const appMachine = Machine<AppMachineContext>(
  {
    id: 'app',
    context: {
      query,
      token: undefined,
      // token: process.env.REACT_APP_TEST_TOKEN,
      gist: undefined,
      machine: examples.basic,
      user: undefined
    },
    invoke: [
      {
        id: 'test',
        src: () => cb => {
          authActor.listen(code => {
            cb({ type: 'CODE', code });
          });
        }
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
                  target: 'authorizing',
                  cond: ctx => {
                    return !!ctx.query.code;
                  }
                },
                {
                  target: 'gettingUser',
                  cond: ctx => {
                    return !!ctx.token;
                  }
                },
                {
                  target: 'unauthorized',
                  actions: assign<AppMachineContext>({
                    machine: examples.basic
                  })
                }
              ]
            }
          },
          authorizing: {
            invoke: {
              src: (ctx, e) => {
                return fetch(
                  `https://xstate-gist.azurewebsites.net/api/GistPost?code=${
                    e.code
                  }&redirect_uri=${encodeURI(window.location.href)}`
                )
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('unauthorized');
                    }

                    return response.json();
                  })
                  .then(data => {
                    if (data.error) {
                      throw new Error('expired code');
                    }

                    return data;
                  });
              },
              onDone: {
                target: 'gettingUser',
                actions: assign<AppMachineContext>({
                  token: (ctx, e) => e.data.access_token
                })
              },
              onError: {
                target: 'unauthorized',
                actions: (_, e) => alert(e.data)
              }
            }
          },
          gettingUser: {
            invoke: {
              src: getUser,
              onDone: {
                target: 'authorized',
                actions: assign<AppMachineContext>({
                  // @ts-ignore
                  user: (_, e) => e.data
                })
              },
              onError: {
                target: 'unauthorized',
                actions: (_, e) => {
                  console.error(e);
                  notificationsActor.notify({
                    message: 'Authorization failed',
                    description: e.data.message,
                    severity: 'error'
                  });
                }
              }
            }
          },
          authorized: {
            type: 'parallel',
            states: {
              user: {},
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
                          ctx =>
                            notificationsActor.notify({
                              message: 'Saved!',
                              description:
                                'Copy and paste the URL to share the visualization.',
                              severity: 'success'
                            })
                        ]
                      },
                      onError: {
                        target: 'idle',
                        actions: (ctx, e) => {
                          console.error(e);
                          notificationsActor.notify({
                            message: 'Failed to save machine',
                            severity: 'error',
                            description: e.data.message
                          });
                        }
                      }
                    }
                  },
                  posting: {
                    invoke: {
                      src: invokePostGist,
                      onDone: {
                        target: 'idle.posted',
                        actions: [
                          assign<AppMachineContext>({
                            gist: (_, e) => e.data
                          }),
                          () =>
                            notificationsActor.notify({
                              message: 'Visualization uploaded!',
                              description:
                                'Copy and paste the URL to share the visualization.',
                              severity: 'success'
                            }),
                          ({ gist }) => updateQuery({ gist: gist!.id })
                        ]
                      }
                    }
                  }
                },
                on: {
                  'GIST.SAVE': [
                    {
                      target: '.idle',
                      cond: (ctx, e) => {
                        try {
                          toMachine(e.code);
                        } catch (e) {
                          console.error(e);
                          notificationsActor.notify({
                            message: 'Failed to upload machine',
                            severity: 'error',
                            description: e.message
                          });
                          return true;
                        }

                        return false;
                      }
                    },
                    {
                      target: '.patching',
                      cond: ctx => {
                        return (
                          !!ctx.gist && ctx.gist.owner.login === ctx.user!.login
                        );
                      }
                    },
                    { target: '.posting' }
                  ]
                }
              }
            },
            on: {
              LOGOUT: {
                target: 'unauthorized',
                actions: assign<AppMachineContext>({
                  token: undefined,
                  user: undefined
                })
              }
            }
          },
          unauthorized: {
            on: {
              LOGIN: 'pendingAuthorization',
              'GIST.SAVE': 'pendingAuthorization'
            }
          },
          pendingAuthorization: {
            entry: () => {
              window.open(
                'https://github.com/login/oauth/authorize?client_id=39c1ec91c4ed507f6e4c&scope=gist',
                'Login with GitHub',
                'width=800,height=600'
              );
            },
            on: {
              CODE: 'authorizing',
              'AUTH.CANCEL': 'unauthorized'
            },
            after: {
              AUTH_TIMEOUT: {
                target: 'unauthorized',
                actions: () => {
                  notificationsActor.notify({
                    message: 'Authorization timed out',
                    severity: 'error'
                  });
                }
              }
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
                { target: 'fetching', cond: ctx => !!ctx.query.gist },
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
                actions: assign<AppMachineContext>({
                  gist: (_, e) => e.data,
                  // @ts-ignore
                  machine: (_, e) => {
                    return e.data.files['machine.js'].content;
                  }
                })
              },
              onError: {
                target: 'idle',
                actions: [
                  assign<AppMachineContext>({
                    gist: undefined
                  }),
                  (ctx, e) => {
                    notificationsActor.notify({
                      message: `Gist not found`,
                      description: `${e.data}`,
                      severity: 'error'
                    });
                  }
                ]
              }
            }
          },
          loaded: {
            entry: (ctx, e) => notificationsActor.notify('Gist loaded!')
          }
        }
      }
    }
  },
  {
    delays: {
      AUTH_TIMEOUT: 15000
    }
  }
);

export const AppContext = createContext<{
  state: State<AppMachineContext>;
  send: (event: any) => void;
  service: Interpreter<AppMachineContext>;
}>({ state: appMachine.initialState, send: () => {}, service: {} as any });

function layoutReducer(state: string, event: string) {
  switch (state) {
    case 'full':
      switch (event) {
        case 'TOGGLE':
          return 'viz';
        default:
          return state;
      }
    case 'viz':
      switch (event) {
        case 'TOGGLE':
          return 'full';
        default:
          return state;
      }
    default:
      return state;
  }
}

interface Props {
  machine: StateMachine<any, any, any>,
}

export const App: React.SFC<Props> = ({ machine }) => {
  const currentMachine = machine ? machine : appMachine;
  const [current, send, service] = useMachine(currentMachine);
  const [layout, dispatchLayout] = useReducer(
    layoutReducer,
    (query.layout as string) || (!!query.embed ? 'viz' : 'full')
  );

  return (
    <StyledApp data-layout={layout} data-embed={query.embed}>
      <Notifications notifier={notificationsActor} />
      <AppContext.Provider value={{ state: current, send, service }}>
        <User />
        <Header />
        {current.matches({ gist: 'fetching' }) ? (
          <Loader />
        ) : (
          <>
            <StateChart
              machine={current.context.machine}
              onSave={code => {
                send('GIST.SAVE', { code });
              }}
            />
            <LayoutButton onClick={() => dispatchLayout('TOGGLE')}>
              {({ full: 'Hide', viz: 'Code' } as Record<string, string>)[
                layout
              ] || 'Show'}
            </LayoutButton>
          </>
        )}
      </AppContext.Provider>
    </StyledApp>
  );
}
