import React, { useState } from "react";
import "./PreviewPage.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { withRouter } from "react-router-dom";

const PreviewPage = ({ history }) => {
    const [isCopied, setIsCopied] = useState(false);
    const { imageUrl } = history.location.state;

    function unsecuredCopyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error('Unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
    }

    async function copyTextToClipboard(text) {
        if (navigator.clipboard) {
          return await navigator.clipboard.writeText(text);
        } else {
          return unsecuredCopyToClipboard(text);
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