import React from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";
import { Header, CreateContainer, MainContainer, CheckOut } from "./components";
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";

const App = () => {
  // eslint-disable-next-line
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then(data => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-full h-auto flex flex-col bg-primary">
        <Header />
        <main className="mt-14 md:mt-20 p-7 w-full">
          <Routes>
            <Route path="/" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/checkOut" element={<CheckOut />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
