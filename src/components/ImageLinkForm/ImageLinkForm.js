import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm=({onInputChange,onButtonSubmit})=>{
	return(
		<div>
		<p className='f3'>
		{'This magic brain will detect faces in your picture. Give it a try!'}
		</p>
		<div className='center'>
        <div className='form center pa4 br3 shadow-5'>
           <input onChange={onInputChange} className='f4 pa2 w-70' type='text' placeholder='Input image url'/>
           <button onClick={onButtonSubmit} className='f4 w-30 ph3 pv2 dib bg-light-purple link grow'>Detect</button> 
        </div>
        </div>
        </div>

		);
}
export default ImageLinkForm;