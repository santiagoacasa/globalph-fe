import React, { useState } from 'react';
import UploadService from '../../helpers/upload-service';
import CrudService from '../../helpers/crud-service';
import Thumbnail from '../Thumbnail';
import { Container, Row, Col } from 'react-bootstrap';

const PortfolioEdit = (props) => {
  const [loadingState, setLoading] = useState({ loading: false });
  const [uploadState, setUpload] = useState({ finishedUpload: '' });
  const [loggedUser, setUser] = useState(props.loggedUser);
  const uploadService = new UploadService();
  const crudService = new CrudService();

  const handleUploadPics = async ({ target }) => {
    try {
      setLoading({ loading: !loadingState.loading });
      const uploadData = new FormData();
      const files = target.files;
      console.log(files);
      for (let i = 0; i < files.length; i++) {
        uploadData.append(`portfolioPics`, files[i]);
      }
      const picturesPath = await uploadService.uploadPortfolioPics(uploadData);
      setLoading({ loading: false });
      setUpload({ finishedUpload: 'Images uploaded succesfully!' });
      const portfolio = picturesPath.portfolioPics.map((file) => file.path);
      console.log(portfolio);
      updateUserPorfolio(portfolio)
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserPorfolio = (portfolio) => {
    let updatedUser = {
        ...loggedUser
      };
      updatedUser.portfolio = [...loggedUser.portfolio, ...portfolio]
      crudService.updateProfile(updatedUser)
      .then(response => {
          localStorage.setItem('loggedUser', JSON.stringify(response.updatedUser))
          props.cbUpdateLoggedUser()
      })
      .catch(err => console.log(err))
  };

  const generateThumbnails = () => {
    return props.loggedUser.portfolio.map((picture, idx) => (
      <Row key={idx}>
        <Col>
          <Thumbnail image={picture} />
        </Col>
      </Row>
    ));
  };

  return (
    <div>
      <h3>Portfolio</h3>
      <div>
        <div>
          <label htmlFor="portfolioPics">Upload new photos</label>
          <input
            type="file"
            name="portfolioPics"
            id=""
            onChange={handleUploadPics}
            multiple
          />
        </div>
        {loadingState.loading ? (
          <img
            width="32px"
            height="32px"
            src="https://3.bp.blogspot.com/-T_2Mk0VWsPs/WKh_DNP_02I/AAAAAAAABF4/oBTlwNI52u8mdo9Y5deIxBzg7Em4n2pvQCLcB/s400/loading%2Bgif%2B1.gif"
            alt="loading"
          />
        ) : (
          <p>{uploadState.finishedUpload}</p>
        )}
      </div>
      <Container>
        {props.loggedUser.portfolio.length > 0 ? generateThumbnails() : ''}
      </Container>
    </div>
  );
};

export default PortfolioEdit;
