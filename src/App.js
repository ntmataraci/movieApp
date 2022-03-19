
import { useEffect, useState,useReducer,useCallback } from 'react';
import './App.css';
import MyList from './component/MyList';
import SectionAsRow from './component/SectionAsRow';
import PopularMovies from "./data/PopularMovies"
import Entrance from './Layout/Entrance';
import Nav from './Layout/Nav';

// import PopularMoviesFetcher from './data/PopularMovies';


function App() {
  
const [informationList,setInformationList]=useState()

const [listedItem,setListedItem]=useState()
const [removeItem,setRemoteItem]=useState()
const [filteredList,setFilteredList]=useState()
const [randInformation,setRandInformation]=useState()
const [cumulative,setCumulative]=useState()

const getData = (x)=>{
  setListedItem(x)
}

const getRemoveData = (x)=>{
  setRemoteItem(x)
}


const getInformation = (x) =>{
   if (x){
 setInformationList(x.fetchedData)

   }
 }

 const getRanInformation= (x)=>{
   if(x){
     setRandInformation(x.randData)
   }
 }


 useEffect(()=>{
   if (informationList&&randInformation){
  setCumulative([...randInformation,...informationList])
  console.log(cumulative)
   }
 },[informationList,randInformation])


const getFilteredList=(x)=>setFilteredList(x)


  return (
<>
<div>

<Nav/>
<Entrance/>
<h2 style={{color:"white"}}>Popular Movies</h2>
<SectionAsRow sendInformation={informationList} getData={getData} getRemoveData={getRemoveData} sendFilteredList={filteredList}   />
<PopularMovies receiveInformation ={getInformation}  getRanInformation={getRanInformation}/> 
<h2 style={{color:"white"}}>Advices</h2>
{randInformation&&<SectionAsRow sendInformation={randInformation} getData={getData} getRemoveData={getRemoveData} sendFilteredList={filteredList}  />}
<h2 style={{color:"white"}}>My List</h2>
<MyList data={listedItem} sendInformation={cumulative} sendRemoveData={removeItem} getData={getData} getRemoveData={getRemoveData} receiveMyList={getFilteredList}  />
</div>

</>
  );
}

export default App;
