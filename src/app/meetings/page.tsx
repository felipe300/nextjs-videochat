import { Metadata } from "next";
import MyMettingsPage from "./MyMeetingsPage";

export const metadata: Metadata = {
  title: "My Meetings",
};

export default function page() {
  return <MyMettingsPage />;
}
