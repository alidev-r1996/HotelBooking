import { useState } from "react";
import { SIGNIN_FORM } from "../../constants/constant";
import { BiLogoGmail, BiLogoFacebook, BiLogoLinkedin } from "react-icons/bi";

const Signin = ({setIsShow, isShow}) => {
    const [signin, setSignin] = useState({
        email: "",
        password: "",
      });

      const SubmitHandler = (e)=>{
        e.preventDefault();
      }


    return ( <div
        className={`${
          !isShow && "-z-10 "
        } flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 md:flex-row gap-2  justify-center w-[90%] md:w-4/5 md:h-[470px] mx-auto  bg-white mt-2 md:mt-12 shadow-md rounded overflow-hidden `}
      >
        <form
        onSubmit={SubmitHandler}
          className={`${
            !isShow ? "translate-x-full" : ""
          } flex flex-col transition-all duration-500 gap-4 w-full md:w-1/2 p-4 md:p-8`}
        >
          <h1 className="text-3xl font-bold mx-auto">Login</h1>
          <div className="flex items-center gap-3 mx-auto">
            <p className="logo-shadow">
              <BiLogoFacebook className="w-6 h-6" />
            </p>
            <p className="logo-shadow">
              <BiLogoGmail className="w-5 h-5" />
            </p>
            <p className="logo-shadow">
              <BiLogoLinkedin className="w-5 h-5" />
            </p>
          </div>
          {SIGNIN_FORM.map((i) => {
            return (
              <input
                key={i.id}
                type="text"
                name={i.title}
                id={i.title}
                value={signin[i.title]}
                onChange={(e) =>
                  setSignin({ ...signin, [e.target.name]: e.target.value })
                }
                placeholder={i.label}
                className="px-2 py-3 placeholder:capitalize transition-all border border-gray-400 placeholder-shown:border-none duration-300 text-xs outline-none bg-gray-100 rounded "
              />
            );
          })}
          <button onClick={SubmitHandler} className="px-12 py-2 rounded-full bg-rose-600 text-white hover:bg-rose-500 hover:shadow-[1px_1px_7px_rgba(225,25,72,0.7)] transition-all duration-300 font-bold mt-3">
            SIGN IP
          </button>
        </form>

        <div
          className={`${
            !isShow ? "-translate-x-full" : ""
          } flex flex-col transition-all duration-500 justify-center items-center text-white  md:w-1/2 bg-rose-600 p-4`}
        >
          <h1 className="text-3xl font-bold ">Hello, Friend!</h1>
          <p className="text-sm mx-auto p-2 md:p-6 text-center">
          Enter your personal details and start journey with us
          </p>
          <button onClick={()=>setIsShow(!isShow)} className="shadow_btn">Sign Up</button>
        </div>

      </div> );
}
 
export default Signin;