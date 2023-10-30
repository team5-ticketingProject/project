import React, { useState } from 'react';
import axios from 'axios';

function MacAddressCollector() {
  const [userConsent, setUserConsent] = useState(false);
  const [macAddress, setMacAddress] = useState('');
  const [message, setMessage] = useState('');
  const [showConsentModal, setShowConsentModal] = useState(false);

  const handleConsentChange = () => {
    setUserConsent(!userConsent);
    setShowConsentModal(false); // 사용자가 동의하면 모달을 닫음
  };

  const getMacAddress = async () => {
    if (userConsent) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/getmacaddress`,{
          params: { userConsent: userConsent}
        });
        setMacAddress(response.data.mac);
        setMessage('MAC 주소를 성공적으로 가져왔습니다.');
      } catch (error) {
        setMessage('MAC 주소 가져오기 실패: 서버 오류가 발생했습니다.');
      }
    } else {
      // 사용자 동의를 받지 않은 경우 모달을 표시
      setShowConsentModal(true);
    }
  };

  return (
    <div className="mac-address-collector">
      <h1>MAC 주소 수집 예제</h1>
      <p>MAC 주소를 수집하려면 아래의 동의 체크박스를 선택하세요.</p>
      <label>
        <input type="checkbox" checked={userConsent} onChange={handleConsentChange} />
        동의합니다
      </label>
      <button onClick={getMacAddress}>MAC 주소 가져오기</button>
      <p>MAC 주소: {macAddress || '아직 수집되지 않았습니다.'}</p>
      <p>{message}</p>

      
      {showConsentModal && (
        <div className="consent-modal">
          <h2>동의 요청</h2>
          <p>MAC 주소를 수집하려면 동의해야 합니다. 동의하시겠습니까?</p>
          <button onClick={handleConsentChange}>동의</button>
        </div>
      )}
    </div>
  );
}

export default MacAddressCollector;
