
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* <ChatDesign /> */}
      {children}
      {/* <ConversationLayout>{children}</ConversationLayout> */}
    </>
  );
};

export default Layout;
