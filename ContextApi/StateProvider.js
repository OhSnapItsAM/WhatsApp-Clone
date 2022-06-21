import { useContext, createContext, useReducer } from "react";

// INITIALIZE DATALAYER
export const StateContext = createContext();

// CREATE DATALAYER
export const StateProvider = ({ initalState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initalState)}>
    {children}
  </StateContext.Provider>
);

// USE DATALAYER
export const useStateProvider = () => useContext(StateContext);
