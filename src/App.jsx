import './index.scss';
import Home from './pages/home';
import WalletCreations from './pages/walletCreation';
import WalletCreation2 from './pages/walletCreation2';
import WalletCreation3 from './pages/walletCreation3';
import Login from './pages/login';
import SignUp from './pages/signUp';
import { SubstrateContextProvider } from "./context";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CommonIndex from './pages/commonIndex';
function Main() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path="/create-wallet/" element={<WalletCreations/>}></Route>
          <Route path="/create-wallet/step2" element={<WalletCreation2/>}></Route>
          <Route path="/create-wallet/step3" element={<WalletCreation3/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
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
