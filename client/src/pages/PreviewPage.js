import React, { useState } from "react";
import "./PreviewPage.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { withRouter } from "react-router-dom";

const PreviewPage = ({ history }) => {
    const [isCopied, setIsCopied] = useState(false);
    const { imageUrl } = history.location.state;

    async function copyTextToClipboard(text) {
        if ('clipboard' in navigator) {
          return await navigator.clipboard.writeText(text);
        } else {
          return document.execCommand('copy', true, text);
        }
    };

    return (
        <div className="main-container">
            <div className="preview-container">
                <div className="icon-container">
                    <CheckCircleIcon fontSize="inherit" htmlColor="#219653" />
                </div>
                
                <h2 className="title">Uploaded Successfully!</h2>

                <div className="uploaded-image" style={{ backgroundImage: `url(${imageUrl})`  }} />

                <div className="image-url-container">
                    <input type="text" className="image-url-field" readOnly={true} value={imageUrl} />
                    <button
                        className="copy-link-button"
                        onClick={() => {
                            copyTextToClipboard(imageUrl)
                                .then(() => {
                                    // If successful, update the isCopied state value
                                    setIsCopied(true);
                                    setTimeout(() => {
                                        setIsCopied(false);
                                    }, 1500);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }}
                    >
                        {isCopied ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(PreviewPage);