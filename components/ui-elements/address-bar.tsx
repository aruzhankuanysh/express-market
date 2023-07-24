import { useEffect, useMemo, useState } from "react";
import {
  YMaps,
  Map,
  Placemark,
  Polygon,
  ZoomControl,
} from "@pbe/react-yandex-maps";
import { Modal, Button } from "react-bootstrap";

import zons from "../../data/zone-config.json";
import { useDispatch } from "react-redux";
import { DeliveredAdres } from "@/specs/gosuTypes";
import { setDeliveredAddress } from "@/store/stockSlice";
import { useAppSelector } from "@/store/store";

interface Coordinate {
  lat: number;
  lng: number;
}

function AdressBar(): JSX.Element {
  const coordinatesAndZone = useAppSelector((state) => state.stock.deliveredAddress);

  const [show, setShow] = useState(false);
  const [city, setCity] = useState<any>(coordinatesAndZone?.city);
  const [street, setStreet] = useState<any>(coordinatesAndZone?.street);
  const [house, setHouse] = useState<any>(coordinatesAndZone?.house);
  const [cord, setCord] = useState<any>(coordinatesAndZone?.cords ?? [41.311, 69.24]);
  const [mapCenter, setMapCenter] = useState(coordinatesAndZone?.cords ?? [41.311, 69.24]);
  const [insidePolygon, setInsidePolygon] = useState(false);
  const [adress, setAdress] = useState("");

  const dispatch = useDispatch();
  
  function isPointInsidePolygon(point: Coordinate, polygon: Coordinate[]): boolean {
    const n = polygon.length;
    let isInside = false;
  
    const { lat: x, lng: y } = point;
  
    let p1x = polygon[0].lat;
    let p1y = polygon[0].lng;
  
    for (let i = 1; i <= n; i++) {
      const p2x = polygon[i % n].lat;
      const p2y = polygon[i % n].lng;
  
      if (y > Math.min(p1y, p2y)) {
        if (y <= Math.max(p1y, p2y)) {
          if (x <= Math.max(p1x, p2x)) {
            if (p1y !== p2y) {
              const xinters = ((y - p1y) * (p2x - p1x)) / (p2y - p1y) + p1x;
              if (x <= xinters) {
                isInside = !isInside;
              }
            }
          }
        }
      }
  
      p1x = p2x;
      p1y = p2y;
    }
  
    return isInside;
  }

  // Получение адреса пользователя от геолокации
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longetude = position.coords.longitude;
      setCord([latitude, longetude]);
    });
  }, []);

  useEffect(() => {
    if (cord.length > 1) {

      setInsidePolygon(false);

      const reverseGeocode = async () => {
        try {
          const lang = `ru`;
          // Запрос к Yandex Geocoder API для получения адреса по координатам
          const response = await fetch(
            `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=89f71fc5-78a5-4747-ad3a-3e9659826490&geocode=${cord[1]},${cord[0]}&lang=${lang}`
          );
          const data = await response.json();
          console.log("🚀 ~ file: address-bar.tsx:41 ~ reverseGeocode ~ data:", data)

          const address_data =
            data.response.GeoObjectCollection.featureMember[0]?.GeoObject
              .metaDataProperty.GeocoderMetaData.Address.Components;

          const locality = address_data
            .filter((data: any) => data.kind === "locality")
            .map((data: any) => data.name);
          const district = address_data
            .filter(
              (data: any) => data.kind === "district" || data.kind == "street"
            )
            .map((data: any) => data.name);
          const house = address_data
            .filter((data: any) => data.kind === "house")
            .map((data: any) => data.name);

          setCity(locality.join(" ").length > 0 ? locality.join(" ") : "");
          setStreet(district.join(" ").length > 0 ? district.join(" ") : "");
          setHouse(house.join(" ").length > 0 ? house.join(" ") : "");

          const adress_text = `${locality.join(" ").length > 0 ? locality.join(" ") : ""}, ${district.join(" ").length > 0 ? district.join(" ") : ""}, ${house.join(" ").length > 0 ? house.join(" ") : ""}`
          
          setAdress(adress_text)
          const target_point:Coordinate = {
            lat: cord[0],
            lng: cord[1]
          }

          let zone = undefined;

          for (const zons_list of zons.zone ) {
            if(isPointInsidePolygon(target_point, zons_list.cord)){
              zone = zons_list
              setInsidePolygon(true);
            }
          }

          const delivered_data:DeliveredAdres = {
            house: house.join(" ").length > 0 ? house.join(" ") : undefined,
            street: district.join(" ").length > 0 ? district.join(" ") : undefined,
            city: locality.join(" ").length > 0 ? locality.join(" ") : undefined,
            zone: zone?.name,
            cords: cord
          }

          dispatch(setDeliveredAddress(delivered_data));

          setMapCenter(cord);
        } catch (error) {
          console.error("Ошибка обратного геокодирования:", error);
        }
      };
      reverseGeocode();
    }
  }, [cord]);

  useEffect(() => {}, [])

  const getLocation = async (adress : string) => {
    try {
      let new_adress = (adress ?? "")
        .replace('koʻchasi', '')
        .replace('ʻ', '')
        .replace('улица', '')
        .replace(',', '');
       
      const response = await fetch(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=89f71fc5-78a5-4747-ad3a-3e9659826490&geocode=${encodeURIComponent(
          new_adress,
        )}`,
      );
      const data = await response.json();

      // Парсинг координат из ответа
      const coordinates =
        data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(
          ' ',
        );
      const lat = parseFloat(coordinates[1]);
      console.log("🚀 ~ file: address-bar.tsx:157 ~ getLocation ~ lat:", lat)
      const lng = parseFloat(coordinates[0]);
      console.log("🚀 ~ file: address-bar.tsx:159 ~ getLocation ~ lng:", lng)

      const cord_buf = [lat, lng]
      setCord(cord_buf)

    } catch (err) {
      console.log(err);
    }
  };

  const handleGeometryChange = (event: any) => {
    const geometry = event?.get("coords");
    setCord(geometry);
  };

  const showHandler = () => {
    setShow(!show);
  };

  return (
    <>
      <Button
        aria-label="Default select example"
        className="input rounded-4 height-3 "
        id="adress_bar"
        onClick={showHandler}
      >
        <span style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {adress.length > 2 ? adress : "Укажите адрес доставки"}
        </span>
      </Button>
      <Modal centered onHide={() => setShow(false)} show={show}>
        <div>
          <input value={adress} onChange={(e) => setAdress(e.target.value ?? "")} />
          <Button onClick={() => {getLocation(adress)}}>Поиск</Button>
        </div>
        <YMaps
          query={{
            lang: "ru_RU",
            // apikey: "89f71fc5-78a5-4747-ad3a-3e9659826490",
            load: "",
          }}
        >
          <Map
            state={{
              center: mapCenter,
              zoom: 15,
            }}
            onClick={handleGeometryChange}
            style={{
              width: "100%",
              height: "420px",
            }}
            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
          >
            <ZoomControl />
            {/* <GeolocationControl options={{ float: "right" }} /> */}
            {(zons.zone ?? []).map((item, index) => {
              if (item?.name?.includes("Желтая")) {
                return (
                  <Polygon
                    key={"poligon-yellow" + index}
                    geometry={[
                      (item.cord ?? []).map((cord) => [cord.lat, cord.lng]),
                    ]}
                    onClick={handleGeometryChange}
                    options={{
                      fillColor: "#e7c435",
                      strokeColor: "#e9d069",
                      opacity: 0.25,
                    }}
                  />
                );
              }
            })}
            {(zons.zone ?? []).map((item, index) => {
              if (item?.name?.includes("Зеленая")) {
                return (
                  <Polygon
                    key={"poligon-green" + index}
                    geometry={[
                      (item.cord ?? []).map((cord) => [cord.lat, cord.lng]),
                    ]}
                    onClick={handleGeometryChange}
                    options={{
                      fillColor: "#438465",
                      fillOpacity: 0.25,
                      strokeColor: "#43846b",
                    }}
                  />
                );
              }
            })}
            <Placemark
              geometry={cord}
              options={{
                iconColor: "#DA3738",
                preset: "islands#circleIcon",
                hideIconOnBalloonOpen: false,
                openEmptyHint: true,
                openBalloonOnClick: false,
              }}
              properties={{
                iconContent: `📦`, // пару символов помещается
                hintContent: `<em>${insidePolygon ? "Мы доставляем сюда" : "Вне зоны доставки"}</em>`,
                iconCaption: `${insidePolygon ? "Мы доставляем сюда" : "Вне зоны доставки"}`,
              }}
            />
          </Map>
        </YMaps>
      </Modal>
    </>
  );
}

export default AdressBar;

// id="adress_bar" className="input rounded-4 height-3 ms-4"
