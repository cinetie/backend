import database from '../database/models'
import sequelize from 'sequelize'
const op = sequelize.Op
class serieServices {
	static async createNewEpisode(newSerie) {
		const createdSerie = await database.series.create(newSerie);
		(createdSerie) ? createdSerie : null
	}
	static async getSingleEpisode(id) {
		const episode = await database.series.findOne({
			where: { id }
		});
		(Object.values(episode).length == 1) ? episode : null
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
		(Object.values(data).length > 0) ? data : null
	}
	static async getAllSeasons(videoId) {
		const data = await database.series.findAll({
			group: 'season',
			where:
                { videoId }

		});
		(Object.values(data).length > 0) ? data : null
	}
	static async update(id, updates) {
		const updated = await database.series.update(updates, {
			where: { id }
		});
		(updated) ? updated : null
	}
	static async deleteEpisode(id) {
		const deleted = await database.series.destroy(id, {
			returning: true
		});
		(deleted) ? deleted : null
	}
}

export default serieServices