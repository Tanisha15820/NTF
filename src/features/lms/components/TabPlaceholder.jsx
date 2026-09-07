import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";

const TabPlaceholder = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-light to-primary-dark text-white shadow-md shadow-primary/20">
        <ConstructionOutlinedIcon sx={{ fontSize: 26 }} />
      </div>

      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <p className="mt-1 max-w-md text-xs text-gray-500">
        {description || "This module is under development."}
      </p>
    </div>
  );
};

export default TabPlaceholder;