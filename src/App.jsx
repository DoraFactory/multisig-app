import './index.scss';
import Home from './pages/home';
import AssetCards from './components/assets/assetCards';
import BaseIndex from './pages/baseIndex';
import Owners from './pages/owners';
import WalletCreations from './pages/walletCreation';
import WalletCreation2 from './pages/walletCreation2';
import WalletCreation3 from './pages/walletCreation3';
import { SubstrateContextProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Transactions from './pages/transactions';

function Main() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/create-wallet/" element={<WalletCreations/>}></Route>
          <Route path="/create-wallet/step2" element={<WalletCreation2/>}></Route>
          <Route path="/create-wallet/step3" element={<WalletCreation3/>}></Route>
          <Route path="/assets" element={<BaseIndex/>}></Route>
          <Route path="/transactions" element={<Transactions/>}></Route>
          <Route path="/owners" element={<Owners/>}></Route>
        </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main/>
    </SubstrateContextProvider>
  )
};
