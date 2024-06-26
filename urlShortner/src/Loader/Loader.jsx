import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = () => {
    return (
        <div className='w-full  h-96 flex justify-center items-center opacity-90'>
            <ClipLoader size={50} color={'black'}/>
        </div>
    );
};

export default Loader;