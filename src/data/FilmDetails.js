import { useEffect,useState } from "react"
// https://api.themoviedb.org/3/movie/634649?api_key=549dc5373e1e9ceb31130ccb603a42ff&language=en-US
const FilmDetails = (props) =>{

        const FilmDetailsFetcher =async ()=>{
        const FilmDetailFirst = async ()=>{
        const api_key="549dc5373e1e9ceb31130ccb603a42ff"
        const url="https://api.themoviedb.org/3/movie/"
        const id=props.id
        const page="&language=en-US"
        const fullPage= url+id+"?api_key="+api_key+page
        const data = await fetch(fullPage)
        const result= await data.json()
        return result
        }    
        FilmDetailFirst().then(item=>{
            return(setFetchedData(item))
        })
        }
        
        
        const [fetchedData,setFetchedData]=useState()
        useEffect(()=>{
            FilmDetailsFetcher() 
        },[])
        
        
        
    return(
<>
{fetchedData&&
<>
<div style={{fontSize:"0.5rem"}}>Budget: {fetchedData.budget}</div>
<div style={{fontSize:"0.5rem"}}>Genres: {fetchedData.genres.map(item=>item.name).join(",")}</div>
<div style={{fontSize:"0.5rem"}}>Date: {fetchedData.release_date} </div>

</>


}

</>
    )
}

export default FilmDetails