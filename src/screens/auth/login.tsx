import { useState } from 'react'
import DynamicButton from '../../common/dynamicButton';
import { Link, useNavigate } from 'react-router';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IoHomeOutline } from 'react-icons/io5';
import InputFieldWithEndLogo from '../../common/inputFieldWithEndLogo';
import { onGooglePress, onLoginTapped } from './functionality/auth';
import googleLogo from '../../assets/googleLogo.png';
import FullScreenLoader from '../../common/FullScreenLoader';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const loginTapped = async () => {
        const result = await onLoginTapped({ email, password, setLoading });
        if (result.success) {
            navigate('/home', { replace: true });
        } else {
            alert(result.message);
        }
    }

    const googleLogin = async () => {
        const result = await onGooglePress();
        if (result.success) {
            navigate('/home', { replace: true });
        } else {
            alert(result.message)
        }
    }

    return (
        <>
        <FullScreenLoader visible={loading} />
            <form onSubmit={(e) => { e.preventDefault(); loginTapped(); }} className='formWrapper'>
                <InputFieldWithEndLogo
                    type='text'
                    title='Email'
                    placeholder='Email'
                    value={email}
                    setValue={setEmail}
                    icon={<IoHomeOutline color='gray' />}
                />

                <InputFieldWithEndLogo
                    type='password'
                    title='Password'
                    placeholder='Password'
                    value={password}
                    setValue={setPassword}
                    icon={<RiLockPasswordLine color='gray' />} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <input type="checkbox" />
                        <span>Remember me</span>
                    </div>
                    <Link to=''>Forgot password?</Link>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <DynamicButton color='black' backgroundColor='white' horzontalPadding={20} type='submit'>Login</DynamicButton>
                </div>

                <DynamicButton color='white'
                    type='button' backgroundColor='transparent' onClick={googleLogin}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                        <img src={googleLogo} alt='google' />
                        <span style={{ color: 'black' }}>Continue with Google</span>
                    </div>
                </DynamicButton>

            </form>
        </>
    )
}
