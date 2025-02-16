import "server-only";

import { fetchAccessToken } from "hume";
import { env } from "env.mjs";

const apiKey = env.HUME_API_KEY;
const secretKey = env.HUME_SECRET_KEY;

export const getHumeAccessToken = async () => {
	const accessToken = await fetchAccessToken({ apiKey, secretKey });

	return accessToken ?? null;
};
