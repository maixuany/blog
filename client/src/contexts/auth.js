import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import Cookies from "js-cookie";
import Axios from 'axios';

function AuthProvider(props) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const config_getme = {
    method: 'get',
    url: 'http://localhost:3030/api/v1/user/me',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get("token")
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const result = await Axios.request(config_getme);
        if (result.status === 200) {
          setUser(result.data.data);
        } else {
          setUser(undefined);
        }
        setLoading(false);
      } catch (err) {
        setUser(undefined);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }} {...props} />
  );
}

const AuthContext = createContext({ loading: false });
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth }
