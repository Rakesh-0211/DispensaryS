import './manageStaff.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export const ManageStaff=()=>{
  return(
      <div className='add-staffs-box'>
        <form className='register-form'action="">
           <div className='register-form-div'>
              <div className='register-input-box'>
                <input className="input-box-register"type="text" placeholder='Staff Name'/>
              </div>
              <div className='register-input-box'>
                <input className="input-box-register"type="text" placeholder='Email Id'/>
              </div>
              <div className='register-input-box'>
                <input className="input-box-register"type="text" placeholder='Password'/>
              </div>
              <div className='register-input-box'>
                <input className="input-box-register"type="text" placeholder='Designation'/>
              </div>
              <div className='register-input-box'>
                <input className="input-box-register"type="text" placeholder='Mobile No.'/>
              </div>
           </div>
           <button type='submit' className='form-btn reg-btn'>Add</button>
        </form>
        <div className='list-staffs'>
            <div className='list-staff'>
                <div>Danish</div>
                <div className='list-staff-btns'>
                  <div style={{cursor:"pointer"}}><EditIcon/></div>
                  <div style={{cursor:"pointer"}}><DeleteIcon/></div>
                </div>
            </div>
            <div className='list-staff'>
                <div>Danish</div>
                <div className='list-staff-btns'>
                  <div style={{cursor:"pointer"}}><EditIcon/></div>
                  <div style={{cursor:"pointer"}}><DeleteIcon/></div>
                </div>
            </div>
            <div className='list-staff'>
                <div>Danish</div>
                <div className='list-staff-btns'>
                  <div style={{cursor:"pointer"}}><EditIcon/></div>
                  <div style={{cursor:"pointer"}}><DeleteIcon/></div>
                </div>
            </div>
            <div className='list-staff'>
                <div>Danish</div>
                <div className='list-staff-btns'>
                  <div style={{cursor:"pointer"}}><EditIcon/></div>
                  <div style={{cursor:"pointer"}}><DeleteIcon/></div>
                </div>
            </div>
        </div>
      </div>
  )
}