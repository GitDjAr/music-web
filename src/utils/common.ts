import axios from "axios";
export function mapTrackPlayableStatus(data: {}) {}
export async function checkUrl(url: string): Promise<boolean> {
  let res = false;
  try {
    const response = await axios.head(url);
    if (response.status === 200) {
      res = true;
    } else {
      console.log("The URL is not working.");
    }
  } catch (error) {
    console.log("An error occurred while checking the URL:", error);
  }
  return res;
}
