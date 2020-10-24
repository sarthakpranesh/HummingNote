import React, {useReducer} from 'react';

let context: any;
export default (reducer: any, actions: any, initialState: any) => {
  context = React.createContext(initialState);

  const Provider = ({children}: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: any = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return <context.Provider value={{state, ...boundActions}}>
        {children}
      </Context.Provider>
  };

  return {Context, Provider};
};
