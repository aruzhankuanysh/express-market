
import Container from "react-bootstrap/Container";
import Header from "@/components/header";
import Advice from "@/components/catalog/menu-advice";

export default function LikeIt() {
  return (
    <>
      <Header />
      <Container id="comp_content">
        <Advice />
      </Container>
    </>
  );
}
