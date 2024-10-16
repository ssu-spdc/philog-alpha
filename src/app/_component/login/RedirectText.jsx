import styled from "styled-components";
import Link from "next/link";

export default function RedirectText({ type }) {
  const isLogin = type === "login";
  const message = isLogin ? "아직 가입하지 않았다면?" : "이미 가입을 했다면?";
  const actionText = isLogin ? "회원가입 하러가기" : "로그인 하러가기";
  const href = isLogin ? "/register" : "/login";

  return (
    <StyledMessage>
      <Message>{message}</Message>
      <StyledLink href={href}>{actionText}</StyledLink>
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
