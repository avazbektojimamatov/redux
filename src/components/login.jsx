import {icon} from '../constants'
import {Input} from '../ui'
import { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {signUserFailure, signUserStart, signUserSuccess} from '../slice/auth'
import AuthService from '../service/auth'
import {ValidationError} from './'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const dispatch = useDispatch()
	const {isLoading, loggedIn} = useSelector(state => state.auth)
  const navigate = useNavigate()

  const loginHandler = async e => {
		e.preventDefault()
		dispatch(signUserStart())
		const user = {email, password}
		try {
			const response = await AuthService.userLogin(user)
			dispatch(signUserSuccess(response.user))
      navigate('/')
		} catch (error) {
			dispatch(signUserFailure(error.response.data.errors))
		}
	}

  useEffect(() => {
		if (loggedIn) {
			navigate('/')
		}
	},)

  return (
    <div className='text-center pt-5'>
      <main className="form-signin w-25 m-auto">
        <form>
          <img
            className="mb-4"
            src={icon}
            alt=""
          />
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          <ValidationError/>
          <Input label={'Email address'} type={'email'} value={email} setValue={setEmail}/>
          <Input label={'Password'} type={'password'} value={password} setValue={setPassword}/>
          
          <button className="w-100 btn btn-lg btn-primary mt-3" disabled={isLoading} onClick={loginHandler} type="submit">
            {isLoading ? 'Loading...' : 'Login'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
