import React, { useState } from "react";
import "./UploaderPage.css";
import placeholderImage from "../images/image.svg";
import ImageUploading from "react-images-uploading";

const UploaderPage = () => {
    const [images, setImages] = useState([]);
    return (
        <div className="main-container">
            <div className="uploader-container">
                <h2 className="title">Upload your image</h2>
                <h5 className="subtitle">File should be Jpeg, Png,...</h5>
                <ImageUploading
                    value={images}
                    onChange={(imageList, addUpdateIndex) => {
                        console.info(imageList);
                        setImages(imageList);
                    }}
                    maxNumber={1}
                    dataURLKey="data_url"
                    acceptType={["jpg"]}
                >
                    {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                    }) => (
                        <div className="drop-container" {...dragProps}>
                            <img src={placeholderImage} />
                            <h2 className="drag-drop-text">Drag & Drop your image here</h2>
                        </div>
                    )}
                </ImageUploading>
                <h2 className="or-text">Or</h2>
                <button className="file-button">Choose a file</button>
            </div>
        </div>
    );
};

export default UploaderPage;