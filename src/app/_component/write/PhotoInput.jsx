import React, { useRef, useState } from "react";
import styled from "styled-components";
import Camera from "@/icons/camera.svg";
import { LabelText } from "@/styles/Texts";

export default function PhotoInput({ photo, setPhoto }) {
  const fileInputRef = useRef(null);
  const [uploadImage, setUploadImage] = useState(null);

  function loadFile(event) {
    const file = event.target.files[0];
    if (file) {
      setPhoto(file);
      setUploadImage(URL.createObjectURL(file));
    }
  }

  function handleClick() {
    fileInputRef.current.click();
  }

  return (
    <form method="post" encType="multipart/form-data">
      <LabelText>인증 사진</LabelText>
      <PhotoPreview onClick={handleClick}>
        {uploadImage ? (
          <PreviewImage src={uploadImage} alt="미리보기 이미지" />
        ) : (
          <Camera />
        )}
      </PhotoPreview>
      <HiddenInput
        type="file"
        accept="image/*"
        onChange={loadFile}
        ref={fileInputRef}
      />
    </form>
  );
}

const PhotoPreview = styled.div`
  margin-top: 15px;
  height: 100px;
  width: 100px;
  background-color: #f6f7f9;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
`;

const HiddenInput = styled.input`
  display: none;
`;
