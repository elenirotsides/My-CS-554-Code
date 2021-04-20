import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [user, setUser] = useState({});
    const [toggle, setToggle] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const formSubmit = async (e) => {
        e.preventDefault();
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        const user = {
            firstName,
            lastName,
        };
        // interacting with lab from 546:
        const { data } = await axios.post('http://localhost:3008/users', user, { headers: { Accept: 'application/json' } });
        console.log(data);
        setUser(data);
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        // setUser(user);
    };
    return (
        <div>
            <form id="simple-form" onSubmit={formSubmit}>
                <label>
                    First Name:
                    <input id="firstName" type="text" placeholder="Enter your first name" />
                </label>
                <br />
                <label>
                    Last Name:
                    <input id="lastName" type="text" placeholder="Enter your last name" />
                </label>
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p>
                {user.firstName} {user.lastName}
            </p>
            <button onClick={() => setToggle(!toggle)}>{toggle === true ? 'On' : 'Off'}</button>
            <br />
            <input type="text" onChange={(e) => setInputVal(e.target.value)} />
            <p>The input state is: {inputVal}</p>
        </div>
    );
};

export default Form;
