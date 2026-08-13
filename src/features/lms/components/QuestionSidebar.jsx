
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

// const QuestionSidebar = ({
//   sections,
//   selectedQuestion,
//   setSelectedQuestion,
//   addQuestion,
//   addSection,
//   deleteQuestion,
//   deleteSection,
// }) => {

//   const getQuestionNumber = (
//     sectionIndex,
//     questionIndex
//   ) => {
//     let number = 0;

//     // Count all questions from previous sections
//     for (let i = 0; i < sectionIndex; i++) {
//       number += sections[i].questions.length;
//     }

//     return number + questionIndex + 1;
//   };

//   return (
//     <aside
//       className="
//         w-[280px]
//         shrink-0
//         h-full
//         bg-white
//         border-r
//         border-gray-200
//         flex
//         flex-col
//       "
//     >

//       {/* ===============================================
//           HEADER
//       =============================================== */}

//       <div
//         className="
//           px-4
//           py-4
//           border-b
//           border-gray-100
//         "
//       >
//         <div className="flex items-center justify-between">

//           <div>
//             <h2 className="text-sm font-bold text-gray-800">
//               Question Paper
//             </h2>

//             <p className="text-[11px] text-gray-400 mt-0.5">
//               Sections & Questions
//             </p>
//           </div>

//           {/* ADD SECTION */}

//           <button
//             onClick={addSection}
//             title="Add Section"
//             className="
//               h-8
//               px-3
//               rounded-lg
//               bg-gradient-to-r
//               from-primary
//               to-primary-dark
//               text-white
//               text-xs
//               font-semibold
//               flex
//               items-center
//               justify-center
//               gap-1
//               shadow-sm
//               hover:opacity-90
//               active:scale-95
//               transition
//             "
//           >
//             <AddOutlinedIcon
//               sx={{ fontSize: 17 }}
//             />

//             Section
//           </button>
//         </div>
//       </div>

//       {/* ===============================================
//           SECTION LIST
//       =============================================== */}

//       <div
//         className="
//           flex-1
//           overflow-y-auto
//           p-2
//         "
//       >

//         {sections.length === 0 ? (
//           <div className="py-12 text-center">

//             <p className="text-xs text-gray-400">
//               No sections found
//             </p>

//             <button
//               onClick={addSection}
//               className="
//                 mt-3
//                 text-xs
//                 font-medium
//                 text-primary
//                 hover:underline
//               "
//             >
//               + Add Section
//             </button>

//           </div>
//         ) : (
//           sections.map(
//             (section, sectionIndex) => (
//               <div
//                 key={section.id}
//                 className="mb-4"
//               >

//                 {/* ======================================
//                     SECTION HEADER
//                 ====================================== */}

//                 <div
//                   className="
//                     flex
//                     items-center
//                     justify-between
//                     px-3
//                     py-2.5
//                     rounded-xl
//                     bg-gray-50
//                     border
//                     border-gray-100
//                   "
//                 >

//                   <div className="flex items-center gap-2">

//                     {/* SECTION LETTER */}

//                     <div
//                       className="
//                         h-7
//                         w-7
//                         rounded-lg
//                         bg-primary/10
//                         text-primary
//                         text-[11px]
//                         font-bold
//                         flex
//                         items-center
//                         justify-center
//                       "
//                     >
//                       {String.fromCharCode(
//                         65 + sectionIndex
//                       )}
//                     </div>

//                     <div>
//                       <p className="text-xs font-semibold text-gray-700">
//                         {section.title}
//                       </p>

//                       <p className="text-[10px] text-gray-400">
//                         {section.questions.length}{" "}
//                         {section.questions.length === 1
//                           ? "Question"
//                           : "Questions"}
//                       </p>
//                     </div>

//                   </div>

//                   {/* DELETE SECTION */}

//                   {sections.length > 1 && (
//                     <button
//                       onClick={() =>
//                         deleteSection(
//                           section.id
//                         )
//                       }
//                       title="Delete Section"
//                       className="
//                         h-7
//                         w-7
//                         rounded-lg
//                         flex
//                         items-center
//                         justify-center
//                         text-gray-300
//                         hover:bg-red-50
//                         hover:text-red-500
//                         transition
//                       "
//                     >
//                       <DeleteOutlineOutlinedIcon
//                         sx={{ fontSize: 16 }}
//                       />
//                     </button>
//                   )}

//                 </div>

//                 {/* ======================================
//                     QUESTIONS
//                 ====================================== */}

//                 <div className="mt-1.5 space-y-1">

//                   {section.questions.length ===
//                   0 ? (
//                     <div
//                       className="
//                         py-3
//                         text-center
//                         text-[11px]
//                         text-gray-400
//                       "
//                     >
//                       No questions
//                     </div>
//                   ) : (
//                     section.questions.map(
//                       (
//                         question,
//                         questionIndex
//                       ) => {

//                         const active =
//                           selectedQuestion ===
//                           question.id;

//                         const questionNumber =
//                           getQuestionNumber(
//                             sectionIndex,
//                             questionIndex
//                           );

//                         return (
//                           <div
//                             key={question.id}
//                             onClick={() =>
//                               setSelectedQuestion(
//                                 question.id
//                               )
//                             }
//                             className={`
//                               mx-1
//                               flex
//                               items-center
//                               justify-between
//                               gap-2
//                               px-3
//                               py-2.5
//                               rounded-lg
//                               cursor-pointer
//                               group
//                               transition-all

//                               ${
//                                 active
//                                   ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-sm"
//                                   : "hover:bg-primary/5"
//                               }
//                             `}
//                           >

//                             {/* QUESTION */}

//                             <div
//                               className="
//                                 flex
//                                 items-center
//                                 gap-2
//                                 min-w-0
//                               "
//                             >

//                               {/* QUESTION NUMBER */}

//                               <span
//                                 className={`
//                                   shrink-0
//                                   text-[11px]
//                                   font-bold

//                                   ${
//                                     active
//                                       ? "text-white"
//                                       : "text-primary"
//                                   }
//                                 `}
//                               >
//                                 Q{questionNumber}
//                               </span>

//                               {/* QUESTION TITLE */}

//                               <span
//                                 className={`
//                                   text-xs
//                                   font-medium
//                                   truncate

//                                   ${
//                                     active
//                                       ? "text-white"
//                                       : "text-gray-700"
//                                   }
//                                 `}
//                               >
//                                 {question.title}
//                               </span>

//                               {/* SAVED ICON */}

//                               {question.saved && (
//                                 <CheckCircleOutlinedIcon
//                                   sx={{
//                                     fontSize: 14,
//                                     color: active
//                                       ? "#A7F3D0"
//                                       : "#10B981",
//                                   }}
//                                 />
//                               )}

//                             </div>

//                             {/* DELETE QUESTION */}

//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation();

//                                 deleteQuestion(
//                                   question.id
//                                 );
//                               }}
//                               title="Delete Question"
//                               className={`
//                                 shrink-0
//                                 h-6
//                                 w-6
//                                 rounded-md
//                                 flex
//                                 items-center
//                                 justify-center
//                                 transition

//                                 ${
//                                   active
//                                     ? "text-white/70 hover:bg-white/20 hover:text-white"
//                                     : "text-gray-300 hover:bg-red-50 hover:text-red-500 opacity-0 group-hover:opacity-100"
//                                 }
//                               `}
//                             >
//                               <DeleteOutlineOutlinedIcon
//                                 sx={{
//                                   fontSize: 15,
//                                 }}
//                               />
//                             </button>

//                           </div>
//                         );
//                       }
//                     )
//                   )}

//                   {/* ==================================
//                       ADD QUESTION
//                   ================================== */}

//                   <button
//                     onClick={() =>
//                       addQuestion(section.id)
//                     }
//                     className="
//                       w-full
//                       h-8
//                       mt-1
//                       rounded-lg
//                       border
//                       border-dashed
//                       border-primary/30
//                       text-primary
//                       text-[11px]
//                       font-medium
//                       flex
//                       items-center
//                       justify-center
//                       gap-1
//                       hover:bg-primary/5
//                       hover:border-primary/60
//                       transition
//                     "
//                   >
//                     <AddOutlinedIcon
//                       sx={{ fontSize: 15 }}
//                     />

//                     Add Question
//                   </button>

//                 </div>
//               </div>
//             )
//           )
//         )}
//       </div>
//     </aside>
//   );
// };

// export default QuestionSidebar;

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DragIndicatorOutlinedIcon from "@mui/icons-material/DragIndicatorOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import { useMemo, useState } from "react";

const QuestionSidebar = ({
  sections,
  selectedQuestion,
  setSelectedQuestion,
  addQuestion,
  addSection,
  deleteQuestion,
  deleteSection,
}) => {
  const [search, setSearch] = useState("");
  const [collapsedSections, setCollapsedSections] =
    useState({});

  // =====================================================
  // TOGGLE SECTION
  // =====================================================

  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // =====================================================
  // QUESTION NUMBER
  // =====================================================

  const getQuestionNumber = (sectionId, questionIndex) => {
    let number = 0;

    for (const section of sections) {
      if (section.id === sectionId) {
        return number + questionIndex + 1;
      }

      number += section.questions.length;
    }

    return questionIndex + 1;
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredSections = useMemo(() => {
    if (!search.trim()) return sections;

    return sections
      .map((section) => ({
        ...section,
        questions: section.questions.filter(
          (question) =>
            question.question
              ?.toLowerCase()
              .includes(search.toLowerCase()) ||
            question.title
              ?.toLowerCase()
              .includes(search.toLowerCase())
        ),
      }))
      .filter((section) => section.questions.length > 0);
  }, [sections, search]);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <aside className="w-[310px] shrink-0 bg-[#fafbfe] border-r border-gray-200 flex flex-col">

      {/* =================================================
          SECTIONS HEADER
      ================================================= */}

      <div className="px-4 pt-4 pb-3">

        <div className="flex items-center justify-between mb-3">

          <div className="flex items-center gap-2">

            <h2 className="text-[11px] font-bold uppercase tracking-wide text-gray-700">
              Sections
            </h2>

            <span className="text-[10px] font-semibold text-gray-400">
              ({sections.length})
            </span>

          </div>

          <button
            type="button"
            onClick={addSection}
            className="
              h-8
              px-3
              rounded-lg
              border
              border-[#ddd5ff]
              bg-white
              text-[#6F4AE7]
              text-[11px]
              font-semibold
              flex
              items-center
              gap-1
              hover:bg-[#f6f3ff]
              transition
            "
          >
            <AddOutlinedIcon sx={{ fontSize: 15 }} />
            Add Section
          </button>

        </div>

        {/* =================================================
            SECTION CARDS
        ================================================= */}

        <div className="space-y-2">

          {sections.map((section) => {

            const sectionActive = section.questions.some(
              (question) =>
                question.id === selectedQuestion
            );

            return (
              <div
                key={section.id}
                className={`
                  relative
                  rounded-lg
                  border
                  px-3
                  py-2.5
                  bg-white
                  transition
                  ${
                    sectionActive
                      ? "border-[#d9d0ff] bg-[#faf8ff]"
                      : "border-gray-200"
                  }
                `}
              >

                {sectionActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-lg bg-[#6F4AE7]" />
                )}

                <div className="flex items-center gap-2">

                  <DragIndicatorOutlinedIcon
                    sx={{
                      fontSize: 15,
                      color: "#9ca3af",
                    }}
                  />

                  <div className="flex-1 min-w-0">

                    <p className="text-[11px] font-semibold text-gray-700">
                      {section.title}
                    </p>

                    <p className="text-[9px] text-gray-400 mt-0.5">
                      {section.description}
                    </p>

                  </div>

                  <span className="px-2 py-1 rounded-md bg-[#f0ecff] text-[#6F4AE7] text-[9px] font-semibold whitespace-nowrap">
                    {section.questions.length} Qs
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      deleteSection(section.id)
                    }
                    className="text-gray-400 hover:text-red-500"
                    title="Delete section"
                  >
                    <MoreVertOutlinedIcon
                      sx={{ fontSize: 16 }}
                    />
                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* =================================================
          QUESTIONS
      ================================================= */}

      <div className="flex-1 min-h-0 border-t border-gray-200 px-4 pt-4 flex flex-col">

        {/* HEADER */}

        <div className="flex items-center justify-between mb-3">

          <h2 className="text-[10px] font-bold uppercase tracking-wide text-gray-700">
            Questions in Section A
          </h2>

          <span className="text-[9px] text-gray-400">
            {
              sections.find((section) =>
                section.questions.some(
                  (question) =>
                    question.id === selectedQuestion
                )
              )?.questions.length || 0
            }{" "}
            Questions
          </span>

        </div>

        {/* SEARCH */}

        <div className="flex items-center gap-2 mb-3">

          <div className="flex-1 h-8 rounded-lg border border-gray-200 bg-white flex items-center px-2.5">

            <SearchOutlinedIcon
              sx={{
                fontSize: 15,
                color: "#9ca3af",
              }}
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search questions..."
              className="
                ml-2
                w-full
                outline-none
                text-[10px]
                text-gray-600
                placeholder:text-gray-300
                bg-transparent
              "
            />

          </div>

          <button
            type="button"
            className="h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center"
          >
            <TuneOutlinedIcon sx={{ fontSize: 15 }} />
          </button>

        </div>

        {/* ADD QUESTION */}

        <button
          type="button"
          onClick={() => {
            const firstSection =
              sections[0];

            if (firstSection) {
              addQuestion(firstSection.id);
            }
          }}
          className="
            w-full
            h-8
            rounded-lg
            bg-[#6F4AE7]
            hover:bg-[#5B3BE6]
            text-white
            text-[10px]
            font-semibold
            flex
            items-center
            justify-center
            gap-1.5
            mb-3
            shadow-sm
          "
        >
          <AddOutlinedIcon sx={{ fontSize: 15 }} />
          Add Question
        </button>

        {/* QUESTION LIST */}

        <div className="flex-1 overflow-y-auto pr-1 space-y-1.5">

          {filteredSections.map((section) => {

            const collapsed =
              collapsedSections[section.id];

            return (
              <div key={section.id}>

                {/* SECTION TITLE */}

                <button
                  type="button"
                  onClick={() =>
                    toggleSection(section.id)
                  }
                  className="w-full flex items-center justify-between py-1.5 text-left"
                >

                  <div className="flex items-center gap-1.5">

                    {collapsed ? (
                      <KeyboardArrowDownOutlinedIcon
                        sx={{
                          fontSize: 14,
                          color: "#9ca3af",
                        }}
                      />
                    ) : (
                      <KeyboardArrowUpOutlinedIcon
                        sx={{
                          fontSize: 14,
                          color: "#9ca3af",
                        }}
                      />
                    )}

                    <span className="text-[9px] font-semibold text-gray-500">
                      {section.title}
                    </span>

                  </div>

                  <span className="text-[9px] text-gray-400">
                    {section.questions.length}
                  </span>

                </button>

                {/* QUESTIONS */}

                {!collapsed &&
                  section.questions.map(
                    (question, index) => {

                      const active =
                        question.id ===
                        selectedQuestion;

                      const number =
                        getQuestionNumber(
                          section.id,
                          index
                        );

                      return (
                        <div
                          key={question.id}
                          onClick={() =>
                            setSelectedQuestion(
                              question.id
                            )
                          }
                          className={`
                            group
                            cursor-pointer
                            min-h-[34px]
                            rounded-lg
                            border
                            px-2
                            flex
                            items-center
                            gap-2
                            transition
                            ${
                              active
                                ? "border-[#d9d0ff] bg-[#f5f1ff]"
                                : "border-transparent bg-white hover:border-gray-200"
                            }
                          `}
                        >

                          <span
                            className={`
                              text-[9px]
                              font-semibold
                              w-4
                              ${
                                active
                                  ? "text-[#6F4AE7]"
                                  : "text-gray-400"
                              }
                            `}
                          >
                            {number}.
                          </span>

                          <p
                            className={`
                              flex-1
                              text-[9px]
                              truncate
                              ${
                                active
                                  ? "text-gray-700 font-medium"
                                  : "text-gray-500"
                              }
                            `}
                          >
                            {question.question ||
                              "Enter question..."}
                          </p>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteQuestion(
                                question.id
                              );
                            }}
                            className="
                              opacity-0
                              group-hover:opacity-100
                              text-gray-300
                              hover:text-red-500
                              transition
                            "
                          >
                            <DeleteOutlineOutlinedIcon
                              sx={{ fontSize: 14 }}
                            />
                          </button>

                        </div>
                      );
                    }
                  )}

              </div>
            );
          })}

        </div>

        {/* FOOTER */}

        <div className="py-2 text-[9px] text-gray-400 border-t border-gray-100 mt-2">
          Showing{" "}
          {filteredSections.reduce(
            (total, section) =>
              total + section.questions.length,
            0
          )}{" "}
          questions
        </div>

      </div>

    </aside>
  );
};

export default QuestionSidebar;