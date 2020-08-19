import React from 'react';


const Navigation=({onRouteChange,isSignedIn})=>{
	if(isSignedIn){
		return(
         <nav style={{display:"flex",justifyContent:"flex-end"}}>
	       <p onClick={()=>onRouteChange('signout')}className='f3 pa2 dim underline hover-light-black link grow pointer'>Sign Out</p>
         </nav>
       );
     }else{
        return(
           <nav style={{display:"flex",justifyContent:"flex-end"}}>
	       <p onClick={()=>onRouteChange('signin')}className='f3 pa2 dim underline hover-light-black link grow pointer'>Sign In</p>
	       <p onClick={()=>onRouteChange('Register')}className='f3 pa2 dim underline hover-light-black link grow pointer'>Register</p>
         </nav>
    	);
     }
	
}

export default Navigation;