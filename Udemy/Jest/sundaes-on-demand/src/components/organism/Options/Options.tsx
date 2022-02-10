import React, { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import AlertBanner from "../../atoms/AlertBanner/AlertBanner";
import { getHost } from "../../../utils/utils";
import { pricePerItem } from "../../../constants/prices";
import { useAppContext } from "../../../context/context";

type Props = {
  optionType: "scoops" | "toppings";
  ItemComponent: React.FC;
};

const Options: React.FC<Props> = function ({ optionType, ItemComponent }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [store, updateItemCount] = useAppContext();
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  useEffect(() => {
    axios
      .get(`${getHost()}/${optionType}`)
      .then((response: Object) => setItems(response.data))
      .catch((error) => setError(true));
  }, [optionType]);

  return (
    <>
      <h2>{title}</h2>
      <p>{pricePerItem[optionType]} each</p>
      <p>
        {title} total:
        {
          // @ts-ignore
          " " + store.totals![optionType]
        }
      </p>
      <Row>
        {!error ? (
          items.map((item) => (
            <ItemComponent
              key={item.name}
              // @ts-ignore
              name={item.name}
              imagePath={item.imagePath}
              updateItemCount={(itemName: string, newItemCount: string) =>
                // @ts-ignore
                updateItemCount(itemName, newItemCount, optionType)
              }
            />
          ))
        ) : (
          <AlertBanner message="An unexpected error ocurred. Please try again later" />
        )}
      </Row>
    </>
  );
};
export default Options;
