"use client";

import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import MeetingItem from "./MeetingItem";

export default function MyMettingsPage() {
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [calls, setCalls] = useState<Call[]>();

  useEffect(() => {
    async function loadCalls() {
      if (!client || !user?.id) {
        return;
      }

      const { calls } = await client.queryCalls({
        sort: [{ field: "starts_at", direction: -1 }],
        filter_conditions: {
          starts_at: { $exists: true },
          $or: [
            { created_by_user_id: user.id },
            { members: { $in: [user.id] } },
          ],
        },
      });

      setCalls(calls);
    }

    loadCalls();
  }, [client, user?.id]);

  return (
    <div className="space-y-3">
      <h1 className="text-center text-2xl font-bold">My Mettings</h1>
      {!calls && <Loader2 className="mx-auto animate-spin" />}
      {calls?.length === 0 && <p>No meetings found</p>}
      <ul className="list-inside list-disc space-y-2">
        {calls?.map((call) => <MeetingItem key={call.id} call={call} />)}
      </ul>
    </div>
  );
}
