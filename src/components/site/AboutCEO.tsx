import { HowWeWork } from "./HowWeWork";
import { OurCommitments } from "./OurCommitments";
import { Leadership } from "./Leadership";

export function AboutCEO() {
  return (
    <div id="method-and-team" className="w-full">
      {/* Leadership — the mind behind the machine */}
      <Leadership />
    </div>
  );
}

export { HowWeWork, OurCommitments, Leadership };
