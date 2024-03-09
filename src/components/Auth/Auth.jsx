import { useState } from "react";
import Signup from "./signup";
import Signin from "./signin";

const Auth = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <div className="relative">
      <Signup setIsShow={setIsShow} isShow={isShow} />
      <Signin setIsShow={setIsShow} isShow={isShow} />
    </div>
  );
};

export default Auth;
