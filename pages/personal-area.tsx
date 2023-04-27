import { NextPage } from 'next';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '@/components/header';
import PersonalArea from '@/components/authorize/personal-area';

const Index: NextPage = () => {
    return (
        <>
            <Header/>
            <Container>
                <PersonalArea/>
            </Container>
        </>
    )
}

export default Index;