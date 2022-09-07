import './index.scss';
import Home from './pages/home';
import BaseIndex from './pages/baseIndex';
import Owners from './pages/owners';
import { SubstrateContextProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
    <BrowserRouter>
    <SubstrateContextProvider>
      <Routes>
        <Route path="/assets" element={<Main/>}></Route>
        <Route path="/owners" element={<Owners/>}></Route>
      </Routes>
    </SubstrateContextProvider>
    </BrowserRouter>
  )
};
