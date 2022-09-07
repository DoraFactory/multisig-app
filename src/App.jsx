import './index.scss';
import Home from './pages/home';
import BaseIndex from './pages/baseIndex';
import { SubstrateContextProvider } from "./context";

function Main() {
  return (
    <div className="App">
      {/* <Home></Home> */}
      <BaseIndex></BaseIndex>
    </div>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main/>
    </SubstrateContextProvider>
  )
};
