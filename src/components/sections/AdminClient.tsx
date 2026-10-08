"use client";

import { useEffect, useState } from "react";
import { logout } from "@/app/login/actions";
import { Upload, Trash2, Save, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { MAX_UPLOAD_BYTES, isImageFile } from "@/lib/uploads";

interface ImageData {
  id: string;
  src: string;
  alt: string;
  order: number;
  category: string;
  publicId?: string;
}

const AdminClient = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("healthcare");

  const categories = [
    { key: "healthcare", title: "Healthcare", color: "bg-blue" },
    { key: "education", title: "Education", color: "bg-[#40AD53]" },
    { key: "government", title: "Government", color: "bg-[#C2B234]" },
    { key: "private", title: "Private", color: "bg-[#b7410e]" },
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/admin/images");
      const data = await res.json();
      setImages(data.images || []);
    } catch {
      toast.error("Error loading images");
    }
  };

  // Upload one file straight to Cloudinary, then record it in our database.
  // Throws an Error with a user-facing message on failure.
  const uploadFile = async (
    file: File,
    sig: Record<string, string | number>
  ): Promise<ImageData> => {
    if (file.size > MAX_UPLOAD_BYTES) {
      const sizeMb = (file.size / 1024 / 1024).toFixed(1);
      throw new Error(`File is ${sizeMb} MB (max is 10 MB)`);
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", String(sig.apiKey));
    formData.append("timestamp", String(sig.timestamp));
    formData.append("signature", String(sig.signature));
    formData.append("folder", String(sig.folder));
    formData.append("format", String(sig.format));

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
      { method: "POST", body: formData }
    );
    const cloudData = await cloudRes.json();
    if (!cloudRes.ok) {
      throw new Error(cloudData.error?.message || "Cloudinary upload failed");
    }

    const saveRes = await fetch("/api/admin/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        publicId: cloudData.public_id,
        version: cloudData.version,
        signature: cloudData.signature,
        secureUrl: cloudData.secure_url,
        originalFilename: cloudData.original_filename,
        category: selectedCategory,
      }),
    });
    const saved = await saveRes.json();
    if (!saveRes.ok) {
      throw new Error(saved.error || "Failed to save image");
    }
    return saved;
  };

  const handleUpload = async (files: File[]) => {
    if (files.length === 0) return;

    setLoading(true);

    try {
      const sigRes = await fetch("/api/admin/upload/sign", { method: "POST" });
      if (!sigRes.ok) {
        toast.error(
          sigRes.status === 401
            ? "Your session expired. Please sign in again."
            : "Could not start upload. Please try again."
        );
        return;
      }
      const sig = await sigRes.json();

      const uploadedImages: ImageData[] = [];
      const failures: string[] = [];

      for (const [i, file] of files.entries()) {
        setUploadProgress(`Uploading ${i + 1} of ${files.length}…`);
        try {
          uploadedImages.push(await uploadFile(file, sig));
        } catch (err) {
          const reason = err instanceof Error ? err.message : "Unknown error";
          failures.push(`${file.name}: ${reason}`);
        }
      }

      setImages((prev) => [...prev, ...uploadedImages]);

      if (uploadedImages.length > 0) {
        toast.success(
          `Uploaded ${uploadedImages.length} of ${files.length} image${
            files.length === 1 ? "" : "s"
          }`
        );
      }
      for (const failure of failures) {
        toast.error(`Upload failed — ${failure}`, { duration: 15000 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Check your connection and try again.");
    } finally {
      setLoading(false);
      setUploadProgress("");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    // Reset so picking the same file again still triggers onChange.
    e.target.value = "";
    handleUpload(files);
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/project-images/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Image deleted");
    }
  };

  const handleSaveOrder = async () => {
    toast.promise(
      fetch("/api/admin/images", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
      }),
      {
        loading: "Saving...",
        success: "Order saved!",
        error: "Failed to save order.",
      }
    );
  };

  const moveImage = (from: number, to: number, category: string) => {
    const categoryImages = images.filter((img) => img.category === category);
    const otherImages = images.filter((img) => img.category !== category);

    const [moved] = categoryImages.splice(from, 1);
    categoryImages.splice(to, 0, moved);

    // Reorder within category
    categoryImages.forEach((img, i) => (img.order = i));

    setImages([...otherImages, ...categoryImages]);

    // Prevent scroll caused by focus on button
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const getImagesByCategory = (category: string) => {
    return images
      .filter((img) => img.category === category)
      .sort((a, b) => a.order - b.order);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    const files = dropped.filter(isImageFile);

    for (const skipped of dropped.filter((file) => !isImageFile(file))) {
      toast.error(`Skipped ${skipped.name} — not an image file`);
    }

    handleUpload(files);
  };
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>

          <form action={logout}>
            <button
              type="submit"
              className="text-white bg-blue hover:bg-darkblue px-4 py-2 rounded cursor-pointer"
            >
              Sign Out
            </button>
          </form>
        </div>

        {/* Category Selection */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Select Category for Upload
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category.key
                    ? `${category.color} text-white`
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed p-6 rounded text-center cursor-pointer bg-white hover:bg-gray-50 transition"
        >
          <label className="cursor-pointer block">
            <Upload className="w-6 h-6 mx-auto text-gray-500" />
            <span className="block text-sm text-gray-600 mt-2">
              Click or drag & drop to upload images to{" "}
              <strong>
                {categories.find((c) => c.key === selectedCategory)?.title}
              </strong>{" "}
              category
            </span>
            <span className="block text-xs text-gray-400 mt-1">
              JPG, PNG, or iPhone HEIC photos up to 10 MB
            </span>
            <input
              type="file"
              multiple
              accept="image/*,.heic,.heif"
              onChange={handleFileInput}
              disabled={loading}
              className="hidden"
              id="fileInput"
            />
          </label>

          {loading && (
            <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-600">
              <Loader2 className="animate-spin text-gray-500" />
              {uploadProgress}
            </div>
          )}
        </div>

        {/* Images by Category */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryImages = getImagesByCategory(category.key);

            if (categoryImages.length === 0) return null;

            return (
              <div
                key={category.key}
                className="bg-white p-6 rounded-lg shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-4 h-4 rounded-full ${category.color}`}
                  ></div>
                  <h3 className="text-xl font-semibold">
                    {category.title} Projects
                  </h3>
                  <span className="text-sm text-gray-500">
                    ({categoryImages.length} images)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {categoryImages.map((img, idx) => (
                    <div
                      key={img.id}
                      className="border rounded-sm overflow-hidden bg-white shadow"
                    >
                      <div className="relative aspect-square">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>

                      <div className="p-3 text-sm space-y-1">
                        <p className="font-medium">{img.alt}</p>
                        <p className="text-xs text-gray-400 truncate">
                          {img.publicId}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {idx > 0 && (
                            <button
                              onClick={() =>
                                moveImage(idx, idx - 1, category.key)
                              }
                              className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              ↑
                            </button>
                          )}
                          {idx < categoryImages.length - 1 && (
                            <button
                              onClick={() =>
                                moveImage(idx, idx + 1, category.key)
                              }
                              className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              ↓
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(img.id)}
                            className="ml-auto px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {images.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleSaveOrder}
              className="mt-4 px-6 py-2 bg-blue text-white rounded hover:bg-darkblue"
            >
              <Save className="inline-block mr-2" size={16} />
              Save Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClient;
