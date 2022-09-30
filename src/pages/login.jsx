// import SideMenu from '../components/sideMenu'
// import LoginCard from '../components/login/login'
import LoginUserCard from '../components/login/login_choose_user'
import '../styles/wallet.scss'


function Login () {
  return (
    <div>
        <h2>Welcome to Substrate Multisig</h2>
        <LoginUserCard></LoginUserCard>
    </div>
  )
}

export default Login
