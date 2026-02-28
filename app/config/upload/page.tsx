"use client";
import { ImageIcon, Loader2, MousePointerSquareDashed } from "lucide-react";
import Dropzone, { FileRejection } from "react-dropzone";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
// todo: current lesson learned notice the heights because sometimes u need defiened specific height not just h-full
//? states to consider => rejected, accepted, uploading, pending(when navigating to next step)
/*i nedd to give a height so i can use the image cmopnent with fill, i can trial and error (yt as well did this)
    with min-h-[calc(4rem for nav and 4 rem for footer and 8px trial and error to prevert overscroll
    and at same time make the footer fit good last)]
    height can be trialed and errored safely unlike width due to screen sizes*/

export default function Upload() {
  const router = useRouter();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [pending, startTransition] = useTransition();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const { configId } = data.serverData;
      //show loading state while user is redirected
      startTransition(() => {
        router.push(`/config/design?id=${configId}}`);
      });
    },
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
    onUploadError: () => {
      toast.error("Error while uploading, please try again", {
        classNames: {
          toast: "bg-red-800! text-white!",
          description: "text-red-300!",
        },
      });
    },
  });
  return (
    <Dropzone
      // the configId here is what we told the server we will pass
      // using the zod validation, so we can access the image in the next steps
      onDropAccepted={(acceptedFiles: File[]) =>
        startUpload(acceptedFiles, { configId: undefined })
      }
      onDropRejected={(rejectedFiles: FileRejection[]) => {
        toast.error(`${rejectedFiles[0].file.name.split(".").pop()} type is not supported.`, {
          description: <p>Please choose a PNG, JPG, JPEG image instead.</p>,
          classNames: {
            toast: "bg-red-800! text-white!",
            description: "text-red-300!",
          },
        });
      }}
      accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          className={`flex h-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 transition-all duration-200 ${
            isDragActive
              ? "scale-[1.02] border-green-500 bg-green-50 shadow-2xl"
              : "border-slate-300 bg-gray-200/70 hover:border-green-400 hover:bg-green-50/50"
          } `}
        >
          <input {...getInputProps()} />
          <div
            className={`text-sm font-normal transition-colors duration-200 ${isDragActive ? "text-green-600" : "text-slate-500"}`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              {isDragActive ? (
                <>
                  <MousePointerSquareDashed />
                  <p className="text-gray-600">
                    <span className="font-bold text-zinc-600">Drop image here </span>to upload
                  </p>
                  <p className="text-[12px]">PNG, JPG, JPEG</p>
                </>
              ) : isUploading ? (
                <>
                  <Loader2 className="animate-spin text-green-600" />
                  <p>Uploading...</p>
                  <Progress className="w-40 bg-green-300 text-green-600" value={uploadProgress} />
                </>
              ) : pending ? (
                <>
                  <Loader2 className="animate-spin text-green-600" />
                  <p>Redirecting, please wait...</p>
                </>
              ) : (
                <>
                  <ImageIcon />
                  <p className="text-gray-600">
                    <span className="font-bold text-zinc-600">Click to upload</span> or drag and
                    drop
                  </p>
                  <p className="text-[12px]">PNG, JPG, JPEG</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Dropzone>
  );
}
