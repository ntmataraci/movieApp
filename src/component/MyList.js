import { useEffect,useState,useReducer } from "react"
import SectionAsRow from "./SectionAsRow"

const MyList = (props) => {
const [myList,setMyList]=useState([])


let removeData=props.sendRemoveData
const receivedData=props.data

useEffect(()=>{
if(receivedData){
   setMyList((prev)=>[...prev,receivedData])
    }
  },[props.data])


const filteredFirstList=myList.map(x=>{
return(
   props.sendInformation.filter(item=>item.id===x)
    )
  })
const filteredList=filteredFirstList.map(x=>x[0])

 
const removingData= () => {

  if(removeData){
const removeFromFilter=filteredList.map(x=>x.id).indexOf(removeData)
filteredList.splice(removeFromFilter,1)
const listArray=[filteredList.map(x=>x.id)][0]
return listArray
  }
}


useEffect(()=>{
  if(removeData && filteredList){
 setMyList(removingData())
  }
},[removeData])

props.receiveMyList(myList)

    return(
        <>
 <SectionAsRow sendInformation={filteredList} getData={props.getData} getRemoveData={props.getRemoveData} myList={myList}/> 

        </>
    )
}

export default MyList