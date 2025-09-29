import { CompanyData } from "@/types/bid";
import PptxGenJS from "pptxgenjs";

function addSlideFooter(companyName: string, slide: any, slideNumber: number, totalSlides: number, isTitle: boolean = false) {
  if (!isTitle) {
    // Orange bar
    slide.addShape("rect", {
      x: "5%",
      y: "95%",
      w: 0.25,
      h: 0.08,
      fill: { color: "FF6B35" } // Efeso orange
    });
    
    // "EFESO UK BID" text
    slide.addText("EFESO UK BID", {
      x: "8%",
      y: "95%",
      fontSize: 8,
      bold: true,
      color: "4B5563"
    });
    
    // Company Name
    slide.addText(`${companyName} © EFESO | ${slideNumber}`, {
      x: "20%",
      y: "95%",
      fontSize: 8,
      bold: true,
      color: "374151",
      align: "right"
    });
    
  }
}

export function exportToPPTX(data: CompanyData) {
  const pptx = new PptxGenJS();

  // Slide 1: Title
  const slide1 = pptx.addSlide();
  slide1.addText(data.companyName, { x: 1, y: 1.5, fontSize: 48, bold: true, color: "363636" });
  slide1.addText("Business Intelligence Deck (BID)", { x: 1, y: 3, fontSize: 28, color: "666666" });
  slide1.addText(data.date, { x: 1, y: 4, fontSize: 18, color: "999999" });

  addSlideFooter(data.companyName, slide1, 1, 15, true);
  // Slide 2: Overview
  const slide2 = pptx.addSlide();
  slide2.addText(`Who are ${data.companyName}?`, { x: 0.5, y: 0.5, fontSize: 32, bold: true });
  const bullets = [
    data.overview.description,
    `Founded: ${data.overview.founded}`,
    `Ownership: ${data.overview.ownership}`,
    `Employees: ${data.overview.employees}`,
    `Reach: ${data.overview.reach}`,
    `Business Model: ${data.overview.businessModel}`
  ];
  slide2.addText(bullets.map(b => `• ${b}`).join("\n"), { x: 0.5, y: 1.0, fontSize: 14, valign: "top", color: "363636" });
    addSlideFooter(data.companyName, slide2, 2, 15, false);
  // Slide 3: Ownership
  const slide3 = pptx.addSlide();
  slide3.addText(`Ownership`, { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const ownershipBullets = [
    `Current Owner: ${data.ownership.currentOwner}`,
    `Previous Owner: ${data.ownership.previousOwner}`,
    `Management Continuity: ${data.ownership.managementContinuity}`
  ];
  slide3.addText(ownershipBullets.map(b => `• ${b}`).join("\n"), { x: 0.5, y: 1.0, fontSize: 14, valign: "top" });
    addSlideFooter(data.companyName, slide3, 3, 15, false);
  // Slide 4: Leadership
  const slide4 = pptx.addSlide();
  slide4.addText("Corporate Structure", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const leadershipText = data.leadership.map(l => `• ${l.name} – ${l.title}, ${l.background}`).join("\n");
  slide4.addText(leadershipText, { x: 0.5, y: 1.0, fontSize: 14, valign: "top" });
    addSlideFooter(data.companyName, slide4, 4, 15, false);
  // Slide 5: Governance
  const slide5 = pptx.addSlide();
  slide5.addText("Governance Structure", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  slide5.addText(data.governance.bodies.map(b => `• ${b}`).join("\n"), { x: 0.5, y: 1.0, fontSize: 14, valign: "top" });
    addSlideFooter(data.companyName, slide5, 5, 15, false);
  // Slide 6: Products
  const slide6 = pptx.addSlide();
  slide6.addText("Products/Services", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  slide6.addText(data.products.map(p => `• ${p.category}: ${p.items}`).join("\n"), { x: 0.5, y: 1.5, fontSize: 18 });
    addSlideFooter(data.companyName, slide6, 6, 15, false);
  // Slide 7: Operations Table
  const slide7 = pptx.addSlide();
  slide7.addText("Global Operations", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const headers7: PptxGenJS.TableRow = [
  { text: "Country", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Facilities", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } }
];

// Table rows
const rows7: PptxGenJS.TableRow[] = data.operations.map(op => [
  { text: op.country, options: { border: { pt: 1, color: "000000" } } },
  { text: op.facilities, options: { border: { pt: 1, color: "000000" } } }
]);

slide7.addTable([headers7, ...rows7], {
  x: 0.5,
  y: 1.5,
  w: 9,
  fontSize: 14,
  autoPage: true
});

    addSlideFooter(data.companyName, slide7, 7, 15, false);

  // Slide 8: Financials Table
  const slide8 = pptx.addSlide();
  slide8.addText("Financial Performance", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const headers8: PptxGenJS.TableRow = [
  { text: "Year", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Revenue", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Operating Profit", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Net Profit", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Operating Margin", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Free Cash Flow", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Debt", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
];

// Table rows
const rows8: PptxGenJS.TableRow[] = data.financials.map(f => [
  { text: f.year, options: { border: { pt: 1, color: "000000" } } },
  { text: f.revenue, options: { border: { pt: 1, color: "000000" } } },
  { text: f.operatingProfit, options: { border: { pt: 1, color: "000000" } } },
  { text: f.netProfit, options: { border: { pt: 1, color: "000000" } } },
  { text: f.operatingMargin, options: { border: { pt: 1, color: "000000" } } },
  { text: f.freeCashFlow, options: { border: { pt: 1, color: "000000" } } },
  { text: f.debt, options: { border: { pt: 1, color: "000000" } } },
]);

slide8.addTable([headers8, ...rows8], {
  x: 0.5,
  y: 1.5,
  w: 9,
  fontSize: 12,
  autoPage: true
});
    addSlideFooter(data.companyName, slide8, 8, 15, false);
  // Slide 9: Competitors Table
  const slide9 = pptx.addSlide();
  slide9.addText("Competitors", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const headers9: PptxGenJS.TableRow = [
    { text: "Competitor", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
    { text: "Focus Areas", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
    ];

    // Table rows
    const rows9: PptxGenJS.TableRow[] = data.competitors.map((c, idx) => [
    { text: c.name, options: { border: { pt: 1, color: "000000" } } },
    { text: c.focusAreas, options: { border: { pt: 1, color: "000000" } } },
    ]);

    slide9.addTable([headers9, ...rows9], {
    x: 0.5,
    y: 1.5,
    w: 9,
    fontSize: 12,
    autoPage: true, // automatically split table if too long
    });
    addSlideFooter(data.companyName, slide9, 9, 15, false);
  // Slide 10: Profitability
  const slide10 = pptx.addSlide();
  slide10.addText("Profitability", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const headers10: PptxGenJS.TableRow = [
  { text: "Metric", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Value", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
];
// Table rows
const rows10: PptxGenJS.TableRow[] = [
  { text: "Annual Revenue", options: { border: { pt: 1, color: "000000" } } },
  { text: "Operating Profit", options: { border: { pt: 1, color: "000000" } } },
  { text: "Net Profit", options: { border: { pt: 1, color: "000000" } } },
  { text: "Operating Margin", options: { border: { pt: 1, color: "000000" } } },
  { text: "Net Margin", options: { border: { pt: 1, color: "000000" } } },
].map((row, idx) => [
  row,
  { text: [
    "Annual Revenue",
    data.profitability.annualRevenue,
    "Operating Profit",
    data.profitability.operatingProfit,
    "Net Profit",
    data.profitability.netProfit,
    "Operating Margin",
    data.profitability.operatingMargin,
    "Net Margin",
    data.profitability.netMargin
  ][idx * 2 + 1], options: { border: { pt: 1, color: "000000" } } }
]);

slide10.addTable([headers10, ...rows10], {
  x: 0.5,
  y: 1.5,
  w: 6,
  fontSize: 12,
  autoPage: true,
});
    addSlideFooter(data.companyName, slide10, 10, 15, false);
  // Slide 11-14: Improvements & Analysis (two-column layout)
  const slide11 = pptx.addSlide();
  slide11.addText("Improvement Opportunities", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const col1Items = [
  { text: "Cost Reduction", options: { bold: true, breakLine: true } },
  ...data.improvements.costReduction.map(item => ({ text: item, options: { bullet: true, indentLevel: 0 } })),
  { text: "", options: { breakLine: true } }, // Empty line
  { text: "Portfolio Optimization", options: { bold: true, breakLine: true } },
  ...data.improvements.portfolioOptimization.map(item => ({ text: item, options: { bullet: true, indentLevel: 0 } })),
  { text: "", options: { breakLine: true } }, // Empty line
  { text: "Pricing & Revenue", options: { bold: true, breakLine: true } },
  ...data.improvements.pricingRevenue.map(item => ({ text: item, options: { bullet: true, indentLevel: 0 } }))
];

// Column 2 - Right side
const col2Items = [
  { text: "Innovation & Brand Investment", options: { bold: true, breakLine: true } },
  ...data.improvements.innovation.map(item => ({ text: item, options: { bullet: true, indentLevel: 0 } })),
  { text: "", options: { breakLine: true } }, // Empty line
  { text: "Integration Discipline", options: { bold: true, breakLine: true } },
  ...data.improvements.integrationDiscipline.map(item => ({ text: item, options: { bullet: true, indentLevel: 0 } }))
];

// Add text boxes with proper width and formatting
slide11.addText(col1Items, { 
  x: 0.5, 
  y: 1.0, 
  w: 4.0,
  fontSize: 8,
  color: "363636",
  valign: "top"
});

slide11.addText(col2Items, { 
  x: 5.0, 
  y: 1.0, 
  w: 4.5,
  fontSize: 8,
  color: "363636",
  valign: "top"
});
addSlideFooter(data.companyName, slide11, 11, 15, false);
  // Slide 12-13: Pre/During Meeting Analysis
  const slide12 = pptx.addSlide();
  slide12.addText("Pre-Meeting Analysis", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  slide12.addText(
    ["Dissatisfaction Elements", ...data.analysis.preMeeting.dissatisfaction].join("\n"),
    { x: 0.5, y: 1.5, fontSize: 14 }
  );
  slide12.addText(
    ["EFESO Levers", ...data.analysis.preMeeting.levers].join("\n"),
    { x: 5, y: 1.5, fontSize: 14 }
  );
    addSlideFooter(data.companyName, slide12, 12, 15, false);
  const slide13 = pptx.addSlide();
  slide13.addText("During Meeting Analysis", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  slide13.addText(
    ["Dissatisfaction Elements", ...data.analysis.duringMeeting.dissatisfaction].join("\n"),
    { x: 0.5, y: 1.5, fontSize: 14 }
  );
  slide13.addText(
    ["EFESO Levers", ...data.analysis.duringMeeting.levers].join("\n"),
    { x: 5, y: 1.5, fontSize: 14 }
  );
    addSlideFooter(data.companyName, slide13, 13, 15, false);
  // Slide 14: Follow-up Actions
  const slide14 = pptx.addSlide();
  slide14.addText("Follow-up Actions", { x: 0.5, y: 0.5, fontSize: 28, bold: true });
  const headers14: PptxGenJS.TableRow = [
  { text: "Action", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Who", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "When", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
  { text: "Zoho", options: { bold: true, fill: { color: "F2F2F2" }, border: { pt: 1, color: "000000" } } },
];

// Table rows
const rows14: PptxGenJS.TableRow[] = data.followUp.map(f => [
  { text: f.action, options: { border: { pt: 1, color: "000000" } } },
  { text: f.who, options: { border: { pt: 1, color: "000000" } } },
  { text: f.when, options: { border: { pt: 1, color: "000000" } } },
  { text: f.zoho, options: { border: { pt: 1, color: "000000" } } },
]);

slide14.addTable([headers14, ...rows14], {
  x: 0.5,
  y: 1.5,
  w: 9,
  fontSize: 12,
  autoPage: true,
});
    addSlideFooter(data.companyName, slide14, 14, 15, false);
  // Slide 15: Closing
  const slide15 = pptx.addSlide();
  slide15.addText("Thank You", { x: 3, y: 2.5, fontSize: 40, bold: true });
  slide15.addText("Questions & Discussion", { x: 3, y: 3.5, fontSize: 24 });
    addSlideFooter(data.companyName, slide15, 15, 15, false);
  // Save file
  pptx.writeFile({ fileName: `${data.companyName}_BID.pptx` });
}
