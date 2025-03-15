import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RestrictedRoute = ({children}) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  useEffect(()=>{
    if(token){
      navigate('/',{replace:true})
    }
  },[token, isLoggedIn,navigate]);
  
  return children;
}

export default RestrictedRoute