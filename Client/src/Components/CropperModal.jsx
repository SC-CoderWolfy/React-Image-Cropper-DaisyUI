import React, { useEffect, useState } from 'react';
import Cropper from 'react-easy-crop';

const CropperModal = ({ onClose, imageSrc, setUploadImage, imageAfterCrop, setImageAfterCrop }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);

    const handleCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const handleCropDone = (imageCroppedArea, event) => {
        event.preventDefault(); // Prevent form submission

        if (!imageCroppedArea) return; // Ensure croppedArea exists

        const canvasElement = document.createElement("canvas");
        canvasElement.width = imageCroppedArea.width;
        canvasElement.height = imageCroppedArea.height;

        const context = canvasElement.getContext("2d");

        let imageObj1 = new Image();
        imageObj1.src = imageSrc;

        imageObj1.onload = function () {
            context.drawImage(
                imageObj1,
                imageCroppedArea.x,
                imageCroppedArea.y,
                imageCroppedArea.width,
                imageCroppedArea.height,
                0,
                0,
                imageCroppedArea.width,
                imageCroppedArea.height
            );

            const dataURL = canvasElement.toDataURL("image/jpeg");
            setImageAfterCrop(dataURL);
            setUploadImage(null);
        };
    };


    const handleCropCancel = () => {


        console.log("Handle Crop Cancel");
        onClose();
    }

    // Log imageAfterCrop when it updates
    useEffect(() => {
        if (imageAfterCrop) {
            console.log("Cropped image:", imageAfterCrop);
        }
    }, [imageAfterCrop]);

    useEffect(() => {
        if (imageSrc) {
            document.getElementById('my_modal_3').showModal();
        }
    }, [imageSrc]);

    return (
        <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg text-center mb-4">Image Cropper</h3>

                <form className="flex flex-col items-center space-y-4 min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh]">
                    <div className="w-full h-[30vh] md:h-[40vh] lg:h-[50vh] relative">
                        <Cropper
                            image={imageSrc}
                            aspect={1 / 1}
                            crop={crop}
                            zoom={zoom}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={handleCropComplete}
                            style={{ containerStyle: { width: "100%", height: "100%", backgroundColor: "#ffffff" } }}
                        />
                    </div>

                    <div className="action-btn-container flex justify-center space-x-2">
                        <button
                            type="submit"
                            className="btn btn-accent"
                            onClick={(e) => handleCropDone(croppedArea, e)}
                        >
                            Crop Image
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleCropCancel()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default CropperModal;