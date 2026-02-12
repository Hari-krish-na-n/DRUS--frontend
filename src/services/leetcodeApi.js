// src/services/leetcodeApi.js
import axios from "axios";

const BASE = "https://leetcode-stats.tashif.codes";

export async function fetchLeetCodeStats(username) {
  const res = await axios.get(`${BASE}/${username}`);
  return res.data; // you can map fields later
}
