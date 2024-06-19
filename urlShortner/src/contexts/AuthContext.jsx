import React,{Children, createContext,useEffect,useState} from "react";
import { jwtDecode } from 'jwt-decode';



export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isAuth,setIsAuth]=useState(false)

    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){

            try{
                const decoded= jwtDecode(token)
                console.log(decoded)
                if(decoded.exp * 1000 >Date.now()){
                    setIsAuth(true)
                }else{
                    localStorage.removeItem('token')
                }

            }catch(err){
                localStorage.removeItem('token')
            }
        }

    },[]);

    const login=(token)=>{
        localStorage.setItem('token',token)
        setIsAuth(true)
    }

    const logout=(token)=>{
        localStorage.removeItem('token')
        setIsAuth(false)
        
    }

    return(
        <>
            <AuthContext.Provider value={{isAuth,login,logout}}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

// export default {authContext,AuthProvider}