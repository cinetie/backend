module.exports = (sequelize, DataTypes) => {
  const videos = sequelize.define(
    "videos",
    {
      videoLink: DataTypes.STRING,
      videoKey: DataTypes.STRING,
      videoId: DataTypes.STRING,
      videoName: DataTypes.STRING,
      videoCast: DataTypes.TEXT,
      videoSynopsis: DataTypes.TEXT,
      videoWatchCount: DataTypes.INTEGER,
      videoThumbnailLink: DataTypes.STRING,
      videoIdVimeo: DataTypes.STRING,
      videoClientId: DataTypes.STRING,
      videoSuspensionState: DataTypes.STRING,
      creationTime: DataTypes.BIGINT,
      category: DataTypes.STRING,
      featureType: DataTypes.INTEGER,
      isFeatured: DataTypes.BOOLEAN,
      tallThumbNailLink: DataTypes.STRING,
      nameTagThumbNailLink: DataTypes.STRING,
      resCountries: DataTypes.STRING,
      type: DataTypes.STRING,
      rate: DataTypes.STRING,
      EnSubt: DataTypes.STRING,
      FrSubt: DataTypes.STRING,
      licenseEndDate: DataTypes.STRING,
      language: DataTypes.STRING,
    },
    {}
  );
  // eslint-disable-next-line no-unused-vars
  videos.associate = function (models) {
    // associations can be defined here
  };
  return videos;
};
