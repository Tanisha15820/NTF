import { useState } from "react";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

const DETAIL_FIELDS = [
  {
    key: "name",
    label: "Name of the Participant/Employee (प्रतिभागी/कर्मचारी का नाम)",
  },
  { key: "unit", label: "Unit (यूनिट)" },
  { key: "department", label: "Department (विभाग)" },
  { key: "designation", label: "Designation (पदनाम)" },
  { key: "staffId", label: "Staff ID (स्टाफ आईडी)" },
  { key: "email", label: "Email ID (ईमेल आईडी)" },
  { key: "title", label: "Title of the Training (प्रशिक्षण का शीर्षक)" },
  { key: "date", label: "Date of Training (प्रशिक्षण की तिथि)" },
  {
    key: "faculty",
    label:
      "Training Conducting Faculty (प्रशिक्षण संचालित करने वाले प्रशिक्षक का नाम)",
  },
  { key: "duration", label: "Duration (From – To) प्रशिक्षण अवधि" },
];

const RATING_OPTIONS = [
  "Strongly Agree",
  "Agree",
  "Disagree",
  "Strongly Disagree",
  "Not Relevant to this Event",
];

const RATING_ROWS = [
  "The objectives of the training were met (प्रशिक्षण के उद्देश्य पूरे हो गए)",
  "The presenters were engaging (प्रस्तुतकर्ताओं की प्रस्तुति आकर्षक और स्पष्ट थी।)",
  "The presentation materials were relevant (प्रस्तुति में दी गई जानकारी विषय के अनुसार थी।)",
  "The content of the course was organised and easy to follow (पाठ्यक्रम की विषयवस्तु व्यवस्थित और समझने में आसान थी)",
  "The trainers were well prepared and able to answer any questions (प्रशिक्षक अच्छी तरह से तैयार थे और किसी भी प्रश्न का उत्तर देने में सक्षम थे।)",
  "The course length was appropriate (कोर्स की समयावधि उपयुक्त थी)",
  "The pace of the course was appropriate to the content and attendees (कोर्स की गति, विषय और उपस्थित लोगों के लिए सही थी।)",
  "The exercises/role play were helpful and relevant (अभ्यास/भूमिका-निर्वाह उपयोगी और उपयुक्त थे।)",
];

const TrainingFeedback = () => {
  const [details, setDetails] = useState(() =>
    Object.fromEntries(DETAIL_FIELDS.map((f) => [f.key, ""]))
  );

  const [ratings, setRatings] = useState(() =>
    RATING_ROWS.map(() => "")
  );

  const handleDetailChange = (key) => (event) => {
    setDetails((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleRatingChange = (index) => (value) => {
    setRatings((prev) => prev.map((r, idx) => (idx === index ? value : r)));
  };

  const inputClass =
    "h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-xs text-gray-700 outline-none transition focus:border-[#6F4AE7] focus:ring-2 focus:ring-[#6F4AE7]/10";

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-light to-primary-dark shadow-sm">
              <RateReviewOutlinedIcon sx={{ color: "#fff", fontSize: 22 }} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 leading-tight">
                Training Feedback Form
              </h2>
              <p className="text-xs text-gray-500">
                Collect and review feedback from trainees and trainers
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-500">
            डॉक्यूमेंट रिफ़रेंस:
            <span className="font-semibold text-gray-700"> F06(AMD-02)</span>
          </div>
        </div>

        {/* DOC REFERENCE */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 bg-gray-50/60 px-5 py-3">
          <p className="text-[12px] text-gray-600">
            <span className="font-semibold text-gray-700">Doc. No.:</span>{" "}
            F06(AMD-02)
          </p>
          <p className="text-[12px] text-gray-600">
            <span className="font-semibold text-gray-700">Issue Date:</span>{" "}
            18/04/2025
          </p>
          <p className="text-[12px] text-gray-600">
            <span className="font-semibold text-gray-700">Rev. No.:</span> 01
          </p>
          <p className="text-[12px] text-gray-600">
            <span className="font-semibold text-gray-700">Company:</span>{" "}
            Advanced Composites &amp; Engineering Plastics
          </p>
        </div>

        {/* HINDI INSTRUCTION */}
        <div className="flex items-center gap-2 bg-[#6F4AE7]/5 px-5 py-3">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#6F4AE7]" />
          <p className="text-[12px] text-gray-600">
            कृपया इस फॉर्म को धैर्यपूर्वक और ध्यानपूर्वक भरें।
          </p>
        </div>
      </div>

      {/* PARTICIPANT / TRAINING DETAILS */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <BadgeOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">
            Participant / Training Details
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-gray-100/80">
                <th className="w-1/2 border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Particulars
                </th>
                <th className="border-b border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {DETAIL_FIELDS.map((field, index) => (
                <tr
                  key={field.key}
                  className={`border-b border-gray-100 last:border-0 ${
                    index % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                  }`}
                >
                  <td className="border-r border-gray-100 px-4 py-2.5 text-xs font-medium text-gray-600">
                    {field.label}
                  </td>
                  <td className="px-4 py-2.5">
                    {field.key === "date" ? (
                      <input
                        type="date"
                        value={details[field.key]}
                        onChange={handleDetailChange(field.key)}
                        className={inputClass}
                      />
                    ) : (
                      <input
                        value={details[field.key]}
                        onChange={handleDetailChange(field.key)}
                        placeholder={`Enter ${field.label.split(" (")[0].toLowerCase()}`}
                        className={inputClass}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TRAINING FEEDBACK REPORT */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-1 border-b border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <QuizOutlinedIcon sx={{ fontSize: 18 }} />
            </div>
            <h3 className="text-sm font-bold text-gray-900">
              Training Feedback Report
            </h3>
          </div>
          <p className="text-xs text-gray-500">
            Please rate the following points on a given scale. कृपया नीचे दिए
            गए बिंदुओं को रेटिंग दें।
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] border-collapse">
            <thead>
              <tr className="bg-gray-100/80">
                <th className="w-14 border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  S. No.
                </th>
                <th className="border-b border-r border-gray-200 px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                  Evaluation Point
                </th>
                {RATING_OPTIONS.map((opt) => (
                  <th
                    key={opt}
                    className="border-b border-r border-gray-200 px-2 py-3 text-center text-[11px] font-bold uppercase tracking-wider text-gray-600 last:border-r-0"
                  >
                    {opt}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {RATING_ROWS.map((point, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-100 last:border-0 ${
                    index % 2 === 1 ? "bg-gray-50/50" : "bg-white"
                  }`}
                >
                  <td className="border-r border-gray-100 px-4 py-2.5 text-xs font-semibold text-gray-700">
                    {index + 1}
                  </td>
                  <td className="border-r border-gray-100 px-4 py-2.5">
                    <p className="max-w-[340px] text-xs font-medium leading-5 text-gray-600">
                      {point}
                    </p>
                  </td>

                  {RATING_OPTIONS.map((opt) => (
                    <td
                      key={opt}
                      className="border-r border-gray-100 px-2 py-2.5 text-center last:border-r-0"
                    >
                      <label className="inline-flex cursor-pointer">
                        <input
                          type="radio"
                          name={`rating-${index}`}
                          checked={ratings[index] === opt}
                          onChange={() => handleRatingChange(index)(opt)}
                          className="h-4 w-4 cursor-pointer accent-[#6F4AE7]"
                        />
                      </label>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SIGNATURE */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <EditNoteOutlinedIcon sx={{ fontSize: 18 }} />
          </div>
          <h3 className="text-sm font-bold text-gray-900">Signature</h3>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <label className="mb-1.5 block text-[11px] font-semibold text-gray-600">
              Signature of participant / प्रतिभागी के हस्ताक्षर
            </label>
            <input
              value={details.signature || ""}
              onChange={(e) =>
                setDetails((prev) => ({ ...prev, signature: e.target.value }))
              }
              placeholder="Enter participant signature"
              className={`${inputClass} h-12`}
            />
          </div>

          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-[#6F4AE7] px-6 text-xs font-semibold text-white shadow-sm transition hover:bg-[#5F3ED1]"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainingFeedback;