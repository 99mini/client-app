const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <a href="/">Home</a> | <a href="/about">About</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2024 My App</p>
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
