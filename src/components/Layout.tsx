import * as React from "react";

import Typography from "@mui/material/Typography";

import { AppBar, Container, Toolbar } from "@mui/material";

function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/bakeries"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Bakeries
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
function Footer() {
  return (
    <div className="bg-teal-500 text-center text-white">
      Copyright 2023 Michael Altmann
    </div>
  );
}
export default function Layout({ children }: any) {
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
