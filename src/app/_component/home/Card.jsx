import styled from "styled-components";
import { CardInfo, CardProfileText } from "@/styles/Texts";
import { CloverButton } from "@/styles/Buttons";
import Image from "next/image";
import { deletePost } from "../../../../lib/firebaseFunctions";

export default function Card({ post, onDelete, currentUser }) {
  const {
    userDisplayName,
    createdAt,
    cloverType,
    description,
    photoURL,
    id,
    userId,
  } = post;

  // 시간 계산을 위한 함수 (1시간 전, 1일 전 등)
  const timeAgo = (time) => {
    const now = new Date();
    // const postTime = new Date(time);
    const postTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
    const diffInMinutes = Math.floor((now - postTime) / 60000);

    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}시간 전`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}일 전`;
    }
  };

  const handleDelete = async () => {
    await deletePost(id, photoURL);
    onDelete(id);
  };

  const changeCloverName = (cloverType) => {
    switch (cloverType) {
      case "temperance":
        return "절제";
        break;
      case "wisdom":
        return "지혜";
        break;
      case "courage":
        return "용기";
        break;
      case "money":
        return "돈";
        break;
      default:
        break;
    }
  };

  const isOwn = currentUser?.uid === userId;

  return (
    <CardContainer $isOwn={isOwn}>
      <CardTopContainer>
        <CardTopLeftContainer>
          <div style={{ width: "5px" }} />
          <CardProfileText>
            {userDisplayName}{" "}
            <CardProfileText className="time">
              • {timeAgo(createdAt)}
            </CardProfileText>
          </CardProfileText>
        </CardTopLeftContainer>
        <CloverButton>
          <CardProfileText>
            <CardProfileText className="button">
              {changeCloverName(cloverType)}
            </CardProfileText>
          </CardProfileText>
        </CloverButton>
      </CardTopContainer>
      <CardImageContainer>
        <Image
          priority={true}
          src={photoURL}
          alt="post"
          width={260} // 적절한 width 값 추가
          height={280} // 적절한 height 값 추가
          style={{ objectFit: "cover", borderRadius: "10px" }} // 이미지를 적절하게 맞춤
          // layout="responsive" // 자동으로 비율에 맞춰 조정
        />
      </CardImageContainer>
      <CardInfoContainer>
        <CardInfo>{description}</CardInfo>
      </CardInfoContainer>
      {isOwn && ( // 현재 유저가 작성자일 때만 삭제 버튼 표시
        <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
      )}{" "}
    </CardContainer>
  );
}

const CardContainer = styled.div`
  height: ${({ $isOwn }) => ($isOwn ? "490px" : "450px")};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 290px;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
`;

const CardTopLeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;

  /* width: 120px; */
  height: 35px;
`;

const CardTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardImageContainer = styled.div`
  background-color: grey;
  width: 260px;
  height: 280px;
  border-radius: 10px;
`;

const CardInfoContainer = styled.div`
  width: 100%;
  height: 80px;
`;

// 스타일 추가
const DeleteButton = styled.button`
  font-weight: bold;
  background-color: #e0e5ea;
  color: #a6abaf;
  border: none;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 3px;
  align-self: flex-end;
`;
