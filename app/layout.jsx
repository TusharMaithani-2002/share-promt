import "@styles/globals.css";
import { Children } from "react";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadat = {
  title: "Promtopia",
  description: "Discover and Share AI promts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="eng">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="main">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
