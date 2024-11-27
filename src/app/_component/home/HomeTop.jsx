import styled from "styled-components";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

import { TopText, TopTitle } from "@/styles/Texts";
import Icon2 from "./Icon2";

export default function HomeTop() {
  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  return (
    <HomeTopContainer
      onClick={() => {
        if (user) {
          router.push(`/write`);
        } else {
          router.push(`/login`);
        }
      }}
    >
      <Spacer />
      <RowContainer>
        <TopTitle>
          <span className="hilight">필로그</span>를 참여해주셔서 <br />
          감사합니다!
        </TopTitle>
        <Icon2 />
      </RowContainer>
      <TopText>
        <span className="hilight">11월 29일</span>을 마지막으로 이후로 이벤트가
        종료됐습니다.
      </TopText>
      <Spacer />
    </HomeTopContainer>
  );
}

const HomeTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 10%;
  padding-right: 10%;
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Spacer = styled.div`
  height: 20px;
`;
