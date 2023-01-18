import React, { useState, useEffect } from "react";
import "./UploaderPage.css";
import placeholderImage from "../images/image.svg";
import ImageUploading from "react-images-uploading";
import axios from "axios";

const UploaderPage = () => {
    const [images, setImages] = useState([]);

    // useEffect(() => {
    //     fetch("/api")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.info(data.message);

    //         })
    //         .catch((err) => console.info("ERROR: " + err));
    // }, []);

    return (
        <div className="main-container">
            <div className="uploader-container">
                <h2 className="title">Upload your image</h2>
                <h5 className="subtitle">File should be Jpeg, Png,...</h5>
                <ImageUploading
                    value={images}
                    onChange={(imageList, addUpdateIndex) => {
                        console.info(imageList);
                        //setImages(imageList);

                        const formData = new FormData();
                        formData.append("image", imageList[0].file);
                        axios({
                            method: "post",
                            url: "/upload",
                            data: formData,
                            headers: { "Content-Type": "multipart/form-data" }
                        })
                            .then(() => console.info("SUCCESS!!!"))
                            .catch((err) => console.info("ERROR>>", err));
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