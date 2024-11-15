import styled from "styled-components";

export default function SendText({ message }) {
  return (
    <Container>
      <Message>{message}</Message>
    </Container>
  );
}

const Container = styled.div`
  width: 320px;
  margin-bottom: 20px;
`;

const Message = styled.p``;
