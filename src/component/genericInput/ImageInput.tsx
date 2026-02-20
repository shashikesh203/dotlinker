import React, { useState, useEffect } from "react";

type Variant = "doctor_profile" | "patient_signature";

interface FileInputProps {
  name: string;
  className: string;
  variant?: Variant;
  formData: Record<string, any>;
  setFormData: (data: Record<string, any>) => void;

  // 🔹 RHF props added
  value?: File | string | null; // ✅ string URL support added
  onChange?: (file: File | null) => void;
}

const MAX_SIZE = 2 * 1024 * 1024; // 2MB

const ImageInput: React.FC<FileInputProps> = ({
  name,
  className,
  variant = "file",
  formData,
  setFormData,
  value,
  onChange,
}) => {
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const file = value || formData[name];

  useEffect(() => {
    if (!file) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);
      return;
    }
    if (typeof file === "string") {
      setPreview(file);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;

    setError("");

    setFormData({
      ...formData,
      [name]: selectedFile,
    });

    onChange && onChange(selectedFile);
  };

  return (
    <div className="w-full border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="flex justify-center hidden sm:block">
          <div className="flex items-center gap-4">
            <label className="relative cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="inline-block px-6 py-2 bg-white border border-gray-400 rounded-md text-gray-800 text-sm font-medium hover:bg-gray-50">
                Upload Image
              </span>
            </label>

            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {typeof file === "string"
                ? "Already Uploaded"
                : file?.name || "No file chosen"}
            </span>
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <div className="flex justify-center">
          <div
            className={`${className} rounded-md border border-dashed flex items-center justify-center overflow-hidden bg-gray-50`}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-xs text-gray-400 text-center px-2">
                Upload Image
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center sm:hidden mt-4">
          <div className="flex items-center gap-4">
            <label className="relative cursor-pointer">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="inline-block px-2 py-1 bg-white border border-gray-400 rounded-md text-gray-800 text-sm font-medium hover:bg-gray-50">
                Upload Image
              </span>
            </label>

            <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {typeof file === "string"
                ? "Already Uploaded"
                : file?.name || "No file chosen"}
            </span>
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
