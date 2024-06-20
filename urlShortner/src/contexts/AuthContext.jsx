import React,{Children, createContext,useEffect,useState} from "react";
import { jwtDecode } from 'jwt-decode';



export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [isAuth,setIsAuth]=useState(false)
    const [tokenData,setToken]=useState(null)
    // console.log(tokenData)
    useEffect(()=>{
        const token=localStorage.getItem('token')
        if(token){

            try{
                const decoded= jwtDecode(token)
                // console.log(decoded)
                
                if(decoded.exp * 1000 >Date.now()){
                    setIsAuth(true)
                    setToken(decoded)
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
        const deCoded=jwtDecode(token)
        setToken(deCoded)

    }

    const logout=()=>{
        localStorage.removeItem('token')
        setIsAuth(false)
        setToken(null)
        
    }

    return(
        <>
            <AuthContext.Provider value={{isAuth,login,logout,tokenData}}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

// export default {authContext,AuthProvider}