// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthProvider"; 

const useAuth = () => {
    const context = useContext(AuthContext);
    
    
    if (context === undefined || context === null) {
        throw new Error("AuthContext is missing! Problem is in useAuth.js or AuthProvider.jsx");
    }
    
    return context;
};

export default useAuth;