import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartTwo from '../../components/Charts/ChartTwo';
import { FaMoneyBill, FaUserPlus, FaTicketAlt, FaChartLine } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Revenue of the day" total="$3.456K" rate="0.43%" levelUp>
          <FaMoneyBill className="fill-primary dark:fill-white" size={22} />
        </CardDataStats>
        <CardDataStats title="New Customer Amount" total="$45,2K" rate="4.35%" levelUp>
          <FaUserPlus className="fill-primary dark:fill-white" size={20} />
        </CardDataStats>
        <CardDataStats title="Total Ticket sold" total="2.450" rate="2.59%" levelUp>
          <FaTicketAlt className="fill-primary dark:fill-white" size={22} />
        </CardDataStats>
        <CardDataStats title="Total revenue" total="3.456" rate="0.95%" levelDown>
          <FaChartLine className="fill-primary dark:fill-white" size={22} />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  );
};

export default Dashboard;
