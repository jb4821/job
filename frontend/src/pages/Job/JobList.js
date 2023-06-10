import React from 'react'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import JobListContent from './JobListContent';

const JobList = () => {
  return (
    <>
      <Navbar />
      <JobListContent />
      <Footer />
    </>
  );
}

export default JobList