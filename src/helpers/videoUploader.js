import axios from "axios";
import { getSignedUrl } from "./aws";

const videoUploader = async (
  video,
  landScape,
  portrait,
  nameTag,
  type,
  extension
) => {
  const urls = {};
  const files = { video, landScape, portrait, nameTag };
  urls.portraitUrl = await getSignedUrl("cinetie-thumbnails", "image/*", "jpg");
  urls.landscapeUrl = await getSignedUrl(
    "cinetie-thumbnails",
    "image/*",
    "jpg"
  );
  urls.nameTagUrl = await getSignedUrl("cinetie-thumbnails", "image/*", "png");
  urls.videoUrl =
    type === "movie"
      ? await getSignedUrl("cinetie-temp-movies", "video/*", extension)
      : null;
  for (const key in urls) {
    const file = files[key.slice(0, -4)];
    if (urls[key]) {
      // this.setState({ uploading: key });
      await axios.put(urls[key].url, file, {
        headers: { "Content-Type": type },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
        },
      });
    }
  }
  return urls;
};

export default videoUploader;
