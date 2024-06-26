import React,{useContext, useEffect, useState} from 'react';
import './UrlForm.css'
import useDebounce from '../../hooks/Debouncing';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { DataContext } from '../../contexts/dataListContext';
import { ClipLoader } from 'react-spinners';

const UrlForm = () => {
   
        const {tokenData}=useContext(AuthContext)
        const { addDataToList,load } = useContext(DataContext);
        const [originalurlData,setOriginalUrlData]=useState(null)
        const [shortUrlData,setShortUrlData]=useState(null)
        const [urlOk,setUrlOk]=useState(false)
        // const [data,setData]=useState(null)
        // console.log(tokenData)
        // console.log(load)

        const [loading,setLoading]=useState(false)

    const [originalUrl,setOriginalurl]=useState('')
    const urlDebounded=useDebounce(originalUrl,500)

    const handleUrl= async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{

            const responce=await axios.post('https://dwarf-opal.vercel.app/shortenurl',
                {
                    originalUrl:urlDebounded,
                    userToken:tokenData,
                })
                setOriginalUrlData(responce.data.newUrl.originalUrl)
                setShortUrlData(responce.data.newUrl.shortUrl)
                console.log(responce.data.newUrl)
                // setData(responce.data.newUrl)
                addDataToList()
                setOriginalurl('')
                if(responce){
                    setUrlOk(true)
                    setLoading(false)
                }

        }catch(err){
            console.log(err)
        }

    }

    
       

    

    return (
        <>
            <section className=' flex-col gap-2 px-4 '>
            
            <form  onSubmit={handleUrl}  className='w-full'>
                <h1 className='py-4 text-gray-600 text-20px'>Streamline Your Links: Transform Long URLs into Short and Professional Links</h1>
                <input 
                type="text" 
                className='w-full rounded-md h-12 border-2 px-5' 
                placeholder='Paste the long url here'
                
                value={originalUrl}
                onChange={(e)=>setOriginalurl(e.target.value)}
                
                
                />
                <button  className='px-2 py-1 urlbutton rounded-md w-full my-2 '>
                    {loading ? <ClipLoader size={20} color={'black'}/> : "Short"}
                    </button>
            </form>

                {urlOk && <p className='text-center my-2 Oktext'>Your short url is ready</p>}

                {urlOk &&

                    <div className='border-2 p-5 rounded-lg mt-10 '>
                        
                        <a href={`https://dwarf-opal.vercel.app/${shortUrlData}`} target='blank'><p className='overflow-hidden mx-3   text-indigo-500' >{shortUrlData}</p></a>
                        {/* <p className=' overflow-hidden mx-3 text-gray-700'>{originalurlData}</p> */}
                        
                    </div>
                
                }
                {
                    urlOk && 
                    <>
                        <p className='text-xs mt-4 text-gray-600'>Click on the above link or copy this " <u> https://dwarf-opal.vercel.app/{`${shortUrlData}`} </u> " </p>
                    
                    </>
                }
                
            </section>
        
        </>
    );
};

export default UrlForm;