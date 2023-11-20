import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addInfo } from "../redux/slices/adminSlice";

const google = window.google;

const Login = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.admin);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(userInfo).length > 0) {
      navigate("/");
    } else {
      async function getAuth() {
        const { data } = await axios.get("http://localhost:5000/bot/auth");
        google?.accounts.id.initialize({
          client_id: global.atob(data),
          callback: async (res) => {
            setLoading(true);
            const userObject = jwtDecode(res.credential);
            dispatch(
              addInfo({
                name: userObject.name,
                email: userObject.email,
                picture: userObject.picture,
              })
            );
            setLoading(false);
          },
        });

        google?.accounts.id.renderButton(document.getElementById("signInDiv"), {
          theme: "outline",
          size: "medium",
        });
      }
      getAuth();
    }
  }, [userInfo, navigate, dispatch]);

  return (
    <div className="flex flex-col-reverse justify-center items-center min-h-screen">
      {loading && <h1>Loading.....</h1>}
      <h1 className="text-3xl text-gray-800 my-4">
        Welcome, you have to sign in!
      </h1>
      <div id="signInDiv"></div>
    </div>
  );
};

export default Login;
