import styled from "styled-components";

const TopTitle = styled.text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 15px;

  .hilight {
    color: #7ce28d;
  }

  .lighter {
    font-weight: lighter;
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
  margin-top: 20px;
  margin-bottom: 20px;
  width: 290px;
  /* margin-left: 10px; */
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

const LabelText = styled.text`
  font-size: 20px;
  font-weight: 500;
  color: #191b1c;
`;

export {
  TopTitle,
  TopText,
  SectionTitle,
  SectionTitleContainer,
  CardProfileText,
  CardInfo,
  CountText,
  LabelText,
};
