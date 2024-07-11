import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Select, Row, Col, Space } from 'antd';
import SeatMatrixEditor from '../SeatMatrix/SeatMatrixEditor';

interface CustomModalforScreenProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (screenData: any) => void; // Callback to save changes
  screenId: number; // Screen ID to fetch data
}

const CustomModalforScreen: React.FC<CustomModalforScreenProps> = ({
  isVisible,
  onClose,
  onSave,
  screenId,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [screenData, setScreenData] = useState({
    id: '',
    name: '',
    width: '',
    height: '',
    seatMatrix: '',
  });
  const [seatMatrix, setSeatMatrix] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchScreenData = async () => {
      try {
        const response = await fetch(
          `https://bl924snd-3000.asse.devtunnels.ms/screen/${screenId}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch screen data');
        }

        const data = await response.json();
        setScreenData(data); // Update screenData state
        setSeatMatrix(JSON.parse(data.seatMatrix || '[]')); // Parse seatMatrix and update state
      } catch (error) {
        console.error('Error fetching screen data:', error);
      }
    };

    if (screenId) {
      fetchScreenData();
      console.log(screenData)
    }
  }, [screenId]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setScreenData({ ...screenData, [name]: value });
  };

  const handleSeatMatrixChange = (newMatrix: any[]) => {
    setSeatMatrix(newMatrix);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      // Convert seatMatrix to the format you need
      const formattedSeatMatrix = JSON.stringify(seatMatrix);
      const updatedScreenData = { ...screenData, seatMatrix: formattedSeatMatrix };
      await onSave(updatedScreenData);
      onClose();
      setIsSaving(false);
    } catch (error) {
      console.error('Error saving screen data:', error);
      setIsSaving(false);
    }
  };

  const handleBackStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };
console.log(screenData);

  return (
    <Modal
      title="Edit Screen"
      visible={isVisible}
      onCancel={onClose}
      footer={
        currentStep === 3 ? (
          <Button key="submit" type="primary" loading={isSaving} onClick={handleSaveChanges}>
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
      {currentStep === 1 && (
        <Form layout="vertical" onFinish={handleNextStep}>
          <Form.Item label="Screen ID" name="id">
            <Input value={screenData.id} onChange={handleInputChange} disabled />
          </Form.Item>
          <Form.Item label="Screen Name" name="name">
            <Input value={screenData.name} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Width" name="width">
            <Input type="number" value={screenData.width} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item label="Height" name="height">
            <Input type="number" value={screenData.height} onChange={handleInputChange} />
          </Form.Item>
        </Form>
      )}

      {currentStep === 2 && (
        <div>
          {/* Implement Seat Matrix Editor here */}
          <SeatMatrixEditor
            seatMatrix={seatMatrix}
            onChange={handleSeatMatrixChange}
          />
        </div>
      )}
    </Modal>
  );
};

// SeatMatrixEditor component (Implement based on your needs)

export default CustomModalforScreen;