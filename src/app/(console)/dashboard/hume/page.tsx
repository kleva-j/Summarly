import { getHumeAccessToken } from "@/lib/getHumeAccessToken";
import { HumeClient } from "@/components/hume/client";
import { ERRORS } from "@/lib/error";

const { Hume_AI_Error } = ERRORS;

export default async function HumeChatPage() {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) console.error(Hume_AI_Error.ACCESS_TOKEN);

  return (
    <div className={"grow flex flex-col"}>
      <HumeClient accessToken={accessToken ?? ""} />
    </div>
  );
}
