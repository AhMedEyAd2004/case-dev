import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

// this will run once image is uploaded from user\
// all of this happens on server and passes configId variable to the client
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    //? client passes configId to the server here, and server validates type to be string
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input }; //means {input : input} == {input : {configId:"1234"} }
      //key here is named input not the actual input object it doesnt make any sense
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { configId: metadata.input.configId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
