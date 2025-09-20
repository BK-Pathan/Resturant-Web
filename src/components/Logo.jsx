import React from 'react'
import "./logo.css";

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center space-x-2">
    
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJnfeKJLNfq9-8bOLPdsoY6k7-U2t3uSdFQ&s" 
        alt="Logo" 
           className="h-15 w-51 rounded-full object-cover"  
        style={{ width }} 
      />
      
      
      <h5 className="text-xl logo-text font-bold text-white  ml-3">Hungry Hub</h5>
    </div>
  )
}

export default Logo

