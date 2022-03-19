import ModalHover from "./ModalHover";
import { hover } from "@testing-library/user-event/dist/hover";
import { useState,useEffect } from "react";
import style from "./SectionAsRow.module.css";
import {
  AiFillPlayCircle,
  AiOutlinePlusCircle,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { ImCross } from "react-icons/im";
import { IoIosArrowDropdown } from "react-icons/io";
import FilmDetails from "../data/FilmDetails";
import Information from "../Layout/Information";


const MovieBottom = (props) => {
  const [hoverOn, setHoverOn] = useState(false);
  const [timer,setTimer]=useState(false)
  const [didButton,setDidButton]=useState(false)
const [information,SetInformation]=useState(false)


const receivedData=props.data

useEffect(()=>{
if(props.upperSectionList && props.data){
  const isLiked=props.upperSectionList.filter(item=>item==receivedData.id).length
     isLiked>0?setDidButton(true):setDidButton(false)
}
},[props.upperSectionList,props.myList])

  const photo_url = "http://image.tmdb.org/t/p/";
  const photo_width_342 = "w342";
  const photo_width_780 = "w780";

  const styleMove = {
    moving: {
      transform: `translateX(${props.position * 90}vw) scale(1.2)`,
      transition: "all 0.4s ease-in",
      zIndex: "2",
      cursor:"pointer",
    },
  };

  const styleMoveHover = {
    moving: {
      transform: `translateX(${props.position * 90}vw) scale(1)`,
      transition: "all 0.4s ease-in",
      cursor:"pointer",
    },
  };




useEffect(()=>{
const timeOut=setTimeout(() => {
if(timer){
    setHoverOn(true)
  }else{
        setHoverOn(false)
    }
       }, 300)
       return(()=>{
        clearTimeout(timeOut)
       })
},[timer])


const doneButton = (x) => {
  props.getData(x)
}

const removeButton=(x)=>{
  props.getRemoveData(x)
  props.getData(false)
}


useEffect(()=>{
  if(props.myList && receivedData){
    const isLiked=props.myList.filter(item=>item==receivedData.id).length
  isLiked>0&&setDidButton(!didButton)
}
},[props.myList])



const modalSit = (x) =>{
SetInformation(x)
}


  return (
    <>
            {information&&<Information data={receivedData} modalSit={modalSit}/>}
{receivedData&&
      <div
        key={"img_" + receivedData.id}
        className={style.movie}
        style={hoverOn ? styleMove.moving : styleMoveHover.moving}
        onMouseEnter={()=>setTimer(true)}
        onMouseLeave={()=>setTimer(false)}
      >
        <img
          src={photo_url + photo_width_342 + receivedData.poster_path}
          className={style.movie__img}
        ></img>
        {hoverOn && (
          <div className={style.movie__bottom}>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.2rem",
                  margin: "0.2rem 0.5rem",
                }}
              >
                
                <AiFillPlayCircle className={style.icons} onClick={()=>SetInformation(!information)} ></AiFillPlayCircle>
                {!didButton&&receivedData?

                <AiOutlinePlusCircle className={style.icons} onClick={()=>doneButton(receivedData.id)}/>
                :
                <ImCross className={style.icons} onClick={()=>removeButton(receivedData.id)} />
}
                <AiOutlineLike className={style.icons} />
                <AiOutlineDislike className={style.icons} />
                <ImCross className={style.icons} />
              </div>
              <div style={{ marginRight: "1rem" }}>
                <IoIosArrowDropdown className={style.icons} onClick={()=>SetInformation(!information)} />
              </div>
            </div>
            {/* movie titles */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <div> {receivedData.original_title}</div>
              <div>
                {" "}
                <FilmDetails id={receivedData.id} />
              </div>
            </div>
          </div>
        )}
      </div>
}
    </>
  );
};

export default MovieBottom;
