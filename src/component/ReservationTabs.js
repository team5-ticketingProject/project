import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import '../css/ReservationTabs.css';
import { fetchUserInfo } from "./fetchLoginUser";

const ReservationTabs = (props) => {
  const [currentTab, clickTab] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState('');
  const [ratingValue, setRatingValue] = useState(5);
  const [isAlreadyReviewed, setIsAlreadyReviewed] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/getReview`)
      .then((response) => {
        const filteredReviews = response.data.filter((review) => review.show_name === props.show_name);
        setReviews(filteredReviews);
        
        const userId = window.sessionStorage.getItem("id");
        const isReviewed = filteredReviews.some((review) => review.ID === userId);
        setIsAlreadyReviewed(isReviewed);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreateReview = () => {
    const userId = window.sessionStorage.getItem("id");
    const isReviewed = reviews.some((review) => review.ID === userId);
    if (isReviewed) {
      alert("이미 후기가 작성되었습니다. 작성된 내용은 마이페이지 나의 후기에서 확인이 가능합니다.");

      return;
    }

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/addReview`, {
        user: userId,
        show_name: props.show_name,
        content: reviewInput,
        rating: ratingValue,
      })
      .then((response) => {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/getReview`)
          .then((response) => {
            const filteredReviews = response.data.filter((review) => review.show_name === props.show_name);
            setReviews(filteredReviews);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const tabArr = [
    {
      name: '예매안내',
      content: (
        <p>
          ◈ 예매자는 본 안내페이지의 모든 내용을 숙지 및 동의한 것으로 간주합니다.
          <br />
          티켓 수령/공연 관람 안내 미숙지로 인한 책임은 관람자 본인에게 있으며, 이에따른 예매 티켓의 취소/변경/환불은 불가 하오니 각별히 유의하시기 바랍니다.
          <br />
          <br />
          ■ 티켓 수령 - 현장수령
          <br />
          행사 당일 공연 시작 시간 1시간 전 ~ 30분 전까지 행사장 매표소에서 티켓을 수령하실 수 있습니다.
          <br />
          현장 매표소에서 예매 완료 SMS 또는 예매번호 및 예매자 정보 확인 후 티켓을 수령할 수 있습니다.
          <br />
          기획사 정책 또는 행사일에 따라 현장 수령 방법의 선택이 제한될 수 있습니다.​
          <br />
          <br />
          ◈암표 부정거래는 (일명 플미티켓) 공연/전시/스포츠 문화를 해치는 범죄행위입니다.
          <br />
          부정거래 관리 시스템을 통한 모니터링 과정에서 비정상적인 프로세스의 예매내역(매크로, 개인 간 거래 등) 적발 시
          예매취소/회원정지/회원자격 상실 등의 적절한 조치 및 법적 제재를 가할 수 있습니다.
          <br />
          <br />
          * 사기의 위험에서 보호받지 못합니다.
          <br />
          개인 간의 거래로 인한 피해에 대한 책임은 전적으로 거래 당사자에게 있으며, 피해 발생 시 주최/주관/당사에서 책임지지 않습니다.
          <br />
          <br />
          * 개인 간 판매/구매 시 공유된 개인 신상정보가 외부로 유출될 수 있습니다.
          <br />
          티켓을 타인에게 재 판매하거나 양도받는 과정에서 개인 신상정보를 공유할 경우, 판매자와 구매자 모두 피해를 입을 수 있습니다.
        </p>
      ),
    },
    {
      name: '관람후기',
      content: (
        <>
        <Rating
              name="simple-controlled"
              Value={ratingValue}
              onChange={(event, newRatingValue) => {
                setRatingValue(newRatingValue);
              }}
            />
          <TextField
            id="outlined-multiline-static"
            fullWidth
            multiline
            rows={4}
            placeholder="관람평을 작성해주세요."
            value={reviewInput}
            onChange={(e) => setReviewInput(e.target.value)}
          />
          <div className="text_but">
            <Button variant="contained" color="secondary" disableElevation onClick={handleCreateReview}>
              등록
            </Button>
          </div>
          <div>
            {reviews.map((review) => (
              <div key={review.id}>
                <hr/>
                <Rating name="read-only" value={review.rating} readOnly />
                <p className='review_content'>{review.content}</p>
                <p className='review_down'>{review.ID}&nbsp;&nbsp;{review.date.substring(0, 10)}</p>
              </div>  
            ))}
          </div>
        </>
      ),
    },
    {
      name: '관람안내',
      content: (
        <p>
          ■ 교통 및 주차
          <br />
          공연장 주변의 야구, 축구, 기타이벤트 등으로 인해 일대의 교통이 매우 혼잡하오니 가급적 대중교통의 이용을 권장합니다.
          <br />
          <br />
          ■ 공연 관람
          <br />
          원활한 공연 진행을 위해 공연 시작 후에는 입장이 제한됩니다. 공연이 시작된 후에는 공연의 흐름에 따라 입장이 지연되거나 제한될 수 있으며,
          이 경우 예매하신 본인 좌석이 아닌 지연석에 착석하여야 합니다. 또한 이에 따른 환불 및 좌석 변경은 불가합니다.
          <br />
          <br />
          ■ 공연 시점의 정부의 공연장 방역 수칙에 따라 운영이 변동 될 수 있습니다.
          <br />
          관람 당일 꼭 확인해 주십시오.
          <br />
          방역 수칙에 따른 변경이 있을 경우, 예매자 정보입력 시 기재된 연락처로 문자 안내 드립니다. 잘못된 연락처 기입으로 인한 책임은 예매자 본인에게 있으니 올바른 기입 바랍니다.
        </p>
      ),
    },
  ];

  const selectMenuHandler = (index) => {
    clickTab(index);
  };

  return (
    <>
      <div>
        <ul className="tab_menu">
          {tabArr.map((el, index) => (
            <li
              key={index}
              className={index === currentTab ? "submenu focused" : "submenu"}
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <div className="tab_content">
          <p>{tabArr[currentTab].content}</p>
        </div>
      </div>
    </>
  );
};

export default ReservationTabs;