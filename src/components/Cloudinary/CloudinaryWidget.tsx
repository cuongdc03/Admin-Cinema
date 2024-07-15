import React from 'react';
import { WidgetLoader, Widget } from 'react-cloudinary-upload-widget';

interface CloudinaryWidgetProps {
  cloudName: string;
  onSuccess: (result: any) => void;
}

const CloudinaryWidget: React.FC<CloudinaryWidgetProps> = ({ cloudName, onSuccess }) => {
  const handleUploadSuccess = (result: any) => {
    if (result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      onSuccess(result.info);
    }
  };

  return (
    <div className="rounded-lg border border-stroke shadow-default dark:border-strokedark">
      <WidgetLoader /> 
      <Widget
        sources={['local', 'url']}
        cloudName={cloudName}
        uploadPreset='vanlanhdh'
        resourceType='image'
        buttonText='Choose Picture'
        cropping={false}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
};

export default CloudinaryWidget;
