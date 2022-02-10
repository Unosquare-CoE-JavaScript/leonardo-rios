import React from "react";
import Container from "react-bootstrap/Container";
import OrderEntry from "./components/pages/OrderEntry/OrderEntry";
import { AppProvider } from "./context/context";

function App() {
  return (
    <Container>
      <AppProvider>
        <OrderEntry />
      </AppProvider>
    </Container>
  );
}

export default App;
