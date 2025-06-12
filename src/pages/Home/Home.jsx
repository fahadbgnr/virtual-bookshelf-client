import React from 'react';
import UserReview from './UserReview';
import Banner from './Banner';
import ReadingStatus from './ReadingStatus';

const Home = () => {
    return (
        <div>
           <div className='my-10 w-11/12 mx-auto'>
             <Banner></Banner>
             <ReadingStatus></ReadingStatus>
             <UserReview></UserReview>
           </div>
        </div>
    );
};

export default Home;