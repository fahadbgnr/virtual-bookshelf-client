import React from 'react';
import UserReview from './UserReview';
import Banner from './Banner';
import ReadingStatus from './ReadingStatus';
import FeautureCategory from './FeautureCategory/FeautureCategory';
import PopularBooks from './PopularBooks';
import { Helmet } from 'react-helmet';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>BookNest||Home</title>
      </Helmet>
      <div className='my-10 w-11/12 mx-auto'>
        <Banner></Banner>
        <PopularBooks></PopularBooks>
        <FeautureCategory></FeautureCategory>
        <ReadingStatus></ReadingStatus>
        <UserReview></UserReview>
      </div>
    </div>
  );
};

export default Home;