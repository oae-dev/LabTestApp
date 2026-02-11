import React, { useState } from 'react'

import '../../css/auth.css'
import Login from './login';
import ToggleTabs from '../../common/ToggleTabs';
import SignUp from './signUp';
import FullScreenLoader from '../../common/FullScreenLoader';

export default function Auth() {
    const [loading, setLoading] = useState<boolean>(false);
    const [mode, setMode] = useState<string>("Login");

    return (
        <div className='loginBackground'>
            <FullScreenLoader visible={loading} />
                <div className='loginBoxWraper'>
                    <div className='side-image-wraper'>
                        <img className='login-side-image' src='data:image/jpeg;base64,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' />
                    </div>
                    <div className='loginBox'>
                        <ToggleTabs
                            segments={['Login', 'Sign Up']}
                            value={mode}
                            onChange={(segment) => setMode(segment)}
                        />
                        {
                            mode === 'Login' ? <Login setLoading={setLoading}/> : <SignUp setLoading={setLoading} />
                        }
                    </div>
                </div>
        </div>
    )
}
