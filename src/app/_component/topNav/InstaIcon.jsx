import InstaAppIcon from "@/icons/instaAppIcon.png";
import Image from "next/image";

const InstaIcon = () => {
  return (
    <a
      href="https://www.instagram.com/ssu_philog/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image width={24} height={24} src={InstaAppIcon} alt="Instagram" />
    </a>
  );
};

export default InstaIcon;
