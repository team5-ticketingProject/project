import axios from "axios";

export async function fetchUserInfo(userId) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/LoginInfo`, {
      params: {
        id: userId,
      }
    });
    return response.data[0];
  } catch (error) {
    console.error("사용자 정보를 가져오는 중 오류 발생:", error);
    return null;
  };
};