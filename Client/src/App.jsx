import React, { useReducer, useRef, useState } from 'react'
import CropperModal from './Components/CropperModal';

const App = () => {


  const inputRef = useRef(null);

  const [uploadImage, setUploadImage] = useState(null);
  const [imageAfterCrop, setImageAfterCrop] = useState(null)
  const [inputKey, setInputKey] = useState(Date.now());

  const handleImageUpload = (e) => {


    const file = e.target.files[0];

    if (!file)
      return;

    const imageURL = URL.createObjectURL(file);
    setUploadImage(imageURL);


  }

  const closeModal = () => {


    console.log("Close Modal Triggered")

    if (uploadImage) {
      URL.revokeObjectURL(uploadImage);
    }

    setUploadImage(null);
    inputRef.current.value = null;
    setInputKey(Date.now());
  }
  return (

    <>



      <div className='w-full sm:w-[90%] md:w-[80%] lg:w-[60%] mt-50 p-4 mx-auto my-auto border border-white flex flex-col space-y-4 justify-around align-center'>

        <h1 className='text-2xl text-center'>React Image Cropper Tool</h1>

        <input type='file' className='file-input file-input-secondary' accept='image/*' ref={inputRef} onChange={handleImageUpload} />


        {uploadImage && <CropperModal onClose={closeModal} imageSrc={uploadImage} setUploadImage={setUploadImage} imageAfterCrop={imageAfterCrop} setImageAfterCrop={setImageAfterCrop} />}


        {imageAfterCrop && <div className='mt-4 mx-auto h-50 w-50 rounded-full overflow-hidden border border-white'><img src={imageAfterCrop} className='object-contain h-full w-full' /></div>}
      </div>


    </>


  )
}

export default App