module.exports = (sequelize, DataTypes) => {
  const series = sequelize.define(
    "series",
    {
      episode: DataTypes.STRING,
      episodeKey: DataTypes.STRING,
      season: DataTypes.STRING,
      episodeName: DataTypes.STRING,
      videoId: DataTypes.STRING,
      thumbNailUrl: DataTypes.STRING,
      suspensionState: DataTypes.BOOLEAN,
      synopsis: DataTypes.TEXT,
      clientId: DataTypes.STRING,
      episodeNumber: DataTypes.INTEGER,
      EnSubt: DataTypes.STRING,
      FrSubt: DataTypes.STRING,
      seriesId: DataTypes.STRING,
      disabled: DataTypes.BOOLEAN,
    },
    {}
  );

  return series;
};
