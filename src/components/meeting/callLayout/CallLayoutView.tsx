import { PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import type { CallLayout } from "components/meeting/callLayout/FlexibleLayoutView";

type CallLayoutViewProps = {
  layout: CallLayout;
};

export default function CallLayoutView({ layout }: CallLayoutViewProps) {
  if (layout === "sp-vertical") {
    return <SpeakerLayout />;
  }

  if (layout === "sp-horizontal") {
    return <SpeakerLayout participantsBarPosition="right" />;
  }

  if (layout === "sp-grid") {
    return <PaginatedGridLayout />;
  }

  return null;
}
