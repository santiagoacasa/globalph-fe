import React, { useState } from 'react';
import CrudService from '../helpers/crud-service';
import { Redirect } from 'react-router-dom';
import PhotographerCard from './PhotographerCard';


const PhotographersList = props => {
    const initialPhList = {
        results: props.history.location.state
    }
    const searchResults = [...initialPhList.results]

    const [state, setState] = useState(initialPhList)


    const buildPage = () => {
        return searchResults.map(photographer => (
            <PhotographerCard key={photographer._id} id={photographer._id} profilePic={photographer.profilePicUrl} firstName={photographer.firstName} lastName={photographer.lastName} />
        ))
    }

    return (
        <div>
            {buildPage()}
        </div>   
    )
}

export default PhotographersList
