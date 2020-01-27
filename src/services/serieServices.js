import database from '../database/models'
import sequelize from 'sequelize'
const op = sequelize.Op
class serieServices {
	static async createNewEpisode(newSerie) {
		const createdSerie = await database.series.create(newSerie);
		if(createdSerie) {
			return createdSerie
		}else{
			return null
		}
	}
	static async getSingleEpisode(id) {
		const episode = await database.series.findOne({
			where: { id }
		})
		if(episode) {
			return episode
		}else{
			return null
		}
	}
	static async getSingleSeason(videoId, season) {
		const data = await database.series.findAll({
			where: {
				[op.and]: [
					{ videoId },
					{ season }
				]
			}
		});
		if(Object.values(data).length > 0) {
			return data
		}else{
			return null
		}
	}
	static async getAllSeasons(videoId) {
		const data = await database.series.findAll({
			where:{ videoId },
			order: [
				['id','DESC']
			],
			group: ['id','season']
		})
		if(Object.values(data).length > 0) {
			return data
		}else{
			return null
		}
	}
	static async update(id, updates) {
		const updated = await database.series.update(updates, {
			where: { id }
		});
		if(updated) {
			return updated
		}else{
			return null
		}
	}
	static async deleteEpisode(id) {
		const deleted = await database.series.destroy(id, {
			returning: true
		});
		if(deleted) {
			return deleted
		}else{
			return null
		}
	}
}

export default serieServices