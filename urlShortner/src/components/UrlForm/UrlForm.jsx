import React,{useState} from 'react';
import './UrlForm.css'
import useDebounce from '../../hooks/Debouncing';
import axios from 'axios';
const UrlForm = () => {

    const [originalUrl,setOriginalurl]=useState('')
    const urlDebounded=useDebounce(originalUrl,500)

    const handleUrl= async (e)=>{
        e.preventDefault()
        try{

            const responce=await axios.post('http://localhost:4000/shortenurl',
                {
                    originalUrl:urlDebounded
                })
                console.log(responce)
                setOriginalurl('')

        }catch(err){
            console.log(err)
        }

        
    }


    return (
        <>
            <section className=' flex gap-2 px-3 '>

            <form  onSubmit={handleUrl}  className='w-full'>
                <input 
                type="text" 
                className='w-full rounded-md h-12 border-2 px-5' 
                placeholder='Paste the long url here'
                
                value={originalUrl}
                onChange={(e)=>setOriginalurl(e.target.value)}
                
                
                />
                <button  className='px-2 py-1 urlbutton rounded-md w-full my-2 '>Short</button>
            </form>
                
            </section>
        
        </>
    );
};

export default UrlForm;