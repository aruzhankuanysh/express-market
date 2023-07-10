import Footer from "./footer";
import Header from "./header";
// import MobileCart from "./ui-elements/mobile-cart";

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
