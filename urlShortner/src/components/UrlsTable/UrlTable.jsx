import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { DataContext } from '../../contexts/dataListContext';
import { ClipLoader } from 'react-spinners';
import Loader from '../../Loader/Loader';
import './UserTable.css'

import { MdDelete } from "react-icons/md";
const UrlTable = () => {
    const { tokenData } = useContext(AuthContext);
    const [urlData, setUrlData] = useState([]);
    const token = localStorage.getItem('token');

    const [loading,setLoading]=useState(false)

    var { load } = useContext(DataContext);
    // console.log(token)
    
    useEffect(() => {
        const loadUrls = async () => {
            try {
                const response = await axios.post('https://dwarf-opal.vercel.app/allurl', {
                   token:token
                });
                console.log(response);
                const data=[...response.data.allUrls].reverse();
                setUrlData(data);
            } catch (err) {
                console.error('Error fetching URLs:', err);
                console.log(err)
            }
        };


            
            loadUrls();

            load=loadUrls()

            // const  intervel=setInterval(loadUrls,1000)
            
            // return ()=>clearInterval(intervel)


       
    }, []);

    


    const handleDelete= async (deletUrl)=>{
        setLoading(true)
        try{
            const deletResponce=await axios.delete(`https://dwarf-opal.vercel.app/${deletUrl}`)
            console.log(deletResponce.data)
            if(deletResponce){
                setLoading(false)
            }
            setUrlData(urlData.filter(url=> url._id !=deletUrl))
            
        }catch(err){
            console.log(err)
        }



    }
    // console.log(dataList)

    const showDate=(dateObj)=>{
        let dateString=dateObj;
        let date=new Date()
        let options = {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short'
        };
        let formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }


    
    return (
        <div className=''>
            {
                loading ? <Loader />
                :
                <div className=''>
                {urlData.map((url) => (
                    <div key={url._id} className=' md:flex  overflow-y-auto p-4 my-2  rounded-md urlTable' >
                        <ul className='w-11/12'>
                            <li className='py-3'><span>Short Url : <a href={`https://dwarf-opal.vercel.app/${url.shortUrl}`} target='blank' className=' text-indigo-500'>{url.shortUrl}</a></span></li>
                            <li className=' text-gray-600 text-15px overflow-x-auto'><span className='font-semibold'>Original url : </span>{url.originalUrl}</li>
                            <p className='text-13px text-gray-500'>{
                            
                                showDate(url.UrlCreateDate)
                            
                            }</p> 
                        </ul>
                        <div  className='my-4 flex w-1/12 justify-center  items-center border-l-2 delete  ' onClick={()=>handleDelete(url._id)}>
                            {/* {loading ? <ClipLoader size={20} color={'black'}/> : <span><MdDelete className='h-7 w-7 text-red-500 delete' /> </span>}   */}
                            <span><MdDelete className='h-7 w-7 text-red-500 delete' /> </span>
                        </div>

                       
                        
                    </div>
                ))}
            </div>





            }
            
               
                    
            
        </div>
    );
};

export default UrlTable;
