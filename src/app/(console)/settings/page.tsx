import { Preferences } from "@/settings/_preference";
import { Account } from "@/settings/_account";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <Account />
      <Preferences />
    </div>
  );
}
