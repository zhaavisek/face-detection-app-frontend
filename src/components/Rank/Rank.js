import React from 'react';


const Rank=({name,entries})=>{
	return(
           <div>
           <p className='f2 white'>
           {`${name}, your current rank is...`}
           </p>
           <div className='f1 white'>
           {entries}
           </div>
           </div>

		);
}
export default Rank;