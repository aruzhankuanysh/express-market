
import Container from "react-bootstrap/Container";
import Advice from "@/components/catalog/menu-advice";
import PageContent from "@/components/page-content";

export default function LikeIt() {
  return (
    <PageContent>
      <Container id="comp_content">
        <Advice />
      </Container>
    </PageContent>
  );
}
