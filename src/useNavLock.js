import React from "react";
import { history } from "./App";

const useNavLock = (defaultBlocked = true) => {
  const [show, setShow] = React.useState(false);
  const [location, setLocation] = React.useState(null);
  const [isBlocked, setIsBlocked] = React.useState(defaultBlocked);
  const unBlockRef = React.useRef();

  const handleBlock = loc => {
    setShow(true);
    setLocation(loc.pathname);
    return false;
  };

  const block = () => {
    if (unBlockRef.current) unBlockRef.current();
    unBlockRef.current = history.block(handleBlock);
    setIsBlocked(true);
  };

  const unBlock = () => {
    setShow(false);
    setIsBlocked(false);
    unBlockRef.current();
  };

  const proceed = () => {
    unBlock();
    history.push(location);
  };

  React.useEffect(() => {
    const confirmReload = e => {
      e.preventDefault();
      e.returnValue = "";
      return "";
    };
    if (defaultBlocked) {
      block();
    }
    window.addEventListener("beforeunload", confirmReload);
    return () => {
      if (unBlockRef.current) {
        unBlockRef.current();
      }
      window.removeEventListener("beforeunload", confirmReload);
    };
  }, []);

  return {
    isBlocked: isBlocked,
    block,
    unBlock,
    proceed,
    show,
    cancel: () => {
      setShow(false);
    }
  };
};

export default useNavLock;
