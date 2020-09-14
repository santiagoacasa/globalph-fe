import React from 'react';
import PhotographerCard from './PhotographerCard';
import { Container } from 'react-bootstrap';


const PhotographersList = props => {
    const initialPhList = {
        results: props.history.location.state
    }
    const searchResults = [...initialPhList.results]

    const buildPage = () => {
        console.log(props.loggedUser)
        return searchResults.map(photographer => (
            <PhotographerCard key={photographer._id} photographer={photographer} loggedUser={props.loggedUser === null ? false : props.loggedUser } email={photographer.email} id={photographer._id} phone={photographer.phone} profilePic={photographer.profilePicUrl} firstName={photographer.firstName} lastName={photographer.lastName} />
        ))
    }
    
    return (        
        <Container>
            <div className="cardsContainer">
            {buildPage()}
            </div>
            
        </Container>  
    )
}

export default PhotographersList
