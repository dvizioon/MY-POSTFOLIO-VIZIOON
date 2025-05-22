module.exports = {

"[project]/.next-internal/server/app/api/skills/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route.runtime.dev.js [external] (next/dist/compiled/next-server/app-route.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/@opentelemetry/api [external] (@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@opentelemetry/api", () => require("@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/data/skills.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "skillsData": (()=>skillsData)
});
const skillsData = [
    {
        id: 'frontend',
        titleKey: 'skills.categories.frontend',
        iconName: 'LayoutDashboard',
        skills: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "JQuery",
            "Bootstrap",
            "TailwindCSS",
            "React",
            "Material UI",
            "Vue",
            "TypeScript",
            "Figma"
        ]
    },
    {
        id: 'backend',
        titleKey: 'skills.categories.backend',
        iconName: 'Database',
        skills: [
            "Node.js",
            "Express",
            "PHP",
            "MySQL",
            "PostgreSQL",
            "Firebase",
            "Python",
            "Flask",
            "C++",
            "C#"
        ]
    },
    {
        id: 'toolsAndConcepts',
        titleKey: 'skills.categories.toolsAndConcepts',
        iconName: 'Wrench',
        skills: [
            "Git",
            "Docker",
            "CI/CD",
            "Linux",
            "Google Cloud",
            "n8n",
            "Illustrator",
            "Metodologias Ágeis"
        ]
    },
    {
        id: 'aiGenAi',
        titleKey: 'skills.categories.aiGenAi',
        iconName: 'Brain',
        skills: [
            "Genkit",
            "Prompt Engineering",
            "LLMs (Conceitos)",
            "Google AI Studio"
        ]
    }
];
}}),
"[project]/src/app/api/skills/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$skills$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/skills.ts [app-route] (ecmascript)");
;
;
async function GET() {
    // In a real app, you might fetch this from a DB or other source
    const skills = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$skills$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["skillsData"];
    // Simulate a small delay like a real API call
    await new Promise((resolve)=>setTimeout(resolve, 300));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(skills);
}
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__099a7907._.js.map