import { Call } from "@stream-io/video-react-sdk";
import Link from "next/link";

type MeetingItemProps = {
  call: Call;
};

export default function MeetingItem({ call }: MeetingItemProps) {
  const meetingLink = `/meeting/${call.id}`;
  const isInFuture =
    call.state.startsAt && new Date(call.state.startsAt) > new Date();
  const hasEnded = !!call.state.startsAt;

  return (
    <li>
      <Link href={meetingLink} className="hover:underline">
        {call.state.startsAt?.toLocaleString()}
        {isInFuture && " (Upcomming)"}
        {hasEnded && " (Ended)"}
      </Link>
      <p className="ml-6 text-gray-600">{call.state.custom.description}</p>
    </li>
  );
}
