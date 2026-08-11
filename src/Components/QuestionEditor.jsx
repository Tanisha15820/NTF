
// import Add from "@mui/icons-material/Add";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

// const QuestionEditor = ({
//   question,
//   onChange,
// }) => {
//   if (!question) return null;

//   const {
//     options = [],
//     correctOption,
//   } = question;

//   const nextOptionId = () => {
//     if (options.length === 0) return 1;

//     return (
//       Math.max(
//         ...options.map(
//           (option) => option.id
//         )
//       ) + 1
//     );
//   };

//   // =====================================================
//   // ADD OPTION
//   // =====================================================

//   const addOption = () => {
//     const alphabet = "ABCD";

//     if (options.length >= 4) {
//       return;
//     }

//     onChange({
//       options: [
//         ...options,
//         {
//           id: nextOptionId(),
//           label: alphabet[options.length],
//           value: "",
//         },
//       ],
//     });
//   };

//   // =====================================================
//   // UPDATE OPTION
//   // =====================================================

//   const updateOption = (
//     id,
//     value
//   ) => {
//     onChange({
//       options: options.map(
//         (option) =>
//           option.id === id
//             ? {
//                 ...option,
//                 value,
//               }
//             : option
//       ),
//     });
//   };

//   // =====================================================
//   // REMOVE OPTION
//   // =====================================================

//   const removeOption = (id) => {
//     const updatedOptions =
//       options.filter(
//         (option) =>
//           option.id !== id
//       );

//     // Re-label options
//     const alphabet = "ABCD";

//     const relabeledOptions =
//       updatedOptions.map(
//         (option, index) => ({
//           ...option,
//           label: alphabet[index],
//         })
//       );

//     onChange({
//       options: relabeledOptions,

//       correctOption:
//         correctOption === id
//           ? null
//           : correctOption,
//     });
//   };

//   // =====================================================
//   // RENDER
//   // =====================================================

//   return (
//     <div className="h-full flex flex-col bg-white">

//       {/* ===============================================
//           HEADER
//       =============================================== */}

//       <div
//         className="
//           px-6
//           py-4
//           border-b
//           border-gray-200
//         "
//       >
//         <h2 className="text-lg font-bold text-gray-800">
//           {question.title}
//         </h2>

//         <p className="text-xs text-gray-400 mt-1">
//           Create and edit your question
//         </p>
//       </div>

//       {/* ===============================================
//           CONTENT
//       =============================================== */}

//       <div
//         className="
//           flex-1
//           overflow-y-auto
//           p-6
//           space-y-7
//         "
//       >

//         {/* ============================================
//             QUESTION
//         ============================================ */}

//         <div>

//           <label
//             className="
//               text-sm
//               font-medium
//               text-gray-700
//             "
//           >
//             Question
//           </label>

//           <textarea
//             rows={4}
//             value={question.question}
//             onChange={(e) =>
//               onChange({
//                 question:
//                   e.target.value,
//               })
//             }
//             placeholder="Enter the question here..."
//             className="
//               mt-2
//               w-full
//               border
//               border-gray-200
//               rounded-xl
//               p-3.5
//               text-sm
//               outline-none
//               resize-none
//               bg-gray-50/50

//               focus:bg-white
//               focus:border-primary
//               focus:ring-2
//               focus:ring-primary/15

//               transition
//             "
//           />

//         </div>

//         {/* ============================================
//             OPTIONS
//         ============================================ */}

//         <div>

//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               mb-3
//             "
//           >

//             <h3
//               className="
//                 text-sm
//                 font-semibold
//                 text-gray-700
//               "
//             >
//               Options
//             </h3>

//             <span
//               className="
//                 text-xs
//                 text-gray-400
//               "
//             >
//               Select the correct answer
//             </span>

//           </div>

//           <div className="space-y-2.5">

//             {options.map(
//               (option) => {

//                 const isCorrect =
//                   correctOption ===
//                   option.id;

//                 return (
//                   <div
//                     key={option.id}
//                     className={`
//                       flex
//                       items-center
//                       gap-3
//                       border
//                       rounded-xl
//                       px-3
//                       py-2
//                       group
//                       transition-all

//                       ${
//                         isCorrect
//                           ? "border-primary bg-primary/10 shadow-sm"
//                           : "border-gray-200 hover:border-primary/40 hover:bg-primary/[0.02]"
//                       }
//                     `}
//                   >

//                     {/* OPTION LETTER */}

//                     <button
//                       type="button"
//                       onClick={() =>
//                         onChange({
//                           correctOption:
//                             option.id,
//                         })
//                       }
//                       className={`
//                         h-8
//                         w-8
//                         rounded-full
//                         flex
//                         items-center
//                         justify-center
//                         text-sm
//                         font-semibold
//                         shrink-0
//                         transition

//                         ${
//                           isCorrect
//                             ? "bg-primary text-white"
//                             : "bg-primary/10 text-primary hover:bg-primary/20"
//                         }
//                       `}
//                     >
//                       {option.label}
//                     </button>

//                     {/* INPUT */}

//                     <input
//                       value={option.value}
//                       onChange={(e) =>
//                         updateOption(
//                           option.id,
//                           e.target.value
//                         )
//                       }
//                       className="
//                         flex-1
//                         h-10
//                         bg-transparent
//                         rounded-lg
//                         px-1
//                         text-sm
//                         outline-none
//                         placeholder:text-gray-300
//                       "
//                       placeholder={`Option ${option.label}`}
//                     />

//                     {/* CORRECT ICON */}

//                     {isCorrect && (
//                       <CheckCircleOutlinedIcon
//                         sx={{
//                           fontSize: 18,
//                           color: "#6F4AE7",
//                         }}
//                       />
//                     )}

//                     {/* DELETE OPTION */}

//                     <button
//                       type="button"
//                       onClick={() =>
//                         removeOption(
//                           option.id
//                         )
//                       }
//                       title="Remove option"
//                       className="
//                         text-red-400
//                         text-lg
//                         opacity-0
//                         group-hover:opacity-100
//                         hover:text-red-500
//                         transition
//                         leading-none
//                       "
//                     >
//                       ×
//                     </button>

//                   </div>
//                 );
//               }
//             )}

//           </div>

//           {/* ==========================================
//               ADD OPTION
//           ========================================== */}

//           {options.length < 4 && (
//             <button
//               type="button"
//               onClick={addOption}
//               className="
//                 mt-3
//                 w-full
//                 h-11
//                 rounded-xl
//                 border-2
//                 border-dashed
//                 border-primary/25
//                 text-primary
//                 text-sm
//                 font-medium
//                 hover:border-primary/60
//                 hover:bg-primary/5
//                 transition
//                 flex
//                 items-center
//                 justify-center
//                 gap-1.5
//               "
//             >
//               <Add fontSize="small" />

//               Add Option
//             </button>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuestionEditor;

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import FormatBoldOutlinedIcon from "@mui/icons-material/FormatBoldOutlined";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const QuestionEditor = ({
  question,
  onChange,
  currentIndex,
  totalQuestions,
  onNext,
  onPrevious,
}) => {
  if (!question) return null;

  const {
    options = [],
    correctOption,
  } = question;

  // =====================================================
  // NEXT OPTION ID
  // =====================================================

  const nextOptionId = () => {
    if (!options.length) return 1;

    return (
      Math.max(
        ...options.map((option) => option.id)
      ) + 1
    );
  };

  // =====================================================
  // ADD OPTION
  // =====================================================

  const addOption = () => {
    if (options.length >= 4) return;

    const alphabet = "ABCD";

    onChange({
      options: [
        ...options,
        {
          id: nextOptionId(),
          label: alphabet[options.length],
          value: "",
        },
      ],
    });
  };

  // =====================================================
  // UPDATE OPTION
  // =====================================================

  const updateOption = (id, value) => {
    onChange({
      options: options.map((option) =>
        option.id === id
          ? {
              ...option,
              value,
            }
          : option
      ),
    });
  };

  // =====================================================
  // DELETE OPTION
  // =====================================================

  const removeOption = (id) => {
    if (options.length <= 2) return;

    const alphabet = "ABCD";

    const updatedOptions = options
      .filter((option) => option.id !== id)
      .map((option, index) => ({
        ...option,
        label: alphabet[index],
      }));

    let newCorrectOption = correctOption;

    if (correctOption === id) {
      newCorrectOption = null;
    }

    onChange({
      options: updatedOptions,
      correctOption: newCorrectOption,
    });
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="h-full flex flex-col bg-white">

      {/* =================================================
          TOP HEADER
      ================================================= */}

      <div className="h-[58px] shrink-0 border-b border-gray-200 px-5 flex items-center justify-between">

        <div>

          <p className="text-[10px] font-bold uppercase text-[#6F4AE7] tracking-wide">
            Edit Question
          </p>

          <p className="text-[9px] text-gray-400 mt-1">
            Question {currentIndex + 1} of {totalQuestions}
          </p>

        </div>

        {/* QUESTION TYPE */}

        <div className="flex items-center gap-2">

          <label className="text-[9px] text-gray-500">
            Question Type
          </label>

          <select
            value={question.type}
            onChange={(e) =>
              onChange({
                type: e.target.value,
                title: e.target.value,
              })
            }
            className="
              h-8
              min-w-[150px]
              px-2.5
              rounded-lg
              border
              border-gray-200
              bg-white
              text-[10px]
              text-gray-600
              outline-none
              focus:border-[#6F4AE7]
            "
          >
            <option>Multiple Choice (MCQ)</option>
            <option>Short Answer</option>
            <option>Long Answer</option>
            <option>True / False</option>
          </select>

        </div>

      </div>

      {/* =================================================
          SCROLLABLE CONTENT
      ================================================= */}

      <div className="flex-1 overflow-y-auto">

        <div className="px-5 py-4 space-y-5">

          {/* =================================================
              QUESTION TEXT
          ================================================= */}

          <section>

            <div className="flex items-center gap-1 mb-2">

              <label className="text-[10px] font-semibold text-gray-700">
                Question Text
              </label>

              <span className="text-red-500 text-[10px]">
                *
              </span>

            </div>

            {/* EDITOR TOOLBAR */}

            <div className="border border-gray-200 rounded-t-lg bg-[#fafbfc] h-9 flex items-center px-2">

              <button className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center">
                <FormatBoldOutlinedIcon
                  sx={{ fontSize: 15 }}
                />
              </button>

              <button className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center">
                <FormatItalicOutlinedIcon
                  sx={{ fontSize: 15 }}
                />
              </button>

              <button className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center">
                <FormatListBulletedOutlinedIcon
                  sx={{ fontSize: 15 }}
                />
              </button>

              <button className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center">
                <LinkOutlinedIcon
                  sx={{ fontSize: 15 }}
                />
              </button>

              <div className="h-4 w-px bg-gray-200 mx-2" />

              <button className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center">
                <UndoOutlinedIcon
                  sx={{ fontSize: 15 }}
                />
              </button>

              <button className="h-7 w-7 rounded hover:bg-gray-100 flex items-center justify-center">
                <RedoOutlinedIcon
                  sx={{ fontSize: 15 }}
                />
              </button>

            </div>

            {/* TEXTAREA */}

            <textarea
              value={question.question}
              onChange={(e) =>
                onChange({
                  question: e.target.value,
                })
              }
              placeholder="Type your question here..."
              rows={3}
              className="
                w-full
                border-x
                border-b
                border-gray-200
                rounded-b-lg
                p-3
                resize-none
                outline-none
                text-[11px]
                text-gray-700
                placeholder:text-gray-300
                focus:border-[#6F4AE7]
                focus:ring-1
                focus:ring-[#6F4AE7]/20
              "
            />

          </section>

          {/* =================================================
              OPTIONS
          ================================================= */}

          {question.type ===
            "Multiple Choice (MCQ)" && (
            <section>

              <div className="flex items-center justify-between mb-2">

                <div className="flex items-center gap-1">

                  <h3 className="text-[10px] font-bold uppercase tracking-wide text-[#6F4AE7]">
                    Options
                  </h3>

                  <span className="text-[9px] text-gray-400">
                    ({options.length})
                  </span>

                </div>

                <div className="flex items-center gap-3">

                  <span className="text-[9px] text-gray-400">
                    Max options: 4
                  </span>

                  {options.length < 4 && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="
                        h-7
                        px-2.5
                        rounded-lg
                        border
                        border-[#dcd5ff]
                        text-[#6F4AE7]
                        bg-white
                        text-[9px]
                        font-semibold
                        flex
                        items-center
                        gap-1
                        hover:bg-[#f6f3ff]
                      "
                    >
                      <AddOutlinedIcon
                        sx={{ fontSize: 14 }}
                      />
                      Add Option
                    </button>
                  )}

                </div>

              </div>

              {/* OPTIONS LIST */}

              <div className="space-y-1.5">

                {options.map((option) => {

                  const isCorrect =
                    correctOption === option.id;

                  return (
                    <div
                      key={option.id}
                      className={`
                        h-[38px]
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        border
                        px-2
                        transition
                        ${
                          isCorrect
                            ? "border-[#cfc5ff] bg-[#faf8ff]"
                            : "border-gray-200 bg-white"
                        }
                      `}
                    >

                      {/* RADIO */}

                      <button
                        type="button"
                        onClick={() =>
                          onChange({
                            correctOption:
                              option.id,
                          })
                        }
                        className={`
                          h-4
                          w-4
                          rounded-full
                          border
                          flex
                          items-center
                          justify-center
                          shrink-0
                          ${
                            isCorrect
                              ? "border-[#6F4AE7]"
                              : "border-gray-300"
                          }
                        `}
                      >
                        {isCorrect && (
                          <span className="h-2 w-2 rounded-full bg-[#6F4AE7]" />
                        )}
                      </button>

                      {/* LABEL */}

                      <div
                        className={`
                          h-7
                          w-7
                          rounded-md
                          flex
                          items-center
                          justify-center
                          text-[10px]
                          font-semibold
                          ${
                            isCorrect
                              ? "bg-[#6F4AE7] text-white"
                              : "bg-[#f3f1ff] text-[#6F4AE7]"
                          }
                        `}
                      >
                        {option.label}
                      </div>

                      {/* INPUT */}

                      <input
                        value={option.value}
                        onChange={(e) =>
                          updateOption(
                            option.id,
                            e.target.value
                          )
                        }
                        placeholder={`Option ${option.label}`}
                        className="
                          flex-1
                          h-8
                          px-2
                          text-[10px]
                          text-gray-700
                          outline-none
                          bg-transparent
                          placeholder:text-gray-300
                        "
                      />

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeOption(option.id)
                        }
                        className="
                          h-7
                          w-7
                          flex
                          items-center
                          justify-center
                          text-red-300
                          hover:text-red-500
                          transition
                        "
                      >
                        <DeleteOutlineOutlinedIcon
                          sx={{ fontSize: 16 }}
                        />
                      </button>

                    </div>
                  );
                })}

              </div>

              <p className="text-[8px] text-gray-400 mt-2">
                Select the correct answer for this question.
              </p>

            </section>
          )}

          {/* =================================================
              QUESTION SETTINGS
          ================================================= */}

          <section>

            <div className="grid grid-cols-4 gap-3">

              {/* MARKS */}

              <div>

                <label className="block text-[9px] font-semibold text-gray-600 mb-1">
                  Marks <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  min="0"
                  value={question.marks}
                  onChange={(e) =>
                    onChange({
                      marks: Number(e.target.value),
                    })
                  }
                  className="
                    w-full
                    h-8
                    border
                    border-gray-200
                    rounded-lg
                    px-2
                    text-[10px]
                    outline-none
                    focus:border-[#6F4AE7]
                  "
                />

              </div>

              {/* NEGATIVE MARKS */}

              <div>

                <label className="block text-[9px] font-semibold text-gray-600 mb-1">
                  Negative Marks
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.25"
                  value={question.negativeMarks}
                  onChange={(e) =>
                    onChange({
                      negativeMarks:
                        Number(e.target.value),
                    })
                  }
                  className="
                    w-full
                    h-8
                    border
                    border-gray-200
                    rounded-lg
                    px-2
                    text-[10px]
                    outline-none
                    focus:border-[#6F4AE7]
                  "
                />

              </div>

              {/* DIFFICULTY */}

              <div>

                <label className="block text-[9px] font-semibold text-gray-600 mb-1">
                  Difficulty Level
                </label>

                <select
                  value={question.difficulty}
                  onChange={(e) =>
                    onChange({
                      difficulty:
                        e.target.value,
                    })
                  }
                  className="
                    w-full
                    h-8
                    border
                    border-gray-200
                    rounded-lg
                    px-2
                    text-[10px]
                    bg-white
                    outline-none
                    focus:border-[#6F4AE7]
                  "
                >
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>

              </div>

              {/* REQUIRED */}

              <div className="flex items-end pb-1">

                <label className="flex items-center gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    checked={question.required}
                    onChange={(e) =>
                      onChange({
                        required:
                          e.target.checked,
                      })
                    }
                    className="accent-[#6F4AE7]"
                  />

                  <span className="text-[9px] font-medium text-gray-600">
                    Required Question
                  </span>

                </label>

              </div>

            </div>

          </section>

        </div>

      </div>

      {/* =================================================
          BOTTOM NAVIGATION
      ================================================= */}

      <div className="h-[50px] shrink-0 border-t border-gray-200 bg-white px-5 flex items-center justify-between">

        <button
          type="button"
          onClick={onPrevious}
          disabled={currentIndex <= 0}
          className="
            h-8
            px-3
            rounded-lg
            border
            border-[#ddd5ff]
            text-[#6F4AE7]
            text-[9px]
            font-semibold
            flex
            items-center
            gap-1
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          <KeyboardArrowLeftOutlinedIcon
            sx={{ fontSize: 15 }}
          />
          Previous Question
        </button>

        <span className="text-[9px] text-gray-400">
          Question {currentIndex + 1} of{" "}
          {totalQuestions}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={
            currentIndex >= totalQuestions - 1
          }
          className="
            h-8
            px-3
            rounded-lg
            bg-[#6F4AE7]
            text-white
            text-[9px]
            font-semibold
            flex
            items-center
            gap-1
            shadow-sm
            disabled:opacity-40
            disabled:cursor-not-allowed
          "
        >
          Next Question
          <KeyboardArrowRightOutlinedIcon
            sx={{ fontSize: 15 }}
          />
        </button>

      </div>

    </div>
  );
};

export default QuestionEditor;