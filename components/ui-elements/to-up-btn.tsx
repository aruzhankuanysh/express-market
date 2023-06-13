import React, { useEffect, useState } from "react";

export default function ToUpBtn() {
  const [scrol, setScrol] = useState(false);
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return function () {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollHandler = (e: Event) => {
    if (
      e.target &&
      e.target instanceof Document &&
      e.target.documentElement.scrollTop > 500
    ) {
      setScrol(true);
    } else {
      setScrol(false);
    }
  };
  return (
    <div
      hidden={!scrol}
      onClick={() => scrollTop()}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "100%",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        position: "fixed",
        bottom: "30px",
        right: "40px",
        cursor: "pointer",
      }}
      className="up_button"
    >
      <span className="mt-2">^</span>
    </div>
  );
}
