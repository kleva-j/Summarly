import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { getAuthToken, getUserId } from "@/lib/auth";
import { DataTable } from "@/components/data-table";
import { captureEvent } from "@/lib/posthog/utils";
import { EVENTS } from "@/lib/posthog";

import data from "./data.json";

type AuthConfig = { token: string | undefined };

export default async function DashboardPage() {
  const userId = await getUserId();
  const config: AuthConfig = { token: undefined };

  try {
    config.token = await getAuthToken();
  } catch (e) {
    console.error(e);
  }

  captureEvent(userId ?? "")(EVENTS.PAGE_VIEW);

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  );
}
