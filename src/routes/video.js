import { Router } from "express";
import video from "../controllers/video";
import access from "../middlewares/access";
import earnings from "../controllers/earning";
import billing from "../middlewares/billing";
import timeValidator from "../middlewares/validation/watchedTime";
import { updateVideo } from "../middlewares/validation/video";
// import imageValidation from '../middlewares/validators/imageValidator'
const router = new Router();
router.post("/new", access.isAdmin, video.addVideo);
router.post("/watch-session", access.isNormalUser, video.createNewWatchCount);
router.get("/all/local", access.isAdmin, video.getAllVideosLocal);
router.get("/sort/pop", video.getVideosByPopularity);
router.get("/sort/category", video.getVideosByCategory);
router.get("/sort/trend", video.getVideosByTrend);
router.get("/search", video.search);

// router.get('/unique', access.isNormalUser, billing.trial,
// billing.verifyPermissionLevel, video.getVideoById); removed temporarily billing.trial
router.get(
  "/unique",
  access.isNormalUser,
  billing.verifyPermissionLevel,
  video.getVideoById
);
router.get("/cp/unique", access.isAdmin, video.getVideoById);
router.get("/arrivals", video.getAllNewVideos);
router.get("/earnings", earnings.getAllEarningsPerVideo);
router.get("/main/ft", video.getMainFeaturedFilm);
router.get("/second/ft", video.getSecondFeaturedFilm);
router.get("/sort/type", access.isProducer, video.getAllVideosByType);
router.put("/", access.isAdmin, updateVideo, video.updateVideos);
router.put("/set-featured", access.isAdmin, video.featureVideo);
router.delete("/", access.isAdmin, video.deleteAvideo);
router.post("/time", access.isNormalUser, timeValidator, video.saveWatchedTime);
router.get("/time", access.isNormalUser, video.getWatchedTime);
router.get("/sharable/:id", video.SharableVideo);

export default router;
