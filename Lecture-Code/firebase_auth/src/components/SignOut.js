import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';

const SignOutButton = () => {
    return (
        <button type="button" onClick={doSignOut}>
            SignOut
        </button>
    );
};
export default SignOutButton;
