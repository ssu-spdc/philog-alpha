import styled from "styled-components";

const Main = styled.body`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0px;
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

export { Main, MobileDisplay, ProfileContainer };
