import React, { useState, useEffect } from 'react';
import { Modal, Input, message } from 'antd';
import SeatMatrixEditor from '../SeatMatrix/SeatMatrixEditor';
import { Button } from '@mui/material';

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

interface ModalForScreenEditProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (screenData: any) => void;
  screen: any;
}

const ModalForScreenEdit: React.FC<ModalForScreenEditProps> = ({
  isVisible,
  onClose,
  onSave,
  screen,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [seatMatrix, setSeatMatrix] = useState<RowData[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (screen) {
      setSeatMatrix(screen.seatMatrix ? JSON.parse(screen.seatMatrix).data : []);
    }
  }, [screen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSave({ ...screen, [name]: value });
  };

  const handleSeatMatrixChange = (newMatrix: string) => {
    onSave({ ...screen, seatMatrix: newMatrix });
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);

      // Gọi API để lưu thay đổi
      const response = await fetch(`https://bl924snd-3000.asse.devtunnels.ms//admin/screen/${screen.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(screen), 
      });

      if (!response.ok) {
        throw new Error(`Failed to save screen: ${response.status}`);
      }

      message.success('Update screen successfully');
      onClose();
    } catch (error) {
      console.error('Error saving screen data:', error);
      message.error('Update screen failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <Modal
      height={800}
      width={800}
      title="Edit Screen"
      visible={isVisible}
      onCancel={onClose}
      footer={
        currentStep === 2 ? (
          <Button key="submit" type="primary" loading={isSaving} onClick={handleSaveChanges} className='bg-blue-400'>
            Save Changes
          </Button>
        ) : (
          <>
            {currentStep > 1 && (
              <Button key="back" onClick={handleBackStep}>
                Back
              </Button>
            )}
            <Button key="next" type="primary" onClick={handleNextStep}>
              Continue
            </Button>
          </>
        )
      }
    >
      {/* Step 1: Thông tin cơ bản */}
      {currentStep === 1 && screen && (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Screen ID
            </label>
            <Input
              value={screen.id}
              onChange={handleInputChange}
              disabled
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Screen Name
            </label>
            <Input
              name="name"
              value={screen.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Width
            </label>
            <Input
              type="number"
              name="width"
              value={screen.width}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Height
            </label>
            <Input
              type="number"
              name="len"
              value={screen.len}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
      )}

      {/* Step 2: Chỉnh sửa ma trận ghế */}
      {currentStep === 2 && screen && (
        <div className='flex justify-center'>
          <SeatMatrixEditor 
            seatMatrix={screen.seatMatrix}
            onChange={handleSeatMatrixChange}
          />
        </div>
      )}
    </Modal>
  );
};

export default ModalForScreenEdit;