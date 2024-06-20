import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { DataContext } from '../../contexts/dataListContext';
const UrlTable = () => {
    const { tokenData } = useContext(AuthContext);
    const [urlData, setUrlData] = useState([]);
    const token = localStorage.getItem('token');
    var { load } = useContext(DataContext);
    // console.log(token)
    
    useEffect(() => {
        const loadUrls = async () => {
            try {
                const response = await axios.post('http://localhost:4000/allurl', {
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

            // load(loadUrls)

            // const  intervel=setInterval(loadUrls,1000)
            
            // return ()=>clearInterval(intervel)


       
    }, []);

    


    const handleDelete= async (deletUrl)=>{

        try{
            const deletResponce=await axios.delete(`http://localhost:4000/${deletUrl}`)
            console.log(deletResponce.data)
            setUrlData(urlData.filter(url=> url._id !=deletUrl))
        }catch(err){
            console.log(err)
        }



    }
    // console.log(dataList)
    return (
        <div className=''>
            <h2>URLs</h2>
            
                <div >
                    {urlData.map((url) => (
                        <div key={url._id} className=' md:flex border-2 overflow-y-auto p-4 my-2  rounded-md'>
                            <ul className='w-11/12'>
                                <li className='border-b-2 py-2'><span>Short Url : </span>{url.shortUrl}</li>
                                <li><span>Original url : </span>{url.originalUrl}</li>
                                <p className='text-10px'>{url.UrlCreateDate}</p> 
                            </ul>
                            <div className='my-4 flex w-1/12 justify-center  items-center  ' onClick={()=>handleDelete(url._id)}>
                                <span>Delete</span>
                            </div>

                           
                            
                        </div>
                    ))}
                </div>
                    
            
        </div>
    );
};

export default UrlTable;
