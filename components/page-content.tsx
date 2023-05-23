import Footer from "./footer";
import Header from "./header";

function PageContent({children}: any): JSX.Element {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default PageContent;
