import React, { useState } from "react";
import BodyHeader from "../BodyHeader/BodyHeader";
import WatchLeft from "../WatchLeft/WatchLeft";
import WatchRight from "../WatchRight/WatchRight";
import "./WatchBody.css";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

function WatchBody(props) {
  const [scrolledBottom, setScrolledBottom] = useState(false);

  const scrolledBottomhandler = (val) => {
    setScrolledBottom(val);
  };
  const scrollRef = useBottomScrollListener(() => {
    scrolledBottomhandler(true);
  });
  return (
    <div className="watch-body">
      <BodyHeader />

      <div ref={scrollRef} className="watch-body-content">
        <WatchLeft
          scrolled={scrolledBottom}
          scrollHandler={scrolledBottomhandler}
        />
        <WatchRight />
      </div>
    </div>
  );
}

export default WatchBody;
