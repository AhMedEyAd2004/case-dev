import { Metadata } from "next";

export function constructMetaData({
  title = "CaseCobra - custom high-quality phone cases",
  description = "Create custom hight-quality phone cases in seconds",
  image = "/thumbnail.png",
  icons = "",
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: image }] },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: new URL("https://case-cobradev.vercel.app"),
    ...(icons && { icons }), // ✅ only included if icons exists
  };
}
