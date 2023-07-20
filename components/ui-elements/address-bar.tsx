import { setCurrentStock } from "@/store/stockSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { Container, Modal, Button } from "react-bootstrap";

function AdressBar(): JSX.Element {
  const [show, setShow] = useState(false)
  const stocks = useAppSelector(state => state.stock);
  const [adress, setAdress] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const defaultState = {
    center: [46, 72],
    zoom: 5,
  }

  useEffect(() => {
    setAdress(stocks.stocks ? stocks.stocks.map((stock, index) => {
      return (
        { "id": index, "address": stock.StockName }
      )
    }) : []);
  }, [stocks.stocks])

  const handlerChengeCurrentAdress = (id: string) => {
    const index = adress.findIndex(item => item.id === parseInt(id));
    if (index > 0) {
      const stok = stocks.stocks ? stocks.stocks.filter((item) => item.StockName === adress[index].address) : null;
      stok ? dispatch(setCurrentStock(stok[0])) : null;
    }
  }

  const showHandler = () => { 
    setShow(!show)
  } 

  return (
    <>
      <Button
        aria-label="Default select example"
        className="input rounded-4 height-3 "
        id="adress_bar"
        onClick={showHandler}
      >
        {adress.map((addresses, index) => (
          <option key={index} selected={addresses.address === stocks.currentStock?.StockName} value={addresses.id}>{addresses.address}</option>
        ))}
      </Button>
      <Modal centered onHide={() => setShow(false)} show={show}>
          <YMaps >
            <Map defaultState={defaultState}>
                <Placemark geometry={[43.3, 77]}/>
            </Map>
          </YMaps>
      </Modal>
    </>
  );
}

export default AdressBar;

// id="adress_bar" className="input rounded-4 height-3 ms-4"
