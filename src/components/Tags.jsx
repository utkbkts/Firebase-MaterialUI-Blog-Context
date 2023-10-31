import React, { useContext } from 'react'
import MyContext from '../context/Context';
import { Button } from '@mui/material';

const Tags = () => {
    const context = useContext(MyContext);
    const { mode, Tags } = context;
  return (
    <div className='Tags'>
        <div className='__tag'>
        <span>Tags</span>
        </div>
        <div className='__t'>
            {Tags.map((x,index)=>(
                <div key={index}>
                    <Button variant='contained'>{x.text}</Button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Tags