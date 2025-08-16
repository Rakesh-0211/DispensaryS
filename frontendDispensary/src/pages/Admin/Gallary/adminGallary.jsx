import React, { useState, useEffect } from 'react'
import './adminGallary.css'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddModal from './AddModal/addModal';
import DeleteModal from './DeleteModal/deleteModal';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

export const AdminGallary = (props) => {
  const [addModal, setAddModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [data, setData] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);

  const setAddModalFunc = () => {
    setAddModal(prev => !prev);
  }

  const setDeleteModalFunc = (item = null) => {
    if (deleteModal) {
      setClickedItem(null);
    } else {
      setClickedItem(item);
    }
    setDeleteModal(prev => !prev);
  }

  const fetchData = async () => {
    try {
      const resp = await axios.get('http://localhost:4000/api/gallary', { withCredentials: true });
      setData(resp.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='gallary-admin'>
      <div className='go-back'>
        <Link to={'/admin/dashboard'}>
          <ArrowBackIcon /> Back To Dashboard
        </Link>
      </div>

      {/* please watch the video for full code */}
      <div className='add-pic-gallary-btn' onClick={setAddModalFunc}>Add</div>

      <div className='gallary-home'>
        {data.map((item) => {
          return (
            <div key={item._id} className='gallary-item'>
              <img src={item.link} alt="Gallery" />
              <div className='delete-btn' onClick={() => setDeleteModalFunc(item)}>Delete</div>
            </div>
          );
        })}
      </div>

      {addModal && <AddModal onClose={setAddModalFunc} />}
      {deleteModal && <DeleteModal clickedItem={clickedItem} onClose={setDeleteModalFunc} />}
      <ToastContainer />
    </div>
  )
}
