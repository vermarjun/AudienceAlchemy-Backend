import axios from "axios"
import { analyzeAllComments } from "../PrespectiveAnalysis.js";

async function fetchComments(videoId, maxResults = 20) {
    const API_KEY = process.env.YT_API_KEY;
    let comments = [];
    let nextPageToken = null;
  
    do {
      const commentsUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=${maxResults}&pageToken=${nextPageToken || ""}`;
  
      try {
        const response = await axios.get(commentsUrl);
        const commentsData = response.data;
  
        comments = comments.concat(
          commentsData.items.map(item => {
            const snippet = item.snippet.topLevelComment.snippet;
            return {
              author: snippet.authorDisplayName,
              comment: snippet.textDisplay,
              videoId: videoId,
            };
          })
        );
  
        nextPageToken = commentsData.nextPageToken;
      } catch (error) {
        console.error("Error fetching comments:", error.message);
        break;
      }
    } while (nextPageToken && comments.length < maxResults);
    return comments;
  }

function getYouTubeVideoId(url) {
    try {
      // Create a URL object
      const urlObj = new URL(url);

      const videoId = urlObj.searchParams.get('v');
  
      return videoId;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }

export const ytVideoAnalysis = async (req, res) => {
    try {
        const { ytVideoLink } = req.body;
        
        // Check for missing fields
        if (!ytVideoLink) {
            return res.status(400).json({ 
                message: "Video Link to bhej bsdk", 
                success: false 
            });
        }
        
        const videoId = getYouTubeVideoId(ytVideoLink);
        
        if (!videoId){
            return res.status(400).json({ 
                message: "Video id nahi nikal ri", 
                success: false 
            });
        }
        const comments = await fetchComments(videoId);

        const prespectiveAnalysis = await analyzeAllComments(comments);

        return res.status(201).json({ 
            message: "Comments Fetched Successfully!", 
            success: true,
            comments: comments,
            prespectiveAnalysis: prespectiveAnalysis
        });
    } catch (error) {
        console.error("Error in registerUser:", error.message); // Log the error
        return res.status(500).json({ 
            message: "Server error. Please try again later.", 
            success: false, 
            error: error.message 
        });
    }
};