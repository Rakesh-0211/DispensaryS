import './SearchBox.css'
import SearchIcon from '@mui/icons-material/Search';
export const SearchBox=(props)=>{
  const placeholder=props.placeholder?props.placeholder:"";
  const value=props.value?props.value:"";
  const handleOnChange=(event)=>{
     if(props.onChange){
      props.onChange(event.target.value);
     }
  }
  const handleClick=()=>{
    if(props.handleClick){
       props.handleClick();
    }
  }
  return(
    <div className='page-searchBox'>
        <input className="input-box"type="text" placeholder={placeholder} value={value}
        onChange={(event)=>handleOnChange(event)}/>
        <div className='search-btn' onClick={handleClick}><SearchIcon/></div>
      </div>
  )
}