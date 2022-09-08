import './index.scss';
import Home from './pages/home';
import AssetCards from './components/assets/assetCards';
import BaseIndex from './pages/baseIndex';
import { SubstrateContextProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Main() {
  return (
    <div className="App">
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
