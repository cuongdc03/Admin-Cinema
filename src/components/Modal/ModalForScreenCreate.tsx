import React, { useState } from 'react';
import { Modal, Input, Select } from 'antd';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

const { Option } = Select;

interface Seat {
  price: number;
  isSeat: boolean;
  name: string;
  isOff: boolean;
  isSold: boolean;
  onHold: string;
  colId: number;
  seatId: number;
}

interface RowData {
  rowName: string;
  rowSeats: Seat[];
}

interface ModalForScreenAddProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (screenData: any) => void;
}

const ModalForScreenAdd: React.FC<ModalForScreenAddProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [screenName, setScreenName] = useState('');
  const [screenType, setScreenType] = useState('');
  const [seatMatrix, setSeatMatrix] = useState<RowData[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScreenName(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setScreenType(value);
  };

  const generateSeatMatrix = (rows: number, cols: number) => {
    const matrix: RowData[] = [];
    for (let i = 0; i < rows; i++) {
      const rowSeats: Seat[] = [];
      for (let j = 0; j < cols; j++) {
        rowSeats.push({
          price: 0,
          isSeat: true,
          name: `${i + 1}-${j + 1}`,
          isOff: false,
          isSold: false,
          onHold: '',
          colId: j,
          seatId: i * cols + j,
        });
      }
      matrix.push({ rowName: `Row ${i + 1}`, rowSeats });
    }
    setSeatMatrix(matrix);
  };

  const handleNextStep = () => {
    if (screenName && screenType) {
      switch (screenType) {
        case 'large':
          generateSeatMatrix(16, 16);
          break;
        case 'medium':
          generateSeatMatrix(12, 12);
          break;
        case 'small':
          generateSeatMatrix(8, 8);
          break;
      }
      setCurrentStep(2);
    } else {
      toast.error('Please enter screen name and select screen type.');
    }
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);

      const newScreen = {
        id: Date.now(), // Giả lập ID, bạn có thể thay thế bằng ID từ server
        name: screenName,
        type: screenType,
        seatMatrix: JSON.stringify({ data: seatMatrix }),
      };

      // Gọi API để lưu thay đổi
      const response = await fetch('https://bl924snd-3000.asse.devtunnels.ms//admin/screen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newScreen),
      });

      if (!response.ok) {
        throw new Error(`Failed to save screen: ${response.status}`);
      }

      toast.success('Add screen successfully');
      onSave(newScreen);
      onClose();
    } catch (error) {
      toast.error('Add screen failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  return (
    <Modal
      zIndex={100}
      height={800}
      width={800}
      title="Add Screen"
      visible={isVisible}
      onCancel={onClose}
      footer={
        currentStep === 2 ? (
          <Button key="submit" type="primary" loading={isSaving} onClick={handleSaveChanges} className='bg-blue-400'>
            Save Changes
          </Button>
        ) : (
          <>
            <Button key="next" type="primary" onClick={handleNextStep}>
              Continue
            </Button>
          </>
        )
      }
    >
      {/* Step 1: Thông tin cơ bản */}
      {currentStep === 1 && (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Screen Name
            </label>
            <Input
              value={screenName}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Screen Type
            </label>
            <Select
              value={screenType}
              onChange={handleTypeChange}
              className="w-full"
            >
              <Option value="large">Loại to: 16 x 16</Option>
              <Option value="medium">Loại vừa: 12 x 12</Option>
              <Option value="small">Loại nhỏ: 8 x 8</Option>
            </Select>
          </div>
        </div>
      )}

      {/* Step 2: Chỉnh sửa ma trận ghế */}
      {currentStep === 2 && (
        <div className='flex justify-center'>
          <SeatMatrixEditor 
            seatMatrix={JSON.stringify({ data: seatMatrix })}
            onChange={(newMatrix) => setSeatMatrix(JSON.parse(newMatrix).data)}
          />
        </div>
      )}
    </Modal>
  );
};

export default ModalForScreenAdd;
