import { NextPage } from "next";
import Container from "react-bootstrap/Container";
import PersonalArea from "@/components/authorize/personal-area";
import PageContent from "@/components/page-content";

const Index: NextPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Container className="personal_wrapper flex-grow-1">
        <PersonalArea />
      </Container>
    </div>
  );
};

export default Index;
