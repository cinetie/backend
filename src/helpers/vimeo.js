/* eslint-disable no-useless-catch */
import fetch from 'node-fetch';

class vimeo {
  static async viemoUpload(data) {
    try {
      const raw = {
        upload: {
          approach: 'pull',
          size: String(data.size),
          link: String(data.videoUrl)
        }
      };
      const videoData = await fetch('https://api.vimeo.com/me/videos', {
        headers: {
          Authorization: `bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.vimeo.*+json;version=3.4',
        },
        method: 'POST',
        body: JSON.stringify(raw)
      });
      const videoDataJson = await videoData.json();
      if (videoDataJson) {
        return videoDataJson.uri;
      }
    } catch (error) {
      throw error;
    }
  }
}
export default vimeo;
