import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SwitcherFour from './Switchers/SwitcherFour';

interface TableColumn {
  name: string;
  field: string; // Tên thuộc tính của object
  width: number; // Độ rộng của cột (tính theo phần trăm)
  hidden?: boolean; // Cột có ẩn hay không
  type?: 'link' | 'switch'; // Kiểu dữ liệu của cột
  linkPath?: string; // Đường dẫn link cho cột loại link
  switchStateKey?: string; // Tên thuộc tính để lấy trạng thái switch
  switchToggleHandler?: (index: number) => void; // Hàm xử lý khi toggle switch
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn[];
  onCheckboxChange?: (index: number) => void; // Hàm xử lý khi checkbox thay đổi
}

const GenericTable: React.FC<TableProps<any>> = ({
  data,
  columns,
  onCheckboxChange,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (index: number) => {
    setSelectedRows((prevRows) => {
      if (prevRows.includes(index)) {
        return prevRows.filter((row) => row !== index);
      } else {
        return [...prevRows, index];
      }
    });
    onCheckboxChange && onCheckboxChange(index); // Gọi hàm onCheckboxChange nếu có
  };

  const toggleAllSwitches = () => {
    setSelectAll(!selectAll);
    setSelectedRows(
      selectAll ? [] : Array.from({ length: data.length }, (_, index) => index),
    );
  };

  const renderColumn = (item: any, column: TableColumn, index: number) => {
    if (column.type === 'link') {
      return (
        <Link
          to={column.linkPath?.replace(':id', item[column.field].toString())}
          className="text-sm text-blue-600 hover:underline"
        >
          {item[column.field]}
        </Link>
      );
    } else if (column.type === 'switch') {
      return (
        <SwitcherFour
          enabled={item[column.switchStateKey]} // Sử dụng column.switchStateKey để truy cập trạng thái
          toggle={() =>
            column.switchToggleHandler && column.switchToggleHandler(index)
          }
        />
      );
    } else {
      return (
        <p className="text-sm text-black dark:text-white">
          {item[column.field]}
        </p>
      );
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="py-6 px-4 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Cinema List
        </h4>
      </div>

      <div
        className={`grid grid-cols-${
          columns.filter((c) => !c.hidden).length + 1
        } border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5`}
      >
        <div className="col-span-1 flex items-center">
          {/* Checkbox for selecting all rows */}
          <input
            type="checkbox"
            checked={selectAll}
            onChange={toggleAllSwitches}
          />
        </div>
        {columns
          .filter((c) => !c.hidden)
          .map((column) => (
            <div
              key={column.name}
              className={`col-span-${column.width} flex items-center`}
            >
              <p className="font-medium">{column.name}</p>
            </div>
          ))}
      </div>

      {data.map((item, index) => (
        <div
          key={index}
          className={`grid grid-cols-${
            columns.filter((c) => !c.hidden).length
          } border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-12 md:px-6 2xl:px-7.5`}
        >
          <div className="col-span-1 flex items-center">
            {/* Checkbox for each row */}
            <input
              type="checkbox"
              checked={selectedRows.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
          </div>
          {columns
            .filter((c) => !c.hidden)
            .map((column) => (
              <div
                key={column.name}
                className={`col-span-${column.width} flex items-center`}
              >
                {renderColumn(item, column, index)}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default GenericTable;
