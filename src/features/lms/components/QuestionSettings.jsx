import PublishOutlinedIcon from "@mui/icons-material/PublishOutlined";

const inputClass =
  "w-full h-10 rounded-xl border border-gray-200 px-3 text-sm outline-none bg-gray-50/50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 transition";

const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

const QuestionSettings = ({ question, onChange, onPublish }) => {
  if (!question) return null;

  const { options, correctOption } = question;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2.5">
        <h2 className="text-sm font-bold text-gray-800">Question Settings</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        <div>
          <label className={labelClass}>Correct Answer</label>
          <select
            className={inputClass}
            value={correctOption ?? ""}
            onChange={(e) =>
              onChange({
                correctOption: e.target.value ? Number(e.target.value) : null,
              })
            }
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}. {o.value || `Option ${o.label}`}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Marks</label>
          <input
            type="number"
            value={question.marks}
            onChange={(e) => onChange({ marks: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
      </div>

      <div className="border-t border-gray-100 p-4 flex gap-3 bg-gray-50/50">
        <button
          onClick={onPublish}
          className="flex-1 h-11 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm hover:opacity-95 hover:shadow-md hover:shadow-primary/30 active:scale-[0.98] transition flex items-center justify-center gap-2"
        >
          <PublishOutlinedIcon sx={{ fontSize: 18 }} />
          Publish
        </button>
      </div>
    </div>
  );
};

export default QuestionSettings;
