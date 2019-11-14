import database from '../database/models';


//will be changed to adapt a very good search algorithm 
class videoService {
    static async getVideoById(videoId) {
        try {
            const video = await database.videos.findOne({
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                where: {videoId}
            });
            if (video) {
                return video;
            } else {
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
    
    static async createNewVideo(video) {
        try {
          return  await database.videos.create(video);
        } catch (error) {
            throw error;
        }
    }

    static async updateVideo(videoId, newVideo) {
        try {
            return await database.videos.update(newVideo, {
                where: {videoId}
            });
        } catch (error) {
            throw error;
        }
    }
    static async deleteVideo(videoId) {
        try {
            return await database.videos.destroy({
                returning: true,
                where: {videoId}
            });
        } catch (error) {
            throw error;
        }
    }
    static async getAllVideos() {
        try {
            return await database.videos.findAll();
        } catch (error) {
            throw error;
        }
    }
}
export default videoService;