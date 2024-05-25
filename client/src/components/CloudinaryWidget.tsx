import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";

interface CloudinaryWidgetProps {
  onUpload: (url: string) => void;
}

export const CloudinaryWidget: React.FC<CloudinaryWidgetProps> = ({
  onUpload,
}) => {
  const [widget, setWidget] = useState<any>(null);

  useEffect(() => {
    if (window.cloudinary) {
      setWidget(createWidget());
    } else {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      script.onload = () => {
        setWidget(createWidget());
      };
      document.body.appendChild(script);
    }
  }, []);

  const createWidget = () => {
    return window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "adnanshanto",
        uploadPreset:
          process.env.REACT_APP_CLOUDINARY_UPLOAD_PERSET || "degendrop",
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          onUpload(result.info.secure_url);
        } else {
          console.error("Upload error:", error);
        }
      }
    );
  };

  const openWidget = () => {
    if (widget) {
      widget.open();
    } else {
      console.error("Cloudinary widget not initialized");
    }
  };

  return (
    <Button id="upload_widget" variant="contained" onClick={openWidget}>
      Upload Image
    </Button>
  );
};
