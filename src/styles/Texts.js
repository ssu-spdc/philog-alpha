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
`

const CardInfo = styled.text`
  font-size: 14px;
  font-weight: lighter;
  word-spacing: -1px;
  /* line-height: 50%; */
`;


const FormText = styled.text`
  font-size: 19px;
  font-weight: bold;
`;

const FormTextContainer = styled.div`
  display: flex;
  flex: 1;
  /* background-color: blue; */
  justify-content: center;
`;

const ChecklistText = styled.text`
  font-size: 17px;
  font-weight: bold;
`;



const NoticeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 250px;

  .red_text {
    /* white-space: pre-line; */
    color: #ff0000;
  }
`;

export {
  TopTitle,
  TopText,
  SectionTitle,
  CardProfileText,
  FormText,
  FormTextContainer,
  ChecklistText,
  CardInfo,
  NoticeTextContainer,
};
