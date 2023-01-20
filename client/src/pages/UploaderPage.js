import React, { useState } from "react";
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

    

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

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

                        convertBase64(imageList[0].file)
                            .then(base64 => {
                                const formData = new FormData();
                                formData.append("image", imageList[0].file);
                                //formData.append("imageBase64", 'cfcfcfc');
                                axios({
                                    method: "post",
                                    url: "http://localhost:9000/.netlify/functions/api/upload",
                                    data: formData,
                                    headers: { "Content-Type": "multipart/form-data" }
                                })
                                    .then(() => console.info("SUCCESS!!!"))
                                    .catch((err) => console.info("ERROR>>", err));
                            })
                            .catch(err => {
                                console.info('convertBase64 ERROR: ', err);
                            });

                        
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
                            <img src={placeholderImage} alt="Here you will upload your content" />
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