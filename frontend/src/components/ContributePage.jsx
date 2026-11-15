
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  UploadCloud,
  FileArchive,
  ImagePlus,
  CheckCircle2,
} from "lucide-react";

function ContributePage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [techStack, setTechStack] = useState("");
  const [license, setLicense] = useState("MIT");
  const [sourceFile, setSourceFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputStyle =
    "w-full rounded-lg border border-[#303030] bg-[#101010] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#555] focus:border-blue-500";

  const labelStyle = "mb-2 block text-sm text-[#aaa]";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sourceFile) {
      alert("Please upload your template ZIP file.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("type", type);
      formData.append("techStack", techStack);
      formData.append("license", license);
      formData.append("sourceFile", sourceFile);

      if (previewImage) {
        formData.append("previewImage", previewImage);
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/templates/contribute`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-5 text-white">
        <div className="max-w-md text-center">
          <CheckCircle2 size={55} className="mx-auto text-green-400" />

          <h1 className="mt-6 text-2xl font-semibold">
            Submission Received!
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#888]">
            Your template has been submitted for review.
            We'll notify you once it has been reviewed.
          </p>

          <button
            onClick={() => navigate("/templates")}
            className="mt-8 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Back to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-5 py-10 text-white md:px-10">

      <div className="mx-auto max-w-3xl">

        <button
          onClick={() => navigate("/templates")}
          className="mb-10 flex items-center gap-2 text-sm text-[#888] transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Library
        </button>

        <div className="mb-10">
          <span className="text-sm text-blue-400">
            FLUX COMMUNITY
          </span>

          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">
            Share what you've built.
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#888]">
            Contribute your templates and help other developers
            build faster with Flux.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Template Name */}
          <div>
            <label className={labelStyle}>Template Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Modern Developer Portfolio"
              className={inputStyle}
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelStyle}>Description</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your template..."
              className={inputStyle}
            />
          </div>

          {/* Category and Type */}
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className={labelStyle}>Category</label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={inputStyle}
              >
                <option value="">Select category</option>
                <option value="portfolio">Portfolio & Resume</option>
                <option value="landing-pages">Landing Pages</option>
                <option value="components">UI Components</option>
                <option value="dashboards">Dashboards</option>
                <option value="applications">Application Starters</option>
                <option value="snippets">Code Snippets</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>Template Type</label>
              <select
                required
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={inputStyle}
              >
                <option value="">Select type</option>
                <option value="full-project">Full Project</option>
                <option value="component">Component</option>
                <option value="snippet">Code Snippet</option>
              </select>
            </div>

          </div>

          {/* Technology */}
          <div>
            <label className={labelStyle}>Technology Stack</label>
            <input
              required
              value={techStack}
              onChange={(e) => setTechStack(e.target.value)}
              placeholder="React, Tailwind CSS, Node.js..."
              className={inputStyle}
            />
            <p className="mt-2 text-xs text-[#555]">
              Separate technologies using commas.
            </p>
          </div>

          {/* ZIP Upload */}
          <div>
            <label className={labelStyle}>Source Code (ZIP)</label>

            <label className="flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-[#383838] bg-[#101010] px-5 py-10 text-center transition hover:border-blue-500/50">
              <UploadCloud size={27} className="text-blue-400" />

              <span className="mt-4 text-sm text-white">
                {sourceFile ? sourceFile.name : "Upload your template ZIP"}
              </span>

              <span className="mt-2 text-xs text-[#666]">
                ZIP files only
              </span>

              <input
                type="file"
                accept=".zip,application/zip"
                className="hidden"
                onChange={(e) => setSourceFile(e.target.files[0])}
              />
            </label>
          </div>

          {/* Preview Image */}
          <div>
            <label className={labelStyle}>
              Preview Image (Optional)
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-[#383838] bg-[#101010] p-5 transition hover:border-blue-500/50">
              <ImagePlus size={22} className="text-blue-400" />

              <div>
                <p className="text-sm text-white">
                  {previewImage ? previewImage.name : "Upload preview image"}
                </p>
                <p className="mt-1 text-xs text-[#666]">
                  PNG, JPG or WEBP
                </p>
              </div>

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={(e) => setPreviewImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* License */}
          <div>
            <label className={labelStyle}>License</label>

            <select
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className={inputStyle}
            >
              <option value="MIT">MIT License</option>
              <option value="Apache-2.0">Apache 2.0</option>
              <option value="GPL-3.0">GPL 3.0</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          {/* Review Notice */}
          <div className="rounded-lg border border-blue-500/20 bg-blue-500/5 p-4">
            <div className="flex gap-3">
              <FileArchive size={19} className="shrink-0 text-blue-400" />
              <p className="text-xs leading-6 text-[#888]">
                Every submission is reviewed before appearing in the
                Flux Library. Make sure you have permission to share
                the source code and its included assets.
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 py-3.5 text-sm font-medium text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Template"}
            {!loading && <ArrowUpRight size={17} />}
          </button>

        </form>
      </div>
    </div>
  );
}

export default ContributePage;
