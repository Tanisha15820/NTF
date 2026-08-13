import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import logo from "../../../assets/images/NTF_logo_black.png";

const TopActions = ({
  title = "Question Paper",

  onPreview,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm px-4 sm:px-6 py-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 transition-all">
      {/* Left Branding & Title */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-white border border-primary/20 flex items-center justify-center shrink-0 p-1.5 shadow-sm">
          <img src={logo} alt="NTF Logo" className="h-full w-full object-contain" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 leading-tight truncate">
              {title}
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">
            NTF Skill Evaluation & Assessment Management
          </p>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          onClick={onPreview}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-10 rounded-xl border border-gray-200 bg-white px-4 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:text-primary transition shadow-xs"
        >
          <VisibilityOutlinedIcon sx={{ fontSize: 17 }} />
          Preview Paper
        </button>

        <button
          type="button"
          onClick={onSave}
          className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-r from-primary via-primary-light to-primary-dark px-5 text-xs font-semibold text-white shadow-md shadow-primary/25 hover:opacity-95 active:scale-[0.98] transition"
        >
          <SaveOutlinedIcon sx={{ fontSize: 17 }} />
          Save Paper
        </button>
      </div>
    </div>
  );
};

export default TopActions;

