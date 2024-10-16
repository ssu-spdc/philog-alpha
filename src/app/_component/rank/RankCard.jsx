import Image from "next/image";
import clover from "@/icons/Union.png";
import styled from "styled-components";

export default function RankCard(props) {
  const { name, src, alt, count } = props;

  return (
    <RankContainer>
      <Image width={34} height={34} src={src} alt={alt} />
      <Nickname>{name}</Nickname>
      {/* <div style={{ width: "15px" }} /> */}
      <CloverCounterContainer>
        <CloverCount>{count}</CloverCount>
        <Image width={23} height={23} src={clover} alt="clover" />
      </CloverCounterContainer>
    </RankContainer>
  );
}

const RankContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* align-items: ce; */
  justify-content: space-between;
  align-items: center;
  height: 100px;
  width: 100%;
  /* background-color: pink; */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
`;

const ProfileImgContainer = styled.div`
  height: 57px;
  width: 57px;
  background-color: gray;
  border-radius: 15px;
`;

const Nickname = styled.text`
  font-size: 21px;
  font-weight: 600;
  /* align-self: center; */
`;

const CloverCounterContainer = styled.div`
  width: 90px;
  height: 45px;
  background-color: #f1fff4;
  border-radius: 8px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CloverCount = styled.text`
  font-size: 23px;
  color: #7ce58f;
  font-weight: bold;
  margin-right: 6px;
`;
