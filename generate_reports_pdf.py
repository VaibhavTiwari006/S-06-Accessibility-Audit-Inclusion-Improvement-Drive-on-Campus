import os
import re
import base64
import subprocess
from markdown_it import MarkdownIt

def read_file(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def get_base64_image(image_path):
    if not os.path.exists(image_path):
        return None
    ext = os.path.splitext(image_path)[1].lower().replace(".", "")
    mime = "image/jpeg" if ext in ["jpg", "jpeg"] else "image/png"
    with open(image_path, "rb") as f:
        b64 = base64.b64encode(f.read()).decode("utf-8")
    return f"data:{mime};base64,{b64}"

def convert_md_to_html(md_content, title, subtitle, doc_category, base_dir="."):
    # Initialize MarkdownIt with tables and strikethrough
    md = MarkdownIt("commonmark").enable(["table", "strikethrough"])
    
    # Process image links before markdown rendering or in html
    # Replace markdown image syntax with base64 embedded images
    def replace_img(match):
        alt = match.group(1)
        src = match.group(2).strip()
        
        # Strip file:/// if present
        cleaned_src = src.replace("file:///", "").replace("file://", "")
        # Try finding image relative to workspace or docs
        potential_paths = [
            cleaned_src,
            os.path.join(base_dir, cleaned_src),
            os.path.join(base_dir, "docs", os.path.basename(cleaned_src)),
            os.path.join(base_dir, os.path.basename(cleaned_src))
        ]
        
        data_uri = None
        for p in potential_paths:
            if os.path.exists(p) and os.path.isfile(p):
                data_uri = get_base64_image(p)
                break
        
        if data_uri:
            return f'<figure class="report-figure"><img src="{data_uri}" alt="{alt}" /><figcaption>{alt}</figcaption></figure>'
        return match.group(0)

    # Replace markdown images
    md_content_processed = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', replace_img, md_content)
    
    # Render body HTML
    body_html = md.render(md_content_processed)
    
    # Post-process body_html: wrap tables in table-container for responsive styling
    body_html = re.sub(r'<table>', '<div class="table-container"><table>', body_html)
    body_html = re.sub(r'</table>', '</table></div>', body_html)

    # HTML document template with publication-grade CSS
    full_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{title}</title>
  <style>
    @page {{
      size: A4;
      margin: 20mm 18mm 20mm 18mm;
    }}
    
    * {{
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }}

    body {{
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 10pt;
      line-height: 1.6;
      color: #1e293b;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }}

    /* Header Banner */
    .header-banner {{
      border-bottom: 3px solid #C8102E;
      padding-bottom: 14px;
      margin-bottom: 24px;
    }}

    .inst-bar {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      font-size: 8pt;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748b;
      font-weight: 700;
    }}

    .inst-pill {{
      display: inline-block;
      background: #fef2f2;
      color: #C8102E;
      padding: 3px 10px;
      border-radius: 9999px;
      border: 1px solid #fecaca;
      font-weight: 800;
    }}

    h1.report-title {{
      font-size: 20pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.25;
      margin: 0 0 6px 0;
      letter-spacing: -0.5px;
    }}

    .report-subtitle {{
      font-size: 11pt;
      color: #475569;
      font-weight: 600;
      margin: 0 0 14px 0;
    }}

    .meta-grid {{
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 10px 14px;
      font-size: 8.5pt;
    }}

    .meta-item {{
      display: flex;
      flex-direction: column;
    }}

    .meta-label {{
      color: #64748b;
      font-size: 7pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }}

    .meta-val {{
      font-weight: 700;
      color: #0f172a;
      margin-top: 2px;
    }}

    /* Typography */
    h1, h2, h3, h4, h5, h6 {{
      color: #0f172a;
      font-weight: 800;
      page-break-after: avoid;
      break-after: avoid;
    }}

    h1 {{
      font-size: 15pt;
      margin-top: 24px;
      margin-bottom: 12px;
      padding-bottom: 6px;
      border-bottom: 1.5px solid #e2e8f0;
      color: #C8102E;
    }}

    h2 {{
      font-size: 12.5pt;
      margin-top: 20px;
      margin-bottom: 10px;
      color: #1e293b;
    }}

    h3 {{
      font-size: 10.5pt;
      margin-top: 16px;
      margin-bottom: 8px;
      color: #334155;
    }}

    h4 {{
      font-size: 9.5pt;
      margin-top: 12px;
      margin-bottom: 6px;
      color: #475569;
    }}

    p {{
      margin-top: 0;
      margin-bottom: 10px;
      text-align: justify;
    }}

    ul, ol {{
      margin-top: 0;
      margin-bottom: 12px;
      padding-left: 20px;
    }}

    li {{
      margin-bottom: 4px;
    }}

    /* Tables */
    .table-container {{
      width: 100%;
      margin: 14px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }}

    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 8pt;
      line-height: 1.45;
      page-break-inside: avoid;
      break-inside: avoid;
    }}

    th, td {{
      padding: 6px 8px;
      border: 1px solid #cbd5e1;
      text-align: left;
      vertical-align: top;
    }}

    th {{
      background-color: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 7.5pt;
      letter-spacing: 0.3px;
    }}

    tr:nth-child(even) td {{
      background-color: #f8fafc;
    }}

    /* Code & Pre */
    code {{
      font-family: "Cascadia Code", "Fira Code", Consolas, "Courier New", monospace;
      font-size: 8pt;
      background: #f1f5f9;
      color: #b91c1c;
      padding: 2px 4px;
      border-radius: 4px;
      border: 1px solid #e2e8f0;
    }}

    pre {{
      background: #0f172a;
      color: #f8fafc;
      padding: 12px 14px;
      border-radius: 6px;
      font-size: 7.5pt;
      line-height: 1.4;
      overflow-x: auto;
      page-break-inside: avoid;
      break-inside: avoid;
      margin: 12px 0;
    }}

    pre code {{
      background: transparent;
      color: #f8fafc;
      padding: 0;
      border: none;
    }}

    /* Blockquotes */
    blockquote {{
      margin: 12px 0;
      padding: 10px 16px;
      background: #fff1f2;
      border-left: 4px solid #C8102E;
      color: #881337;
      font-style: italic;
      font-size: 9pt;
      border-radius: 0 6px 6px 0;
      page-break-inside: avoid;
      break-inside: avoid;
    }}

    blockquote p {{
      margin: 0;
    }}

    /* Figures & Images */
    figure.report-figure {{
      margin: 16px 0;
      text-align: center;
      page-break-inside: avoid;
      break-inside: avoid;
    }}

    figure.report-figure img {{
      max-width: 94%;
      height: auto;
      border-radius: 6px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
    }}

    figcaption {{
      font-size: 7.5pt;
      color: #64748b;
      margin-top: 6px;
      font-weight: 600;
    }}

    /* Footer styling */
    .report-footer {{
      margin-top: 28px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      font-size: 7.5pt;
      color: #94a3b8;
      font-weight: 600;
    }}

    hr {{
      border: none;
      border-top: 1px solid #e2e8f0;
      margin: 20px 0;
    }}
  </style>
</head>
<body>
  <div class="header-banner">
    <div class="inst-bar">
      <span>Chandigarh University &bull; C Square Club &bull; CUSoC 2026</span>
      <span class="inst-pill">{doc_category}</span>
    </div>
    <h1 class="report-title">{title}</h1>
    <div class="report-subtitle">{subtitle}</div>
    <div class="meta-grid">
      <div class="meta-item">
        <span class="meta-label">Author & Researcher</span>
        <span class="meta-val">Vaibhav Tiwari (Solo)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Track & Focus</span>
        <span class="meta-val">Track S-06 (Accessibility)</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Verification Status</span>
        <span class="meta-val">100% Passed & Deployed</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Date & Version</span>
        <span class="meta-val">October 2026 &bull; v2.0.0</span>
      </div>
    </div>
  </div>

  <div class="report-content">
    {body_html}
  </div>

  <div class="report-footer">
    <span>AccessAudit Platform &bull; Track S-06 &bull; Chandigarh University</span>
    <span>Sole Engineering & Authorship: Vaibhav Tiwari</span>
  </div>
</body>
</html>"""
    return full_html

def convert_html_to_pdf(html_path, pdf_path):
    chrome_path = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    edge_path = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
    browser = chrome_path if os.path.exists(chrome_path) else edge_path

    cmd = [
        browser,
        "--headless=new",
        "--no-sandbox",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_path}",
        html_path
    ]
    print(f"Generating PDF via Chrome: {pdf_path}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if os.path.exists(pdf_path):
        size_kb = os.path.getsize(pdf_path) / 1024
        print(f"Successfully created: {pdf_path} ({size_kb:.1f} KB)")
        return True
    else:
        print(f"Error creating PDF: {result.stderr}")
        return False

def main():
    workspace_dir = os.path.abspath(".")
    
    # 1. Generate Technical Report PDF
    tech_md_path = os.path.join(workspace_dir, "docs", "TECHNICAL_REPORT.md")
    if not os.path.exists(tech_md_path):
        tech_md_path = os.path.join(workspace_dir, "TECHNICAL_REPORT.md")
    
    tech_md = read_file(tech_md_path)
    tech_html = convert_md_to_html(
        tech_md,
        title="AccessAudit — Final Technical Report",
        subtitle="Empirical Ground Research Across 29 Campus Buildings & Production Full-Stack Cloud Architecture",
        doc_category="CUSoC 2026 Deliverable 7: Technical Report",
        base_dir=workspace_dir
    )
    
    temp_tech_html = os.path.join(workspace_dir, "temp_technical_report.html")
    with open(temp_tech_html, "w", encoding="utf-8") as f:
        f.write(tech_html)
    
    pdf_tech_root = os.path.join(workspace_dir, "AccessAudit_Technical_Report.pdf")
    convert_html_to_pdf(temp_tech_html, pdf_tech_root)
    
    # 2. Generate Testing Report PDF
    test_md_path = os.path.join(workspace_dir, "deliverables", "05_TESTING_REPORT.md")
    if not os.path.exists(test_md_path):
        test_md_path = os.path.join(workspace_dir, "docs", "TESTING_REPORT.md")
        
    test_md = read_file(test_md_path)
    test_html = convert_md_to_html(
        test_md,
        title="AccessAudit — Comprehensive Testing & Bug Resolution Report",
        subtitle="Quality Assurance Strategy, Automated Test Pyramid, WCAG 2.1 AA Audit & Defect Resolution Log",
        doc_category="CUSoC 2026 Deliverable 5: Testing Report",
        base_dir=workspace_dir
    )
    
    temp_test_html = os.path.join(workspace_dir, "temp_testing_report.html")
    with open(temp_test_html, "w", encoding="utf-8") as f:
        f.write(test_html)
        
    pdf_test_root = os.path.join(workspace_dir, "AccessAudit_Testing_Report.pdf")
    convert_html_to_pdf(temp_test_html, pdf_test_root)
    
    # Clean up temp HTML files
    for p in [temp_tech_html, temp_test_html]:
        if os.path.exists(p):
            os.remove(p)
            
    # Also copy copies into deliverables/
    deliv_dir = os.path.join(workspace_dir, "deliverables")
    if os.path.exists(deliv_dir):
        import shutil
        shutil.copy(pdf_tech_root, os.path.join(deliv_dir, "AccessAudit_Technical_Report.pdf"))
        shutil.copy(pdf_test_root, os.path.join(deliv_dir, "AccessAudit_Testing_Report.pdf"))
        print("Copied PDFs into deliverables/ directory.")

if __name__ == "__main__":
    main()
