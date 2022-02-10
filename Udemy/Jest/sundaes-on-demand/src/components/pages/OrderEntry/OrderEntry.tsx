import React from "react";
import ScoopOption from "../../molecules/ScoopOption/ScoopOption";
import Options from "../../organism/Options/Options";
import ToppingOption from "../../molecules/ToppingOption/ToppingOption";
import { useAppContext } from "../../../context/context";

type Props = {};
const OrderEntry: React.FC<Props> = () => {
  const [store, updateItemCount] = useAppContext();

  return (
    <>
      <h1>Design your Sundae!</h1>
      <Options optionType="scoops" ItemComponent={ScoopOption} />
      <Options optionType="toppings" ItemComponent={ToppingOption} />
      <h2>Grand total: {store.totals.grandTotal}</h2>
    </>
  );
};
export default OrderEntry;
