import React, { useState } from "react";
import "./UploaderPage.css";
import placeholderImage from "../images/image.svg";
import ImageUploading from "react-images-uploading";
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { withRouter } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UploaderPage = ({ history }) => {
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const hiddenFileInput = React.useRef(null);

    const handleClose = () => {
        setErrorMessage("");
    };

    const uploadImage = (file) => {
        setUploading(true);

        const formData = new FormData();
        formData.append("image", file);
        axios({
            method: "post",
            url: window._env_.REACT_APP_API_URL + "/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then((result) => {
                setUploading(false);
                history.push({
                    pathname: "/success",
                    state: {
                        imageUrl: result.data.url
                    }
                });
            })
            .catch((err) => {
                setUploading(false);
                setErrorMessage(err.message);
            });
    };

    return (
        <div className="main-container">
            {uploading ? (
                <div className="loading-container">
                    <h2 className="uploading-label">Uploading...</h2>
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                </div>
            ) : (
                <div className="uploader-container">
                    <h2 className="title">Upload your imageSSXX</h2>
                    <h5 className="subtitle">File should be Jpeg, Png,...</h5>
                    <ImageUploading
                        value={[]}
                        onChange={(imageList, addUpdateIndex) => {
                            uploadImage(imageList[0].file);
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
                    <input
                        type="file"
                        ref={hiddenFileInput}
                        onChange={(event) => {
                            uploadImage(event.target.files[0]);
                        }}
                        accept="image/jpeg"
                        style={{display: 'none'}}
                    />
                    <button
                        className="file-button"
                        onClick={() => {
                            hiddenFileInput.current.click();
                        }}
                    >
                        Choose a file
                    </button>
                </div>
            )}

            <Dialog
                open={errorMessage.trim() !== ""}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Error"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Ok</Button>
                </DialogActions>
            </Dialog>
            
        </div>
    );
};

export default withRouter(UploaderPage);