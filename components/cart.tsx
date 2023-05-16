// import { Container, Row, Col } from "react-bootstrap";
// import ProgressBar from "react-bootstrap/ProgressBar";
// import Footer from "@/components/footer";
// import Header from "@/components/header";
// import { useState } from "react";
// import { useRouter } from "next/router";


// function Cart(): JSX.Element {
//   const [cartProduct, setCartProduct] = useState([
//     {
//       img: "./public/img/product_pineapple.png",
//       name: "Груша Конференс",
//       price: 5000,
//       weight: 500,
//       count: 1,
//     },
//     {
//       img: "/img/product_pineapple.png",
//       name: "Груша не Конференс",
//       price: 2300,
//       weight: 500,
//       count: 1,
//     },
//   ]);
//   const discount = 1500;

//   const decrement = (index: number) => {
//     const updatedCartProduct = [...cartProduct];
//     if (updatedCartProduct[index].count > 1) {
//       updatedCartProduct[index].count--;
//     }
//     setCartProduct(updatedCartProduct);
//   };

//   const increment = (index: number) => {
//     const updatedCartProduct = [...cartProduct];
//     updatedCartProduct[index].count++;
//     setCartProduct(updatedCartProduct);
//   };

//   const totalPrice = cartProduct.reduce(
//     (total, product) => total + product.price * product.count,
//     0
//   );

//   const deliveryPercentage = (totalPrice / 10000) * 100;
//   const deliveryDifference = 10000 - totalPrice;
//   const deliveryText =
//     totalPrice >= 10000
//       ? "Бесплатная доставка"
//       : `${deliveryDifference} UZS до бесплатной доставки`;

//   const finalPrice =
//     totalPrice >= 10000 ? totalPrice - discount : totalPrice + 3000 - discount;
    
//     const router = useRouter();
//   return (
//     <>
//       <Header />
//       <Container
//         className="cart_wrapper"
//         style={{ maxWidth: "1256px", height: "100%" }}
//       >
//         <h6
//           style={{ cursor: "pointer" }}
//           onClick={() => router.push(`/`)}
//           className="text-secondary mt-5"
//         >
//           &lt; Вернуться в каталог
//         </h6>
//         <Row>
//           <Col lg="6" className="me-4">
//             <h1 className="my-4" style={{ fontWeight: "700" }}>
//               Корзина
//             </h1>
//             <Container className="delivery_wrapper">
//               <p>Доставка 1000 UZS</p>
//               <h5>{deliveryText}</h5>
//               <ProgressBar
//                 className="delivery_progress mt-4"
//                 variant="danger"
//                 now={deliveryPercentage}
//               />
//             </Container>
//             {cartProduct.map((productItem, index) => (
//               <Container>
//                 <Row>
//                   <Col>
//                     {productItem.img}
//                   </Col>
//                 </Row>
//               </Container>
//             ))}
//           </Col>
//           <Col lg="4" className="ms-5 ">
//             <Container>
//               <h2>Ваш заказ</h2>
//               <p className="pricing">Доставка 25-35 мин</p>
//               <Row className="mb-3">
//                 <Col style={{ fontWeight: "600" }}>Товары</Col>
//                 <Col style={{ textAlign: "right", fontWeight: "600" }}>
//                   {totalPrice} UZS
//                 </Col>
//               </Row>
//               <Row className="mb-3">
//                 <Col style={{ fontWeight: "600" }}>Скидки</Col>
//                 <Col
//                   className="text-danger"
//                   style={{ textAlign: "right", fontWeight: "600" }}
//                 >
//                   -{discount} UZS
//                 </Col>
//               </Row>
//               <Row className="mb-0">
//                 <Col style={{ fontWeight: "600" }}>Стоимость доставки</Col>
//                 <Col style={{ textAlign: "right", fontWeight: "600" }}>
//                   3000 UZS
//                 </Col>
//               </Row>
//               <p className="pricing">{deliveryText}</p>
//               <Row>
//                 <Col style={{ fontWeight: "600" }}>
//                   <h5>К оплате</h5>
//                 </Col>
//                 <Col style={{ textAlign: "right", fontWeight: "600" }}>
//                   {finalPrice} UZS
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// }

// export default Cart;
