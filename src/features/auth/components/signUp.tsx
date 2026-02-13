import { useState } from 'react'
import DynamicButton from '../../../common/buttons/dynamicButton'
import { RiLockPasswordLine } from 'react-icons/ri'
import InputFieldWithEndLogo from '../../../common/inputs/inputFieldWithEndLogo'
import { IoHomeOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import googleLogo from '../../../assets/googleLogo.png';
import { onGooglePress, signUpTapped } from '../auth.utils';

export default function SignUp({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const onSignUpTapped = async () => {
        const result = await signUpTapped({ email, password, setLoading });
        if (result.success) {
            navigate('/home', { replace: true });
        } else {
            alert(result.message)
        }
    }
    const googleLogin = async () => {
        const result = await onGooglePress();
        if (result.success) {
            navigate('/labForm', { replace: true });
        } else {
            alert(result.message)
        }
    }
    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); onSignUpTapped(); }} className='formWrapper'>
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


                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    <DynamicButton color='white' backgroundColor='#2195bc' horzontalPadding={20} type='submit'>Sign Up</DynamicButton>
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
