import PhilIcon from "@/icons/phil_icon.svg";
import styled from "styled-components";

export default function Icon() {
  return (
    <IconContainer>
      <PhilIconStyled viewBox="-20 -10 360 350" />
    </IconContainer>
  );
}

const PhilIconStyled = styled(PhilIcon)`
  width: 70px;
  height: 70px;
  /* margin-right: 15px; */
`;

const IconContainer = styled.div`
  height: 115px;
  width: 115px;
  background-color: #f1fff4;
  border-radius: 90px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
