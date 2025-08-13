import './manageEvent.css'
import DeleteIcon from '@mui/icons-material/Delete';
export const ManageEvent=()=>{
      return(
        <div>
          <form className='register-form'action="">
           <div >
              <div className='register-input-box'>
                <input className="input-box-register mngEventInp"type="text" placeholder='Staff Name'/>
              </div>
              
           </div>
           <button type='submit' className='form-btn reg-btn'>Add</button>
        </form>
       <div className='list-staffs'>
            <div className='list-staff'>
                <div>Danish</div>
                <div className='list-staff-btns'>
                  
                  <div style={{cursor:"pointer"}}><DeleteIcon/></div>
                </div>
            </div>
            </div>

        </div>
      )
}