import "./styles/global.css";

export const metadata = {
  title: "Título da tua app",
  description: "Descrição da tua app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
