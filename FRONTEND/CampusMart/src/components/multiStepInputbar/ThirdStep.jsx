import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function StepThree({ formData, setFormData }) {
    const [preview, setPreview] = useState(null);

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            setFormData((data) => ({ ...data, file }));
            setPreview(URL.createObjectURL(file)); // Create preview URL
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview); // Cleanup object URL to avoid memory leaks
            }
        };
    }, [preview]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {"image/*":[]},
        multiple: false,
    });

    return (
        <div className="w-full h-full min-h-[265px] px-4 flex flex-col justify-center gap-4">
            <h2 className="text-cyello text-[26px]"> Set Image</h2>
            <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-500 rounded-lg p-6 text-center cursor-pointer bg-cyello text-white hover:bg-gray-700"
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop your image here...</p>
                ) : (
                    <p>Drag & drop an image, or click to select</p>
                )}
            </div>
            {formData.file && preview && (
                <div className="mt-4">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-400"
                    />
                </div>
            )}
        </div>
    );
}
