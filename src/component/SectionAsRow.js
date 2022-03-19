import style from "./SectionAsRow.module.css";
import { useEffect, useState } from "react";
import MovieBottom from "./MovieBottom";
import Button from "./Button";



const SectionAsRow = (props) => {
  const [slidePosition, setSlidePosition] = useState(0);
const [addButton,setAddButton]=useState(true)





  const move = (x) => {
    setSlidePosition((prev) => prev + x);
  };


const receivePos =(x)=>{
    move(x)
}

const hoverSit = (x)=>{
setAddButton(x)
}

const getData = (x)=>{
props.getData(x)
} 

const getRemoveData = (x)=>{
  props.getRemoveData(x)
  } 


const touchStartButton = (x) => {
  setCoord((prev)=>{
    return({
    start:x.targetTouches[0].clientX,
    move:prev.move}
    )
})}

const touchMoveButton= (x) => {
  setCoord((prev)=>{
    return({
    move:x.targetTouches[0].clientX,
    start:prev.start}
    )
})}

const [coord,setCoord]=useState({start:"",move:""})
useEffect (()=>{
if((coord.start-coord.move)<-50 && slidePosition<0.1){
  setSlidePosition((prev)=>prev+0.05)
}else if((coord.start-coord.move)>30 && slidePosition>-10.5){
  console.log(slidePosition)
  setSlidePosition((prev)=>prev-.05)
}
},[coord])

const screenWidth=window.innerWidth


  return (
    <>
      <div className={style.main}>
       {/* {props.sendInformation &&
          console.log(props.sendInformation)}  */}
        {props.sendInformation &&
          props.sendInformation.map((item) => {
            return (
              <>
              <div onTouchMove={(e)=>touchMoveButton(e)} onTouchStart={(e)=>touchStartButton(e)}>
              <MovieBottom data={item}  position={slidePosition} hoverSit={hoverSit} getData={getData} getRemoveData={getRemoveData} myList={props.myList} upperSectionList={props.sendFilteredList} />
             </div>
              </>
            )
          })}
          {addButton&&screenWidth>750 &&
           <Button sendPos={slidePosition} receivePos={receivePos}/>
}
      </div>
     
      {/* <button onClick={() => slidePosition > -2 && move(-1)}>Left</button>
      <button onClick={() => slidePosition < 0 && move(1)}> Right</button> */}
    </>
  );
};

export default SectionAsRow;
