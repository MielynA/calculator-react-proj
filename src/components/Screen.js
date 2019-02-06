import React from 'react'; 

const Screen = (props) => {
   return (
     <div className="row" style={{minHeight: '120px'}}>
     <div className="col col-12 " style={{backgroundColor: '#333333', color: 'white', textAlign: 'right', fontSize: '70px', verticalAlign: 'middle', overflow: 'hidden'}} >{props.displayValue}</div>
     </div>
   );

}



export default Screen; 