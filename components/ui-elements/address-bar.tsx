import { setCurrentStock } from "@/store/stockSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

function AdressBar(): JSX.Element {
  const stocks = useAppSelector(state => state.stock);
  const [adress, setAdress] = useState<any[]>([]);
  const dispatch = useAppDispatch();

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

  return (
    <>
      <Form.Select
        aria-label="Default select example"
        className="input rounded-4 height-3 ms-4"
        id="adress_bar"
        onChange={(e) => { handlerChengeCurrentAdress(e.target.value) }}
      >
        {adress.map((addresses) => (
          <option selected={addresses.address === stocks.currentStock?.StockName} value={addresses.id}>{addresses.address}</option>
        ))}
      </Form.Select>
    </>
  );
}

export default AdressBar;

// id="adress_bar" className="input rounded-4 height-3 ms-4"
