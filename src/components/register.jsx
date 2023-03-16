import {icon} from '../constants'
import {Input} from '../ui'
import { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {signUserFailure, signUserStart, signUserSuccess} from '../slice/auth'
import AuthService from '../service/auth';
import {ValidationError} from './'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
	const {isLoading} = useSelector(state => state.auth)

  const registerHandler  = async e => {
		e.preventDefault()
		dispatch(signUserStart())
    const user = {username: name, email, password}
    try{
      const response = await AuthService.userRegister(user);
      dispatch(signUserSuccess(response.user))
    }catch(error){
      dispatch(signUserFailure(error.response.data.errors))
    }
	}

  return (  
    <div className='text-center pt-5'>
      <main className="form-signin w-25 m-auto">
        <form>
          <img
            className="mb-4"
            src={icon}
            alt=""
          />
          <h1 className="h3 mb-3 fw-normal">Please register</h1>
          <ValidationError/>
          <Input label={'Username'} type={'text'} value={name} setValue={setName}/>
          <Input label={'Email address'} type={'email'} value={email} setValue={setMail}/>
          <Input label={'Password'} type={'password'} value={password} setValue={setPassword}/>
          
          <button className="w-100 btn btn-lg btn-primary mt-3" disabled={isLoading} onClick={registerHandler} type="submit">
            {isLoading ? 'loading...' : 'Register'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Register;