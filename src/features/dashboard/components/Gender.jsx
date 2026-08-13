import GenderDistribution from "./GenderDistribution";
import GenderAttendance from "./GenderAttendance";

const Gender = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Card 1 */}
      <GenderDistribution />

      {/* Card 2 */}
      <GenderAttendance />
    </div>
  );
};

export default Gender;
