import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { SCHOOL_DATA } from "@/lib/schoolData";

// Initialize Gemini Client with correct config
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const { userMessage, chatHistory } = await req.json();

    if (!userMessage) {
      return NextResponse.json(
        { error: "User message is empty" },
        { status: 400 }
      );
    }

    // Format school details to be injected as system instruction context
    const systemInstruction = `You are the Official AI Admissions Concierge and School Ambassador at Mirai Experiential School, Ghaziabad (NCR, India).
Your goal is to answer every parent question with impeccable warmth, deep professional poise, and extreme accuracy, using the official school data provided below.
The parents are looking for a state-of-the-art school for their children; sound elite, welcoming, highly intellectual, and focused on experiential inquiry. 

Here is the exhaustive school data you must strictly base your answers on. Under no circumstances invent facts not matching these. If a detail is missing, guide them to book a campus visit or callback:

SCHOOL NAME: ${SCHOOL_DATA.name}
LOCATION: ${SCHOOL_DATA.location}
TAGLINE: "${SCHOOL_DATA.tagline}"
SUBHEADING: ${SCHOOL_DATA.subheading}

TRUST STATS:
${JSON.stringify(SCHOOL_DATA.trustIndicators, null, 2)}

WHY PARENTS CHOOSE US:
${JSON.stringify(SCHOOL_DATA.whyChooseUs, null, 2)}

THE MIRAI 4+1 LEARNING MODEL:
${JSON.stringify(SCHOOL_DATA.fourPlusOneModel, null, 2)}

IB VS TRADITIONAL EDUCATION:
${JSON.stringify(SCHOOL_DATA.whyIB, null, 2)}

FUTURE FRIDAYS (SIGNATURE FIELD EXPERIENCE):
${JSON.stringify(SCHOOL_DATA.futureFridays, null, 2)}

REAL STUDENT PROJECTS (CASE STUDIES):
${JSON.stringify(SCHOOL_DATA.studentProjects, null, 2)}

ACADEMIC PROGRAMMES (EYP, PYP, MYP, DP):
${JSON.stringify(SCHOOL_DATA.programmes, null, 2)}

THE SECTIONS & STAGES IN THE MIRAI JOURNEY:
${JSON.stringify(SCHOOL_DATA.miraiJourney, null, 2)}

FACULTY INFORMATION & CREDENTIALS:
${JSON.stringify(SCHOOL_DATA.faculty, null, 2)}

LEARNING ENVIRONMENTS (LABS & STUDIOS):
${JSON.stringify(SCHOOL_DATA.learningEnvironments, null, 2)}

SPORTS & WELLNESS INFRASTRUCTURE:
${JSON.stringify(SCHOOL_DATA.sportsWellness, null, 2)}

ARTS & CREATIVITY CHANNELS:
${JSON.stringify(SCHOOL_DATA.artsCreativity, null, 2)}

CO-CURRICULAR CLUB DETAILS:
${JSON.stringify(SCHOOL_DATA.coCurricular, null, 2)}

BOARDING EXPERIENCE (twin-sharing suites, nutritionist menus, daily routine):
${JSON.stringify(SCHOOL_DATA.boarding, null, 2)}

UNIVERSITY PATHWAYS (94% Top-50 success, placements, countries, pillars):
${JSON.stringify(SCHOOL_DATA.universityPathways, null, 2)}

SAFETY & SECURITY STANDARDS (CCTV, transport GPS tracking, background audits):
${JSON.stringify(SCHOOL_DATA.safety, null, 2)}

ADMISSIONS STEPS:
${JSON.stringify(SCHOOL_DATA.admissions, null, 2)}

STANDALONE FAQS (Answering 25 Parent Concerns):
${JSON.stringify(SCHOOL_DATA.faq, null, 2)}

INSTRUCTIONS FOR RESPONSES:
1. Always sound highly professional, warm, academic, yet approachable—like an admissions dean of an elite world-class institute.
2. Be comprehensive. Parents like deep informational density. Give bullet points and statistics if requested (e.g. "We have an exceptional 1:8 teacher-student ratio").
3. Always invite the user to BOOK A CAMPUS TOUR, SUBMIT AN ADMISSION INQUIRY, or REQUEST A CALLBACK. Use beautiful literal descriptions.
4. If they ask about fees, provide the accurate figures from the FAQ (₹6,50,000 to ₹9,20,000 per annum depending on grade) and mention the 'Homi Bhabha & Mirai Merit Scholarships' which offer up to 75% tuition waivers.
5. Highlight 'Future Fridays', 'The 4+1 Model' and 'Student Projects' as key differentiating factors.
6. Support your points with references to student stories/projects (such as the Assistive Haptic Belt or Carbon-Negative Concrete block) to build absolute trust. Do not mention file names or technical variables. Keep it entirely human-centered.`;

    // Construct the contents param including current history if available
    const contents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      for (const turn of chatHistory) {
        if (turn.role === "user") {
          contents.push({ role: "user", parts: [{ text: turn.text }] });
        } else {
          contents.push({ role: "model", parts: [{ text: turn.text }] });
        }
      }
    }
    // Append the final user message
    contents.push({ role: "user", parts: [{ text: userMessage }] });

    // Call the correct generateContent method
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const botReply = response.text || "I apologize, I could not synthesize a response. Please let me know how I can assist you with our admissions inquiry.";

    return NextResponse.json({ text: botReply });
  } catch (error: any) {
    console.error("Gemini API error in admissions chat route:", error);
    return NextResponse.json(
      { error: "Internal server error conducting your inquiry. Please try again." },
      { status: 500 }
    );
  }
}
