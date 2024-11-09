import Navbar from '@/components/navbar/Navbar';

import './globals.css';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="main-layout">{children}</main>
        <footer className="main-footer">
          <p>© 2024 plankton-hackathon: Team Lucky 7</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
