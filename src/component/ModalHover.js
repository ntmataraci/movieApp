import style from "./ModalHover.module.css"
const ModalHover = (props) =>{
    return (
        <>
        {console.log(props.sender)}
<div className={style.main}>
    <img src={props.sender} className={style.photo}></img>
    </div>
</>
    )
}

export default ModalHover