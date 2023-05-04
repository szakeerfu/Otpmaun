import React, { useState } from 'react';
import './otp.css'
import background from '../img/person-studying-online.png'

export default function OtpGenerator() {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState(['']);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGenerateOtp = () => {
        // Validation for mobile number
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(mobileNumber)) {
            setErrorMessage('Invalid mobile number');
            return;
        }

        // Call API to generate OTP
        fetch(' https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mobile: mobileNumber })
        })
            .then(response => response.json())
            .then(data => {
                setOtp(data.otp);
                setMobileNumber('');
                setErrorMessage('');
            })
            .catch(error => {
                console.error(error);
                setErrorMessage('Failed to generate OTP');
            });
    };

    return (
        <>
            <div className='main'  >
                <div>
                    <img className='image_main' src={background} alt="" />

                </div>




                <div className='sub_main'>
                    <div className='form'>
                        <h1>
                            <span>SignUp</span>    ForFree</h1> 
                            
                        <label htmlFor="mobile-number">Enter mobile number:</label>
                        <input
                            type="text"
                            placeholder='mobile'
                            id="mobile-number"
                            value={mobileNumber}
                            onChange={event => setMobileNumber(event.target.value)}
                        />
                        <button onClick={handleGenerateOtp}>Generate OTP</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {otp && <p>Your OTP is: {otp}</p>}
                    </div>

                </div>
            </div>
        </>
    );
}

