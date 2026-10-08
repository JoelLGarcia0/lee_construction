"use client";

import { useEffect, useState } from "react";
import { logout } from "@/app/login/actions";
import { Upload, Trash2, Save, Loader2, ArrowUp, ArrowDown } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { MAX_UPLOAD_BYTES, isImageFile } from "@/lib/uploads";
import { SECTORS } from "@/lib/sectors";
import { button } from "@/lib/styles";
import Title from "@/components/sections/Title";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

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
  // Photo waiting for the user to confirm deletion (null = dialog closed).
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("healthcare");

  const categories = SECTORS;

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
    setPendingDelete(null);
    const res = await fetch(`/api/admin/project-images/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setImages((prev) => prev.filter((img) => img.id !== id));
      toast.success("Photo deleted");
    } else {
      toast.error("Couldn't delete the photo. Please try again.");
    }
  };

  const handleSaveOrder = async () => {
    // Send IDs in the order they appear on screen, category by category.
    const ordered = categories.flatMap((category) =>
      getImagesByCategory(category.key).map((img) => ({ id: img.id }))
    );

    toast.promise(
      fetch("/api/admin/images", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ images: ordered }),
      }).then((res) => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
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
  const iconButton =
    "flex h-8 w-8 items-center justify-center border border-gray-300 text-darkblue hover:bg-darkblue hover:text-white hover:border-darkblue transition-colors cursor-pointer";

  return (
    <main className="min-h-screen bg-greybg">
      <Title title="Admin Panel" />

      <div className="px-8 py-10 md:py-14">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-gray-700">
              {images.length} project {images.length === 1 ? "photo" : "photos"}
            </p>
            <div className="flex flex-wrap gap-3">
              {images.length > 0 && (
                <button
                  onClick={handleSaveOrder}
                  className={`${button.primaryCompact} cursor-pointer`}
                >
                  <Save size={16} aria-hidden="true" />
                  Save Order
                </button>
              )}
              <form action={logout}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-5 py-3 border border-darkblue text-darkblue text-sm font-bold uppercase tracking-wider hover:bg-darkblue hover:text-white transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </form>
            </div>
          </div>

          {/* Upload */}
          <section className="bg-white border border-gray-200 p-6 md:p-8">
            <h2 className="text-lg font-bold text-darkblue">
              Select Category for Upload
            </h2>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 border-t border-l border-gray-300">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  aria-pressed={selectedCategory === category.key}
                  className={`px-4 py-3 border-r border-b border-gray-300 font-title uppercase tracking-wide transition-colors cursor-pointer ${
                    selectedCategory === category.key
                      ? "bg-darkblue text-white"
                      : "bg-white text-darkblue hover:bg-greybg"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="mt-6 border-2 border-dashed border-gray-300 p-8 text-center bg-greybg hover:border-blue transition-colors"
            >
              <label className="cursor-pointer block">
                <Upload className="w-7 h-7 mx-auto text-blue" aria-hidden="true" />
                <span className="block text-sm text-gray-700 mt-3">
                  Click or drag & drop to upload images to{" "}
                  <strong className="text-darkblue">
                    {categories.find((c) => c.key === selectedCategory)?.title}
                  </strong>{" "}
                  category
                </span>
                <span className="block text-xs text-gray-500 mt-1">
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
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700">
                  <Loader2 className="animate-spin text-blue" aria-hidden="true" />
                  {uploadProgress}
                </div>
              )}
            </div>
          </section>

          {/* Images by Category */}
          {categories.map((category) => {
            const categoryImages = getImagesByCategory(category.key);

            if (categoryImages.length === 0) return null;

            return (
              <section
                key={category.key}
                className="bg-white border border-gray-200 p-6 md:p-8"
              >
                <div className="flex items-baseline justify-between gap-4 mb-5">
                  <h2 className="text-lg font-bold text-darkblue">
                    {category.title} Projects
                  </h2>
                  <span className="text-sm text-gray-500">
                    {categoryImages.length} images
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {categoryImages.map((img, idx) => (
                    <div key={img.id} className="border border-gray-200 bg-white">
                      <div className="relative aspect-[4/3] bg-greybg">
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <span className="absolute top-2 left-2 bg-darkblue/85 text-white text-xs font-bold px-2 py-1">
                          {idx + 1}
                        </span>
                      </div>

                      <div className="p-3 text-sm">
                        <p className="font-medium text-gray-800 truncate" title={img.alt}>
                          {img.alt}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          {idx > 0 && (
                            <button
                              onClick={() => moveImage(idx, idx - 1, category.key)}
                              aria-label="Move up"
                              className={iconButton}
                            >
                              <ArrowUp size={14} aria-hidden="true" />
                            </button>
                          )}
                          {idx < categoryImages.length - 1 && (
                            <button
                              onClick={() => moveImage(idx, idx + 1, category.key)}
                              aria-label="Move down"
                              className={iconButton}
                            >
                              <ArrowDown size={14} aria-hidden="true" />
                            </button>
                          )}
                          <button
                            onClick={() => setPendingDelete(img.id)}
                            aria-label="Delete image"
                            className="ml-auto flex h-8 w-8 items-center justify-center bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}

          {images.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleSaveOrder}
                className={`${button.primary} cursor-pointer`}
              >
                <Save size={16} aria-hidden="true" />
                Save Order
              </button>
            </div>
          )}
        </div>
      </div>
      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this photo?"
        message="It will be removed from the website permanently. This can't be undone."
        confirmLabel="Delete"
        onConfirm={() => pendingDelete && handleDelete(pendingDelete)}
        onCancel={() => setPendingDelete(null)}
      />
    </main>
  );
};

export default AdminClient;
