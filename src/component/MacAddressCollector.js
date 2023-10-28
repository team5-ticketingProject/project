import React, { useState } from 'react';
import axios from 'axios';

function MacAddressCollector() {
  const [userConsent, setUserConsent] = useState(false);
  const [macAddress, setMacAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleConsentChange = () => {
    setUserConsent(!userConsent);
  };

  const getMacAddress = async () => {
    if (userConsent) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get-mac-address`);
        setMacAddress(response.data.mac);
        setMessage('MAC 주소를 성공적으로 가져왔습니다.');
      } catch (error) {
        setMessage('MAC 주소 가져오기 실패: ' + error.message);
      }
    } else {
      setMessage('사용자 동의를 받아야 MAC 주소를 가져올 수 있습니다.');
    }
  };

  return (
    <div>
      <h1>MAC 주소 수집 예제</h1>
      <label>
        <input type="checkbox" checked={userConsent} onChange={handleConsentChange} />
        사용자 동의
      </label>
      <br />
      <button onClick={getMacAddress}>MAC 주소 가져오기</button>
      <p>MAC 주소: {macAddress}</p>
      <p>{message}</p>
    </div>
  );
}

export default MacAddressCollector;
