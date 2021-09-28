const clientId =
  "814919894202-l54frd207jap5gtoc8kd5oa8ldggd2uj.apps.googleusercontent.com";
const apiKey = "Your API Key";
const rootUrl = "https://www.googleapis.com/youtube/v3";

const youtube = {
  getVideos: (pageToken = "") => {
    return fetch(
      `${rootUrl}/videos?key=${apiKey}&chart=mostPopular&part=snippet,contentDetails,id,statistics&maxResults=20${
        pageToken && "&pageToken=" + pageToken
      }`
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        return res?.items.map((video) => ({
          videoId: video?.id,
          title: video?.snippet?.localized?.title,
          description: video?.snippet?.description,
          publishTime: video?.snippet?.publishedAt,
          videoThumbnail: video?.snippet?.thumbnails?.high?.url,
          duration: video?.contentDetails?.duration,
          viewCount: video?.statistics?.viewCount,
          commentCount: video?.statistics?.commentCount,
          channelTitle: video?.snippet?.channelTitle,
          channelId: video?.snippet?.channelId,
          videoDescription: video?.snippet?.description,
          likeCount: video?.statistics?.likeCount,
          dislikeCount: video?.statistics?.dislikeCount,
          nextPageToken: res?.nextPageToken,
        }));
      })
      .catch((e) => e);
  },

  getVideo: (videoId, nextPageToken = "") => {
    return fetch(
      `${rootUrl}/videos?key=${apiKey}&id=${videoId}&part=snippet,contentDetails,id,statistics`
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        let video = res?.items[0];
        return {
          videoId: video?.id,
          title: video?.snippet?.localized?.title,
          description: video?.snippet?.description,
          publishTime: video?.snippet?.publishedAt,
          videoThumbnail: video?.snippet?.thumbnails?.high?.url,
          duration: video?.contentDetails?.duration,
          viewCount: video?.statistics?.viewCount,
          commentCount: video?.statistics?.commentCount,
          channelTitle: video?.snippet?.channelTitle,
          channelId: video?.snippet?.channelId,
          videoDescription: video?.snippet?.description,
          likeCount: video?.statistics?.likeCount,
          dislikeCount: video?.statistics?.dislikeCount,
          nextPageToken: nextPageToken,
        };
      })
      .catch((e) => e);
  },

  getChannelInfo: (channelId) => {
    return fetch(
      `${rootUrl}/channels?key=${apiKey}&id=${channelId}&part=snippet,statistics`
    )
      .then((response) => response.json())
      .catch((e) => e);
  },

  getVideoComments: (videoId, pageToken = "") => {
    return fetch(
      !pageToken
        ? `${rootUrl}/commentThreads?key=${apiKey}&part=snippet,id&videoId=${videoId}&maxResults=20`
        : `${rootUrl}/commentThreads?key=${apiKey}&part=snippet,id&videoId=${videoId}&maxResults=10&pageToken=${pageToken}`
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        return res?.items.map((comment) => ({
          commentId: comment?.snippet?.topLevelComment?.id,
          author: comment?.snippet?.topLevelComment?.snippet?.authorDisplayName,
          authorProfileImg:
            comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl,
          likeCount: comment?.snippet?.topLevelComment?.snippet?.likeCount,
          text: comment?.snippet?.topLevelComment?.snippet?.textOriginal,
          publishTime: comment?.snippet?.topLevelComment?.snippet?.publishedAt,
          nextPage: res.nextPageToken,
        }));
      })
      .catch((e) => e);
  },

  getVideoSearchResults: (searchQuery) => {
    return fetch(
      `${rootUrl}/search?key=${apiKey}&part=snippet,id&maxResults=40&q=${searchQuery}&type=video`
    )
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        return res?.items.map((video) => ({
          videoId: video?.id?.videoId,
          nextPageToken: res?.nextPageToken,
        }));
      })
      .catch((e) => {
        return e;
      });
  },
};

export default youtube;
