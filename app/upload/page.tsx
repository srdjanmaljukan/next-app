"use client";
import React, { useState } from "react";
import { CldUploadWidget, CldImage } from "next-cloudinary";

const UploadPage = () => {

    interface CloudinaryResult {
        public_id: string
    }

    const [publicId, setPublicId] = useState("")

  return (
    <>
      {publicId && <CldImage src={publicId} width={270} height={180} alt="image" />}
      <CldUploadWidget
        uploadPreset="clyxdxfm"
        options={{
            sources: ["local"],
            multiple: false,
            maxFiles: 10,
            styles: {}
        }}
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as CloudinaryResult
          setPublicId(info.public_id)
        }}
      >
        {({ open }) => (
          <button className="btn btn-primary" onClick={() => open()}>
            Upload
          </button>
        )}
      </CldUploadWidget>
    </>
  );
};

export default UploadPage;
