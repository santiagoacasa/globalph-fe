import React, { useState } from 'react';
import UploadService from '../../helpers/upload-service';

const PortfolioEdit = () => {

    const uploadService = new UploadService()

    const handleUploadPics = ({target}) => {
        const uploadData = new FormData()
        const files = target.files
        console.log(files)
        for( let i = 0; i < files.length; i++) {
            uploadData.append(`portfolioPics`, files[i])
        }
        uploadService.uploadPortfolioPics(uploadData)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }


    return (
        <div>
            <h3>Edit your Portfolio</h3>
            <input type="file" name="portfolioPics" id=""  onChange={handleUploadPics} multiple/>
        </div>
    )
}

export default PortfolioEdit
