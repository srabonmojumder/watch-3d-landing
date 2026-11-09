"use client";

import React, { createContext, useContext, useState } from "react";

const WatchContext = createContext(undefined);

export function WatchProvider({ children }) {
  const [selectedDial, setSelectedDial] = useState("blue");
  const [selectedStrap, setSelectedStrap] = useState("cognac");
  const [caseSize, setCaseSize] = useState("39mm");
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const scrollToOrder = (dial) => {
    if (dial) {
      setSelectedDial(dial);
    }
    const element = document.getElementById("order-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsBookingOpen(true);
    }
  };

  return (
    <WatchContext.Provider
      value={{
        selectedDial,
        setSelectedDial,
        selectedStrap,
        setSelectedStrap,
        caseSize,
        setCaseSize,
        isBookingOpen,
        setIsBookingOpen,
        scrollToOrder,
      }}
    >
      {children}
    </WatchContext.Provider>
  );
}

export function useWatch() {
  const context = useContext(WatchContext);
  if (!context) {
    throw new Error("useWatch must be used within a WatchProvider");
  }
  return context;
}
