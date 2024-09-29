import PhilIcon from "@/icons/phil_icon.svg";
import styled from "styled-components";

export default function Icon() {
  return <PhilIconStyled viewBox="-20 -10 360 350" />;
}

const PhilIconStyled = styled(PhilIcon)`
  width: 70px;
  height: 70px;
  /* margin-right: 15px; */
`;
