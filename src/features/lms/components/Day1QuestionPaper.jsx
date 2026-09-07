import { useNavigate } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import logo from "../../../assets/images/NTF_logo_black.png";

const SECTIONS = [
  {
    name: "General Questions",
    questions: [
      { q: "कंपनी कब START हुई?", options: ["1990", "1984", "2000", "1980"] },
      {
        q: "कंपनी का MAIN प्लांट कहाँ है?",
        options: ["Sanand Gujarat", "Neemrana", "IMT Manesar", "Delhi"],
      },
      {
        q: "NTF की उत्पाद श्रेणी क्या है?",
        options: ["Metal", "Plastic", "Plating", "Rubber"],
      },
      {
        q: "NTF का पहला प्रोडक्ट कौन सा है?",
        options: ["Hard Top", "Bumper", "Spoiler", "Roof Garnish"],
      },
      {
        q: "NTF में कौन सा Process नहीं है?",
        options: ["PIM", "Paint Shop", "Casting", "TCM"],
      },
      {
        q: "निम्नलिखित में से कौन सा 5S नहीं है?",
        options: ["Seiri", "Seiketsu", "Seiso", "Shitsuke"],
      },
      {
        q: "काइज़न क्या है?",
        options: ["निरंतर सुधार", "अंतरायिक सुधार", "[अस्पष्ट] सुधार", "सुधार रोकें"],
      },
      {
        q: "पर्यावरण को क्या दूषित करता है?",
        options: ["Waste", "Process", "Part", "Man"],
      },
    ],
  },
  {
    name: "Safety Questions",
    questions: [
      { q: "आग कितने प्रकार की होती है?", options: ["3", "4", "5", "6"] },
      {
        q: "प्राथमिक चिकित्सा से क्या अभिप्राय है?",
        options: [
          "मरीज को दी जाने वाली पूर्व चिकित्सा",
          "मरीज को दी जाने वाली अस्पताल चिकित्सा",
          "दोनों हैं",
          "इनमें से कोई नहीं",
        ],
      },
      {
        q: "निम्नलिखित में से कौन PPE किट का हिस्सा नहीं है?",
        options: ["दस्ताने", "सुरक्षा चश्मा", "हेलमेट", "पेचकस"],
      },
      {
        q: "फायर एक्सटिंगुइशर में PASS शब्द की क्रियाओं में इनमें से कौन-सा शब्द नहीं है?",
        options: ["Pull", "Squeeze", "Alert", "Sweep"],
      },
      {
        q: "ABC Type Fire Extinguisher को कौन-सी आग पर प्रयोग करेंगे?",
        options: [
          "हर प्रकार की आग पर",
          "केवल बिजली के सामान पर",
          "केवल लकड़ी की वस्तुओं पर",
          "इनमें से कोई भी नहीं",
        ],
      },
    ],
  },
  {
    name: "Maintenance Questions",
    questions: [
      { q: "Maintenance क्या होता है?", options: [] },
      {
        q: "[फोटो में प्रश्न की लाइन स्पष्ट नहीं है]",
        options: ["100", "440", "200", "50"],
      },
      {
        q: "Break down maintenance क्या है?",
        options: [
          "First Maintenance",
          "Maintenance when machine stops",
          "Less Maintenance",
          "None of above",
        ],
      },
    ],
  },
  {
    name: "Stores Questions",
    questions: [
      {
        q: "FIFO से आप क्या समझते हैं?",
        options: [
          "First In First Out",
          "Last In Last Out",
          "Out First Out Last",
          "Thermocompression",
        ],
      },
      {
        q: "मटेरियल इश्यू करते समय किन तीन चीजों का ध्यान रखना चाहिए?",
        options: ["DATE", "SAFETY", "GRADE", "All of the above"],
      },
    ],
  },
  {
    name: "Abnormality Handling",
    questions: [
      {
        q: "बिजली जाने के दौरान बने हुए पार्ट की Handling:",
        options: [
          "बिजली जाने के दौरान बने हुए पार्ट को बिना मार्क किये ना रखें",
          "बिजली जाने के दौरान बने हुए पार्ट को [कुछ शब्द अस्पष्ट] रखें",
          "उपरोक्त दोनों कथन सही हैं",
          "उपरोक्त दोनों कथन गलत हैं",
        ],
      },
      {
        q: "Inspection के दौरान Reject पार्ट की Handling:",
        options: [
          "Reject पार्ट को [अस्पष्ट] मार्क किये और लाल बिन के अलावा ना रखें",
          "Reject पार्ट को हमेशा मार्क करके लाल बिन में रखें",
          "उपरोक्त दोनों कथन सही हैं",
          "उपरोक्त दोनों कथन गलत हैं",
        ],
      },
    ],
  },
];

const ALPHABET = ["a", "b", "c", "d", "e", "f"];

const Day1QuestionPaper = () => {
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
                DOJO TEST PAPER – DAY-1
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
                  DOJO TEST PAPER – DAY-1
                </h1>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">
                  Skill Evaluation Test Paper
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-[11px] font-medium text-gray-800">
                  अंक:{" "}
                  <span className="text-gray-900 font-semibold">___ / 20</span>
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
                    30 मिनट
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
                    पद/डिजिग्नेशन
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
                (ऑब्जेक्टिव टेस्ट में पास होने के लिए 80% अंक लाना अनिवार्य
                है।)
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

                          {item.options.length > 0 ? (
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
                          ) : (
                            <div className="ml-4 w-4/5 border-b border-dotted border-gray-400 pb-0.5" />
                          )}
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

export default Day1QuestionPaper;