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
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
