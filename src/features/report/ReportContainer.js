import ReportCard from './ReportCard';
import * as adminService from '../../api/adminApi';
import { useEffect, useState } from 'react';

function ReportContainer() {
  const [isReport, setIsReport] = useState([]);
  useEffect(() => {
    getReported();
  }, []);

  const getReported = async () => {
    try {
      const res = await adminService.getAllReported();
      setIsReport(res.data.reportedPosts);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(isReport);
  return (
    <>
      {isReport?.map((reported) => (
        <ReportCard key={reported.id} reported={reported} />
      ))}
    </>
  );
}

export default ReportContainer;
