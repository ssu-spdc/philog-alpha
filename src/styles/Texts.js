import styled from "styled-components";

const TopTitle = styled.text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;

  .hilight {
    color: #7ce28d;
  }
`;

const TopText = styled.text`
  font-size: 18px;
  margin-bottom: 15px;

  .hilight {
    font-weight: bold;
  }
`;

const SectionTitle = styled.text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;

  .hilight {
    color: #7ce28d;
  }

  .lighter {
    font-weight: lighter;
  }
`;
const SectionTitleContainer = styled.div`
  /* display: flex; */
  /* flex: 1; */
  /* background-color: blue; */
  /* justify-content: center; */
  margin-top: 20px;
  margin-bottom: 20px;
  width: 320px;
`;

const CardProfileText = styled.text`
  font-size: 14px;
  font-weight: bold;

  .time {
    font-weight: normal;
  }

  .button {
    color: #7ce28d;
  }
`;

const CardInfo = styled.text`
  font-size: 14px;
  font-weight: lighter;
  word-spacing: -0.3px;
  /* line-height: 50%; */
`;

const CountText = styled.text`
  text-align: center;
  font-size: 35px;
  font-weight: bold;

  .category {
    font-size: 20px;
    font-weight: lighter;
  }
`;

export {
  TopTitle,
  TopText,
  SectionTitle,
  SectionTitleContainer,
  CardProfileText,
  CardInfo,
  CountText
};
