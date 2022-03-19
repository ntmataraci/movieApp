import style from "./Button.module.css"
const Button = ({sendPos,receivePos}) => {

const posValue = (x) => {
   receivePos(x)
}



    return(
        <>
        <div style={{display:"flex",alignItems:"center",height:"250px"}}>
        <button className={style.main+" "+style.left} onClick={() => sendPos < 0 && posValue(1)} > &lt; </button>
        <button className={style.main+" "+style.right}  onClick={() => sendPos > -2 && posValue(-1)} > &gt; </button>
        </div>
        </>
    )
}

export default Button