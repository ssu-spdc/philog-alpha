import styled from "styled-components";
import Link from "next/link";

export default function RedirectText({ type }) {
  return (
    <StyledMessage>
      <Message>비밀번호를 변경했다면?</Message>
      <StyledLink href="/login">로그인 하러가기</StyledLink>
    </StyledMessage>
  );
}

const StyledMessage = styled.div`
  font-size: 16px;
  color: #a6abaf;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Message = styled.div`
  margin-bottom: 10px;
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  color: #a6abaf;
  cursor: pointer;
  text-decoration: none;
`;
