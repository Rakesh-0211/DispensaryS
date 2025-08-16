import React, { useState } from 'react'
import './addModal.css'
import axios from 'axios'

const AddModal = (props) => {
  const [image, setImage] = useState(null)

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', "college_dispensary");

    try {
      const response = await axios.post("https://api.cloudinary.com/v1_1/mashhuudanny/image/upload", data);
      const imageUrl = response.data.url;
      setImage(imageUrl);
    } catch (err) {
      console.log(err);
    }
  }

  const handleSubmit = async () => {
    await axios.post('http://localhost:4000/api/gallary/add', { link: image }, { withCredentials: true })
      .then(() => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className='addModal'>
      <div className='addModal-card'>
        <div>Add Image</div>

        {/* please watch the video for full code */}
        <input type="file" onChange={uploadImage} />

        {image && <div className='cancel-modal-btn' onClick={handleSubmit}>Submit</div>}
      </div>
    </div>
  )
}

export default AddModal
