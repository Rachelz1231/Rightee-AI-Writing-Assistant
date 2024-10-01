import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Container
      component="footer"
      sx={{
        height: "60px",
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography color="text.primary" gutterBottom>
        <Link href="/" color="text.primary">
          Rachel's Personal Website
        </Link>
      </Typography>
    </Container>
  );
};

export default Footer;
