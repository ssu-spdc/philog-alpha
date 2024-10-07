import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 320px;
`;

const MobileDisplay = styled.div`
  /* background-color: cyan; */
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 100%;
`;

const ProfileContainer = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 90px;
  background-color: grey;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export { Main, PageContainer, MobileDisplay, ProfileContainer, FlexContainer };
