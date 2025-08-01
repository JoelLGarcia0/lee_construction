"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Upload, Trash2, Save, Loader2 } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface ImageData {
  id: string;
  src: string;
  alt: string;
  order: number;
  publicId?: string;
}

const AdminClient = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(false);

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

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);

    try {
      const uploadedImages: ImageData[] = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          uploadedImages.push(data);
        }
      }

      setImages((prev) => [...prev, ...uploadedImages]);
      toast.success("Upload complete!");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
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

  const moveImage = (from: number, to: number) => {
    const updated = [...images];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    updated.forEach((img, i) => (img.order = i));
    setImages(updated);

    // Prevent scroll caused by focus on button
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length === 0) return;

    // Convert to DataTransfer to simulate input behavior
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));

    // Trigger handleUpload using a synthetic input event
    const fakeEvent = {
      target: { files: dataTransfer.files },
    } as unknown as React.ChangeEvent<HTMLInputElement>;

    handleUpload(fakeEvent);
  };
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Panel</h1>

          <button
            onClick={handleSignOut}
            className="text-white bg-blue hover:bg-darkblue px-4 py-2 rounded cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed p-6 rounded text-center cursor-pointer bg-white hover:bg-gray-50 transition"
        >
          <label className="cursor-pointer block">
            <Upload className="w-6 h-6 mx-auto text-gray-500" />
            <span className="block text-sm text-gray-600 mt-2">
              Click or drag & drop to upload images
            </span>
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              id="fileInput"
            />
          </label>

          {loading && (
            <Loader2 className="animate-spin mx-auto mt-3 text-gray-500" />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images
            .sort((a, b) => a.order - b.order)
            .map((img, idx) => (
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
                        onClick={() => moveImage(idx, idx - 1)}
                        className="text-xs px-2 py-1 bg-gray-200 rounded"
                      >
                        ↑
                      </button>
                    )}
                    {idx < images.length - 1 && (
                      <button
                        onClick={() => moveImage(idx, idx + 1)}
                        className="text-xs px-2 py-1 bg-gray-200 rounded"
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
