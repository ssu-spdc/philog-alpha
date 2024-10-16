import styled from "styled-components";

export default function LoginButton({ text }) {
  return (
    <>
      <BottomBtn>{text}</BottomBtn>
    </>
  );
}

const BottomBtn = styled.button`
  width: 320px;
  height: 56px;
  background-color: #7ce28d;
  color: white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
  margin: 30px 0;
`;
