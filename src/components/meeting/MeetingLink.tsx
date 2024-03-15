import { Call } from "@stream-io/video-react-sdk";
import { Copy } from "lucide-react";
import Link from "next/link";
import GetToMailLink from "../../app/meeting/getMailToLink";
import getToMailLink from "../../app/meeting/getMailToLink";

type MeetingCallProps = {
  call: Call;
};

export default function MeetingCall({ call }: MeetingCallProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <span>
          Invitation Link:{" "}
          <Link href={meetingLink} className="font-medium">
            {meetingLink}
          </Link>
        </span>
        <button
          title="Copy invitation link"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            alert("Cpoied to clipboard!");
          }}
        >
          <Copy />
        </button>
      </div>
      <a
        href={getToMailLink({
          meetingLink,
          startAt: call.state.startsAt,
          description: call.state.custom.description,
        })}
        target="_blank"
        className="text-blue-500 hover:underline"
      >
        Send email invitation
      </a>
    </div>
  );
}
