import style from "./Entrance.module.css"
import {AiFillPlayCircle} from "react-icons/ai"
import {HiOutlineInformationCircle} from "react-icons/hi"
import {GoUnmute,GoMute} from "react-icons/go"
import { useEffect,useState,useRef } from "react"

const Entrance = () =>{

    const [load,setLoad]=useState(false)
const [muteButton,setmuteButton]=useState(false)

const entranceVideo=useRef()
useEffect(()=>{
const timerVal=setTimeout( ()=>{
    setLoad(true)
},10000)
return (()=>clearTimeout(timerVal))
},[])

const mute = () =>{
    entranceVideo.current.muted=!entranceVideo.current.muted
    setmuteButton(!muteButton)
}


const screenWidth=window.innerWidth
    return(
        <div style={{width:"100%",position:"relative"}}> 
            {load?
            <>
            <video autoPlay muted loop className={style.image} ref={entranceVideo} poster="./sw.jpg" preload="none">
                <source src="sw.mp4" type="video/mp4"></source>
            </video>
           </>:
            <img src="./sw.jpg" className={style.image}></img>

}
            <div className={style.container}>
            <div className={style.header}>Star Wars</div>
            <div style={{display:"flex",gap:"1rem",justifyContent:"space-between"}}>
                <div style={{display:"flex",gap:"2rem"}}>
                    {screenWidth>750?
                    <>
            <div className={style.header__bottom}><AiFillPlayCircle/>Play</div>
            <div className={style.header__bottom}><HiOutlineInformationCircle/>Information</div>
            </> :
            <>
            <div style={{color:"white",fontSize:"1.5rem"}} ><AiFillPlayCircle/></div>
            <div style={{color:"white",fontSize:"1.5rem"}} ><HiOutlineInformationCircle/></div>
            </> }

            </div>
            {load&&screenWidth>750 &&
            <div style={{color:"white",cursor:"pointer"}} className={style.mute_button} onClick={mute}>{!muteButton?<GoUnmute/>:<GoMute/>}</div>
}
{load&&screenWidth<=750 &&
            <div style={{color:"white",cursor:"pointer",fontSize:"1,5rem"}} onClick={mute}>{!muteButton?<GoUnmute/>:<GoMute/>}</div>
}
            </div>
         
            </div>
        </div>
    )
}

export default Entrance