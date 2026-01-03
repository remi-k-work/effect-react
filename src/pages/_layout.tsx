import "../styles.css";

import type { ReactNode } from "react";

type RootLayoutProps = { children: ReactNode };

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <head></head>
      <body>{children}</body>
    </html>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
