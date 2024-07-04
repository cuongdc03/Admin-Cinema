import React from 'react';
const ScreenList: React.FC = () => {
  // Dummy data for screen list
  const screens = [
    { name: 'Cinema 1', type: 'Standard', seats: 120, rows: '10 (A -> J)', columns: '12 (1 -> 12)', date: '31-03-2024' },
    { name: 'Cinema 2', type: 'Standard', seats: 140, rows: '10 (A -> J)', columns: '14 (1 -> 14)', date: '31-03-2024' },
    { name: 'IMAX', type: 'IMAX', seats: 168, rows: '12 (A -> L)', columns: '14 (1 -> 14)', date: '31-03-2024' },
  ];

  return (
    <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark p-4">
      <h2 className="text-lg font-extrabold mb-4 left-8">Screen list</h2>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-strokedark">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screen Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Screen Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seat Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Row</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Create</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className=" divide-y divide-gray-200 dark:divide-strokedark">
          {screens.map((screen, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{screen.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{screen.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{screen.seats}</td>
              <td className="px-6 py-4 whitespace-nowrap">{screen.rows}</td>
              <td className="px-6 py-4 whitespace-nowrap">{screen.columns}</td>
              <td className="px-6 py-4 whitespace-nowrap">{screen.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="mr-2 px-3 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScreenList;
