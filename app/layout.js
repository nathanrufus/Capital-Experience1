import "./globals.css";


export const metadata = {
  title: "Complete Experience",
  description: "Have a complete experince",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
