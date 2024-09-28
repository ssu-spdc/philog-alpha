import PhilIcon from "@/icons/phil_icon2.svg";
import styled from "styled-components";

export default function Icon2() {
  return <PhilIconStyled viewBox="-10 -10 450 410" />;
}

const PhilIconStyled = styled(PhilIcon)`
  width: 60px;
  height: 60px;
  margin-right: 15px;
`;
