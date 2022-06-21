import "../styles/globals.css";
import { StateProvider } from "../ContextApi/StateProvider";
import { initialState, reducer } from "../ContextApi/reducer";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initalState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
