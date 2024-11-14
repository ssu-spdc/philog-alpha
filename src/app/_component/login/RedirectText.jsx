import styled from "styled-components";
import Link from "next/link";

export default function RedirectText({ type }) {
  const config = {
    login: {
      message: "아직 가입하지 않았다면?",
      actionText: "회원가입 하러가기",
      href: "/register",
    },
    register: {
      message: "이미 가입을 했다면?",
      actionText: "로그인 하러가기",
      href: "/login",
    },
    forgotPassword: {
      message: "비밀번호를 잊으셨나요?",
      actionText: "비밀번호 재설정",
      href: "/reset",
    },
    resetPassword: {
      message: "비밀번호를 변경했다면?",
      actionText: "로그인 하러가기",
      href: "/login",
    },
  };

  // 기본값을 설정하여 존재하지 않는 타입에 대한 안전성을 확보
  const { message, actionText, href } = config[type] || config["login"];

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
  margin-bottom: 3px;
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  color: #a6abaf;
  cursor: pointer;
  text-decoration: none;
`;
