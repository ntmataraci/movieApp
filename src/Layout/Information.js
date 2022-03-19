import style from "./Information.module.css";
import YouTube from "react-youtube";
import { AiFillPlayCircle } from "react-icons/ai";
import { useEffect, useState } from "react";

const Information = (props) => {
const [youtubeKey,setYoutubeKey]=useState()
const [openModal,setOpenModal]=useState(true)
const [stateGenres,setStateGenres]=useState([])
const [creditList,setCreditList]=useState([])
  const youtubeAdress = (id) =>
    `https://api.themoviedb.org/3/movie/${id}/videos?api_key=549dc5373e1e9ceb31130ccb603a42ff&language=en-US`;

    const genres= `https://api.themoviedb.org/3/genre/movie/list?api_key=549dc5373e1e9ceb31130ccb603a42ff&language=en-US`
    

const credits=(id)=> `https://api.themoviedb.org/3/movie/${id}/credits?api_key=549dc5373e1e9ceb31130ccb603a42ff&language=en-US`

const creditImage="https://image.tmdb.org/t/p/w45/"

const fetchGenre= async ()=>{
    const firstGenre=async () => {
    const fetchData=await fetch(genres)
    const result=await fetchData.json()
    setStateGenres(result.genres)
    };
  firstGenre()
  }

useEffect(()=>{
   fetchGenre() 
},[props.data.id])



const myMapping = (newArray)=>{
     if(stateGenres.length>0){
      const newList=newArray.map(item=>{
        return(
          stateGenres.filter(x=>{
          return(
          x.id===item)
        }))})
        return(newList)
      }
    }


    const fetchCasts = async (id) => {
      const fetchFirstCasts = async () => {
        const fetchData = await fetch(credits(id));
        const result = await fetchData.json();
        return result.cast.slice(0,5);
      };
      fetchFirstCasts().then(item=>setCreditList(item))
    }
      
    useEffect(()=>{
      fetchCasts(props.data.id)
  },[props.data.id])
  


   const fetchAdress = async (id) => {
  const fetchFirstAdress = async () => {
    const fetchData = await fetch(youtubeAdress(id));
    const result = await fetchData.json();
    return result.results[0].key;
  };
  fetchFirstAdress().then(item=>setYoutubeKey(item))
}
  
useEffect(()=>{
    fetchAdress(props.data.id)
},[props.data.id])

  return (
      <>
      {openModal&&
      <div style={{width:"100vw",height:"100vh",backgroundColor:"transparent",position:"fixed",top:"0",left:"0",zIndex:"1"}}  onClick={()=>{props.modalSit(false);setOpenModal(false)}}></div>
}
      {openModal&&
    <div className={style.main}>
    <div className={style.quit_button} onClick={()=>{props.modalSit(false);setOpenModal(false)}}>X</div>
      <div className={style.video} >
        <iframe
        className={style.video__window}
        src={`https://www.youtube.com/embed/${youtubeKey}`}
        //   src={`https://www.youtube.com/embed/k_N9pU4FMOs`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div>
        <div>{props.data.original_title}</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"3rem"}}>
          <div>
        <div>Genres:  {stateGenres.length>0&&myMapping(props.data.genre_ids).map(item=>item[0].name).join("/")}   </div> 
        <div>Release Date : {props.data.release_date}</div></div>
          <div style={{display:"flex",flexWrap:"wrap"}}><div ></div>  {creditList.map(item=><div style={{width:"90px",fontSize:"0.8rem"}}> <div> {item.name.length>10?item.name.substr(0,9):item.name} </div> <div><img src={creditImage+item.profile_path} /> </div> </div>)}
          </div>
          <div style={{fontSize:"0.8rem"}}>{props.data.overview}</div>
        
        </div>
      </div>
    </div>
   
     }
     </>
  );
};

export default Information;
