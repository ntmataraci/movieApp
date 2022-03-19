
import {useEffect, useState} from "react"


const PopularMovies = (props) => {



const PopularMoviesFetcher =async (pageId=1)=>{
const PopularMoviesFirst = async ()=>{
const api_key="549dc5373e1e9ceb31130ccb603a42ff"
const url="https://api.themoviedb.org/3/movie/popular?api_key="
const page="&language=en-US&page="
const fullPage= url+api_key+page+pageId
const data = await fetch(fullPage)
const result= await data.json()
const detail=  await result.results
return detail
}    
PopularMoviesFirst().then(item=>{
pageId==1?setFetchedData(item):setRandData(item)

})
}


const [fetchedData,setFetchedData]=useState()
const [randData,setRandData]=useState()

useEffect(()=>{

    PopularMoviesFetcher(1)
    PopularMoviesFetcher(Math.random()*20+2) 
},[])



useEffect(()=>{
    if (fetchedData){
    props.receiveInformation({
        fetchedData
    })
    if (randData){
    props.getRanInformation({
        randData
    })
}
}
}
    ,[fetchedData,randData])
 



return(
    <>
 {/* {console.log(
     fetchedData&&fetchedData.map(item=>item)
 )} */}

   {/* {fetchedData&&fetchedData.map((item,idx)=>{
   return(
    <>
   <p key={idx}>{item.original_title}</p>
   <img src={photo_url+photo_width_342+item.poster_path}></img>
   </>
   )})
}  */}



</>
    )
}

export default PopularMovies