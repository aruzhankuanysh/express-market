import { NextPage } from "next";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "@/components/header";
import PersonalArea from "@/components/authorize/personal-area";
import Footer from "@/components/footer";

const Index: NextPage = () => {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Header />
        <Container className="personal_wrapper flex-grow-1">
          <PersonalArea />
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Index;
