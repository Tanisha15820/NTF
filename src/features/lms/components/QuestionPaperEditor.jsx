import Add from "@mui/icons-material/Add";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

const QuestionEditor = ({ question, onChange }) => {
  if (!question) return null;

  const { options = [], correctOption } = question;

  const nextOptionId = () => {
    if (options.length === 0) return 1;

    return Math.max(...options.map((option) => option.id)) + 1;
  };

  // =====================================================
  // ADD OPTION
  // =====================================================

  const addOption = () => {
    const alphabet = "ABCD";

    if (options.length >= 4) {
      return;
    }

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
          : option,
      ),
    });
  };

  // =====================================================
  // REMOVE OPTION
  // =====================================================

  const removeOption = (id) => {
    const updatedOptions = options.filter((option) => option.id !== id);

    // Re-label options
    const alphabet = "ABCD";

    const relabeledOptions = updatedOptions.map((option, index) => ({
      ...option,
      label: alphabet[index],
    }));

    onChange({
      options: relabeledOptions,

      correctOption: correctOption === id ? null : correctOption,
    });
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="h-full flex flex-col bg-white">
      {/* ===============================================
          HEADER
      =============================================== */}

      <div
        className="
          px-6
          py-4
          border-b
          border-gray-200
        "
      >
        <h2 className="text-lg font-bold text-gray-800">{question.title}</h2>

        <p className="text-xs text-gray-400 mt-1">
          Create and edit your question
        </p>
      </div>

      {/* ===============================================
          CONTENT
      =============================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          p-6
          space-y-7
        "
      >
        {/* ============================================
            QUESTION
        ============================================ */}

        <div>
          <label
            className="
              text-sm
              font-medium
              text-gray-700
            "
          >
            Question
          </label>

          <textarea
            rows={4}
            value={question.question}
            onChange={(e) =>
              onChange({
                question: e.target.value,
              })
            }
            placeholder="Enter the question here..."
            className="
              mt-2
              w-full
              border
              border-gray-200
              rounded-xl
              p-3.5
              text-sm
              outline-none
              resize-none
              bg-gray-50/50

              focus:bg-white
              focus:border-primary
              focus:ring-2
              focus:ring-primary/15

              transition
            "
          />
        </div>

        {/* ============================================
            OPTIONS
        ============================================ */}

        <div>
          <div
            className="
              flex
              items-center
              justify-between
              mb-3
            "
          >
            <h3
              className="
                text-sm
                font-semibold
                text-gray-700
              "
            >
              Options
            </h3>

            <span
              className="
                text-xs
                text-gray-400
              "
            >
              Select the correct answer
            </span>
          </div>

          <div className="space-y-2.5">
            {options.map((option) => {
              const isCorrect = correctOption === option.id;

              return (
                <div
                  key={option.id}
                  className={`
                      flex
                      items-center
                      gap-3
                      border
                      rounded-xl
                      px-3
                      py-2
                      group
                      transition-all

                      ${
                        isCorrect
                          ? "border-primary bg-primary/10 shadow-sm"
                          : "border-gray-200 hover:border-primary/40 hover:bg-primary/[0.02]"
                      }
                    `}
                >
                  {/* OPTION LETTER */}

                  <button
                    type="button"
                    onClick={() =>
                      onChange({
                        correctOption: option.id,
                      })
                    }
                    className={`
                        h-8
                        w-8
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-sm
                        font-semibold
                        shrink-0
                        transition

                        ${
                          isCorrect
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }
                      `}
                  >
                    {option.label}
                  </button>

                  {/* INPUT */}

                  <input
                    value={option.value}
                    onChange={(e) => updateOption(option.id, e.target.value)}
                    className="
                        flex-1
                        h-10
                        bg-transparent
                        rounded-lg
                        px-1
                        text-sm
                        outline-none
                        placeholder:text-gray-300
                      "
                    placeholder={`Option ${option.label}`}
                  />

                  {/* CORRECT ICON */}

                  {isCorrect && (
                    <CheckCircleOutlinedIcon
                      sx={{
                        fontSize: 18,
                        color: "#6F4AE7",
                      }}
                    />
                  )}

                  {/* DELETE OPTION */}

                  <button
                    type="button"
                    onClick={() => removeOption(option.id)}
                    title="Remove option"
                    className="
                        text-red-400
                        text-lg
                        opacity-0
                        group-hover:opacity-100
                        hover:text-red-500
                        transition
                        leading-none
                      "
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>

          {/* ==========================================
              ADD OPTION
          ========================================== */}

          {options.length < 4 && (
            <button
              type="button"
              onClick={addOption}
              className="
                mt-3
                w-full
                h-11
                rounded-xl
                border-2
                border-dashed
                border-primary/25
                text-primary
                text-sm
                font-medium
                hover:border-primary/60
                hover:bg-primary/5
                transition
                flex
                items-center
                justify-center
                gap-1.5
              "
            >
              <Add fontSize="small" />
              Add Option
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionEditor;
