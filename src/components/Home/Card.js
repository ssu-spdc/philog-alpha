import styled from "styled-components";
import { CardInfo, CardProfileText } from "@/styles/Texts";
import { ProfileContainer } from "@/styles/Containers";
import { CloverButton } from "@/styles/Buttons";

export default function Card() {
  return (
    <CardContainer>
      <CardTopContainer>
        <CardTopLeftContainer>
          <ProfileContainer></ProfileContainer>
          <CardProfileText>
            박요셉 <CardProfileText className="time">- 1시간</CardProfileText>
          </CardProfileText>
        </CardTopLeftContainer>
        <CloverButton>
          <CardProfileText>
            <CardProfileText className="button">용기</CardProfileText>
          </CardProfileText>
        </CloverButton>
      </CardTopContainer>
      <CardImageContainer />
      <CardInfoContainer>
        <CardInfo>
          안녕하세요. 제 이름은 박요셉인데요. 무슨 말을 쓸까 고민을 하면서 아무
          생각없이 적고 있는데요. 그래서 뭐라고 적는 게 좋을까요? 근데
        </CardInfo>
      </CardInfoContainer>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 450px;
  width: 290px;
  /* background-color: pink; */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const CardTopLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 120px;
  height: 35px;
`;

const CardTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardImageContainer = styled.div`
  background-color: grey;
  width: 100%;
  height: 280px;
  border-radius: 10px;
`;

const CardInfoContainer = styled.div`
  /* background-color: grey; */
  width: 100%;
  height: 120px;
  /* display: inline-block; */
  line-height: 1.2;
`;
