import style from "./Nav.module.css";
import { useEffect, useState,useRef } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Information from "./Information";

const Nav = () => {

  const key= (keyword)=>`  https://api.themoviedb.org/3/search/movie?api_key=549dc5373e1e9ceb31130ccb603a42ff&language=en-US&query=${keyword}&page=1&include_adult=false`



const [searchResult,setSearchResult]=useState()
const [filteredResults,setFilteredResults]=useState()
const [mappedVal,setMappedVal]=useState()
  const fetcherKeyword = async (keyword) => {
      const data=await fetch(key(keyword.replace(/\s/g,"%20")))
      const result=await data.json()
      setSearchResult(result)
  }



  const [showSearchIcon, setShowSearchIcon] = useState(true);
  const [getValue,setGetValue]=useState()

  const searchIconEvent = () => {
setGetValue(searchRef.current.value)
 searchRef.current.value.length>0&&setShowSearchIcon(false)
 if(searchRef.current.value){
fetcherKeyword(getValue)
  }
  }
 
useEffect(()=>{
if(searchResult && getValue){
    fetcherKeyword(getValue)
    setFilteredResults(searchResult.results.slice(0,10))
    mappingFinalData()
}

if (!getValue){
setSearchResult()
setFilteredResults()
setGetValue()
setMappedVal()
}
},[getValue])

const [details,setDetails]=useState(false)

const openModal = (x) => {
   setDetails(x)
   setSearchResult()
setFilteredResults()
setGetValue()
setMappedVal()
searchRef.current.value=""
}

const [information,setInformation]=useState(false)
const modalSituation = (x) => {
setInformation(x)
}

useEffect(()=>{console.log(information)},[information])


const mappingFinalData= () => {
    if(filteredResults){
   const result=filteredResults.map((x,idx)=><li key={idx} className={style.item_list} onClick={()=>{openModal(x);modalSituation(!information)}} >{x.original_title}</li>)
setMappedVal(result)
    }
// return result
}
const screenWidth=window.innerWidth
 const searchRef=useRef()
 
  return (
      <>
    <div className={style.main}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Logo
        {screenWidth>750&&
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <li className={style.menu}>Main Page</li>
          <li className={style.menu}>Movies</li>
          <li className={style.menu}>New And Popular</li>
          <li className={style.menu}>My List</li>
        </ul>
}
      </div>
      <div>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            listStyle: "none",
            gap: "0.5rem",
            cursor: "pointer",
            marginRight: "2rem",
            position: "relative",
          }}
        >
          <li className={style.menu} style={{ display: "flex" }}>
            <div style={{ position: "absolute", color: "gray", left: "3rem" }}>
              {showSearchIcon && <AiOutlineSearch />}
            </div>
            <input
              type="search"
              placeholder="     Search"
              className={style.search}
              ref={searchRef}
              onChange={searchIconEvent}
            onClick={()=>setShowSearchIcon(false)}
// onKeyUp={searchIconEvent}
            onMouseLeave={()=>setShowSearchIcon(true)}
            >
            </input>
          </li>
        </ul>
      </div>
    </div>
    {mappedVal&&
      <div className={style.search_list}><ul style={{listStyle:"none",padding:"0"}}>{mappedVal}</ul></div>
}
{details&&information &&
<Information data={details} modalSit={modalSituation} />
}

    </>
  );
};

export default Nav;
