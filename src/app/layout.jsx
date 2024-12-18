import StyledComponentsRegistry from "../../lib/registry";
import TopNav from "@/components/TopNav";
import "./global.css";

export const metadata = {
  title: "Philog",
  description: "Generated by create next app",
  icons: {
    icon: "/Union.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <TopNav />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
