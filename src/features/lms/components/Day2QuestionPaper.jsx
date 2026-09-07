import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import logo from "../../../assets/images/NTF_logo_black.png";

const SECTIONS = [
  {
    name: "Process Questions: (Quality)",
    questions: [
      {
        q: "पार्ट की कलर वैल्यू किस इंस्ट्रूमेंट से चेक करते हैं?",
        options: ["हाईएस्ट गेज कैलिपर", "वर्नियर", "कलर मीटर", "माइक्रोमीटर"],
      },
      {
        q: "पेंटेड पार्ट की DFT किस यंत्र से चेक करते हैं?",
        options: ["Gloss मीटर", "टेपर स्केल", "DFT मीटर", "माइक्रोमीटर"],
      },
      {
        q: "पार्ट की ग्लॉस वैल्यू कैसे चेक करते हैं?",
        options: ["Gloss मीटर", "वर्नियर कैलिपर", "स्केल", "कलर मीटर"],
      },
    ],
  },
  {
    name: "Process Questions: (Plastic Injection Moulding)",
    questions: [
      {
        q: "इंजेक्शन मोल्डिंग में इस्तेमाल किया मोल्ड कैसे ठंडा होता है?",
        options: ["ठंडे सतह से संपर्क करें", "वायु", "पानी", "इनमें से कोई नहीं"],
      },
      {
        q: "प्लास्टिक रॉ मटेरियल मशीन में कहाँ लोड होता है?",
        options: ["हॉपर", "बैरल", "मोल्ड", "इनमें से कोई नहीं"],
      },
      {
        q: "इंजेक्शन मोल्डिंग द्वारा निम्न में से कौनसी सामग्री नहीं बनाई गई है?",
        options: ["नट्स", "कार बम्पर", "इलेक्ट्रिकल स्विच", "कुर्सी"],
      },
      {
        q: "HRTC का प्रयोग किया जाता है?",
        options: [
          "मोल्ड को गर्म करने में",
          "रनर को गर्म रखने में",
          "पार्ट को गर्म करने में",
          "मटेरियल को गर्म करने में",
        ],
      },
      {
        q: "PP मटेरियल का पूरा नाम क्या है?",
        options: ["पॉली इथिलीन", "पॉली कार्बोनेट", "पॉली प्रोपलिन", "प्लास्टिक पॉलिमर"],
      },
    ],
  },
  {
    name: "Process Questions: (Paint Shop)",
    questions: [
      {
        q: "स्प्रे गन से पार्ट की दूरी कितनी होनी चाहिए?",
        options: ["152–228 mm", "250–400 mm", "100–200 mm", "200–400 mm"],
      },
      {
        q: "प्राइमर कोट की DFT कितनी माइक्रोन होनी चाहिए?",
        options: ["8 से 14", "10 से 16", "12 से 18", "14 से 20"],
      },
      {
        q: "असेम्बली करते समय किन-किन बातों का ध्यान देना चाहिए?",
        options: [
          "कोई Child part मिस ना हो",
          "सबसे पहले ध्यान देना चाहिए कि कोई डिफेक्ट ना जाये।",
          "दोनों हैं",
          "इनमें से कोई नहीं।",
        ],
      },
    ],
  },
  {
    name: "Process Questions: (PU Rim)",
    questions: [
      {
        q: "PU Rim में कौन सा मटेरियल यूज़ होता है?",
        options: ["ABC", "PP", "N-66", "ISO/POLYOL"],
      },
      {
        q: "PU Rim में कौन-कौन से डिफेक्ट आते हैं?",
        options: ["बर्स", "एयर बबल", "पिन होल", "B & C"],
      },
    ],
  },
  {
    name: "Process Questions: (TCM)",
    questions: [
      {
        q: "TCM में यूज होने वाले RAW मटेरियल हैं।",
        options: ["फॉम कोर", "पी यू", "प्लास्टिक ग्रेनुअल्स", "वुडस्टॉक, फैब्रिक, PPGF"],
      },
      {
        q: "TCM में क्या-क्या प्रॉब्लम आ सकती हैं।",
        options: ["सिल्वर स्टिक्स", "सिंक मार्क", "शार्ट मोल्डिंग", "उपरोक्त सभी"],
      },
      {
        q: "फैब्रिक ka Material kya होता है।",
        options: ["PVC", "प्लास्टिक का", "धागे का", "फाइबर का"],
      },
    ],
  },
  {
    name: "Process Questions: (LB)",
    questions: [
      {
        q: "L.F में उपयोग होने वाले मटेरियल का नाम लिखे।",
        options: ["ISO & POLYOL", "फाइबर ग्लास", "सरफेस मैट", "उपरोक्त सभी"],
      },
      {
        q: "LF process में कौन सा part बनाया जाता है?",
        options: ["Spoiler", "Luggage Board", "Rear Parcel Tray", "Bumper"],
      },
      {
        q: "फैब्रिक में क्या-क्या प्रॉब्लम आती हैं?",
        options: ["ओवर GSM", "वाइट मार्क या लाइन मार्क", "अनइक्वल कटिंग", "उपरोक्त सभी"],
      },
      {
        q: "LB में क्या-क्या डिफेक्ट्स आते हैं?",
        options: ["पिन होल", "शॉर्ट मोल्डिंग", "एयर बबल", "उपरोक्त सभी"],
      },
    ],
  },
];

const ALPHABET = ["a", "b", "c", "d", "e", "f"];

const Day2QuestionPaper = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FB] print:bg-white">
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-xs print:hidden">
        <div className="h-14 px-4 sm:px-8 flex items-center justify-between max-w-5xl mx-auto gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate("/lms")}
              className="h-9 w-9 rounded-xl bg-gray-100 text-gray-600 hover:bg-primary/10 hover:text-primary transition flex items-center justify-center shrink-0"
              title="Back to LMS"
            >
              <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
            </button>
            <div className="min-w-0">
              <h1 className="text-sm font-bold text-gray-900 truncate leading-tight">
                DOJO TEST PAPER – DAY-2
              </h1>
              <p className="text-[11px] text-gray-500 truncate">
                Print-ready examination layout
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="h-9 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 text-xs font-semibold text-white shadow-md shadow-primary/20 hover:opacity-95 transition flex items-center gap-1.5"
          >
            <PrintOutlinedIcon sx={{ fontSize: 15 }} />
            Print
          </button>
        </div>
      </div>

      <div className="max-w-[760px] mx-auto px-4 py-6 print:p-0 print:max-w-none">
        <div
          className="bg-white shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none"
          style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}
        >
          <div className="p-8 sm:p-10 space-y-5 print:p-8">
            <div className="flex items-start gap-5 pb-3 border-b border-gray-400">
              <div className="shrink-0">
                <img
                  src={logo}
                  alt="NTF Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>

              <div className="flex-1 text-center">
                <h1 className="text-lg font-black text-gray-900 uppercase tracking-wide leading-tight">
                  DOJO TEST PAPER – DAY-2
                </h1>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Skill Evaluation Test Paper
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[11px] font-medium text-gray-800">
                  अंक:{" "}
                  <span className="text-gray-900 font-semibold">____ / 20</span>
                </p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-4 space-y-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 text-[11px] text-gray-800">
                <div className="flex items-center gap-2">
                  <span className="w-28 font-semibold text-gray-700 shrink-0">
                    समय
                  </span>
                  <span className="text-gray-500 shrink-0">:</span>
                  <span className="flex-1 border-b border-gray-300 pb-0.5 text-gray-900 font-medium">
                    30 मिनिट्स
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-28 font-semibold text-gray-700 shrink-0">
                    दिनांक
                  </span>
                  <span className="text-gray-500 shrink-0">:</span>
                  <span className="flex-1 border-b border-gray-300 pb-0.5" />
                </div>

                <div className="flex items-center gap-2 sm:col-span-2">
                  <span className="w-28 font-semibold text-gray-700 shrink-0">
                    सदस्य का नाम
                  </span>
                  <span className="text-gray-500 shrink-0">:</span>
                  <span className="flex-1 border-b border-gray-400 pb-0.5" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-28 font-semibold text-gray-700 shrink-0">
                    क्वालिफिकेशन
                  </span>
                  <span className="text-gray-500 shrink-0">:</span>
                  <span className="flex-1 border-b border-gray-400 pb-0.5" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-28 font-semibold text-gray-700 shrink-0">
                    यूनिट नाम
                  </span>
                  <span className="text-gray-500 shrink-0">:</span>
                  <span className="flex-1 border-b border-gray-400 pb-0.5" />
                </div>
              </div>

              <p className="text-[11px] font-medium text-gray-700">
                (संकेत- टेस्ट में पास होने के लिए 80% अंक लाना अनिवार्य है।)
              </p>
            </div>

            {SECTIONS.map((section, sIdx) => {
              const qs = section.questions;

              return (
                <div key={sIdx} className="space-y-4">
                  <div className="relative flex items-center my-2">
                    <div className="flex-1 h-px bg-gray-300" />
                    <div className="mx-3 px-5 py-1 rounded-full border border-primary/40 bg-primary/5 text-[11px] font-bold text-primary uppercase tracking-widest shrink-0 print:border-gray-400 print:text-gray-800 print:bg-white">
                      {section.name.toUpperCase()}
                    </div>
                    <div className="flex-1 h-px bg-gray-300" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {qs.map((item, qIdx) => {
                      const num =
                        SECTIONS.slice(0, sIdx).reduce(
                          (acc, s) => acc + s.questions.length,
                          0
                        ) +
                        qIdx +
                        1;

                      return (
                        <div key={qIdx} className="space-y-1.5 break-inside-avoid">
                          <p className="text-[11px] font-semibold text-gray-900 leading-snug">
                            <span className="mr-1">{num}.</span>
                            {item.q}
                          </p>

                          <div className="pl-4 space-y-1">
                            {item.options.map((opt, oi) => (
                              <div
                                key={oi}
                                className="flex items-start gap-1 text-[10.5px] leading-snug"
                              >
                                <span className="shrink-0 font-medium">
                                  {ALPHABET[oi]})
                                </span>
                                <span className="text-gray-700">{opt}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Day2QuestionPaper;