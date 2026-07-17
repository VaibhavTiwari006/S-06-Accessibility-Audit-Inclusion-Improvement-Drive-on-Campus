# WCAG 2.1 AA Accessibility Audit Checklist
**Target:** Digital Portals (Website, LMS, Student Portals)
**Standard:** WCAG 2.1 Level AA

## 1. Perceivable
- [ ] **1.1.1 Non-text Content:** All images, charts, and icons have appropriate alternative text (alt attributes).
- [ ] **1.2.2 Captions (Prerecorded):** All prerecorded video content in the LMS has synchronized captions.
- [ ] **1.3.1 Info and Relationships:** HTML semantic tags (h1-h6, lists, tables) are used correctly to structure content.
- [ ] **1.4.3 Contrast (Minimum):** Text and images of text have a contrast ratio of at least 4.5:1 (or 3:1 for large text).
- [ ] **1.4.11 Non-text Contrast:** UI components (buttons, inputs) and graphics have a contrast ratio of at least 3:1.
- [ ] **1.4.12 Text Spacing:** Content does not break when line height, letter spacing, and word spacing are adjusted.

## 2. Operable
- [ ] **2.1.1 Keyboard:** All interactive elements (links, buttons, forms, dropdowns) are fully operable via a keyboard interface.
- [ ] **2.1.2 No Keyboard Trap:** Keyboard focus can be moved into and out of all components without getting stuck.
- [ ] **2.4.1 Bypass Blocks:** A "Skip to Main Content" link is available at the top of every page.
- [ ] **2.4.3 Focus Order:** The tab order is logical and follows the visual reading order of the page.
- [ ] **2.4.7 Focus Visible:** A highly visible focus indicator (e.g., a thick outline) is present for all keyboard-focusable elements.
- [ ] **2.5.3 Label in Name:** The visible text label of a component matches or is included in its accessible name.

## 3. Understandable
- [ ] **3.1.1 Language of Page:** The default language of the document is correctly identified (e.g., `<html lang="en">`).
- [ ] **3.2.1 On Focus:** Navigating to a component does not cause an unexpected change of context.
- [ ] **3.2.2 On Input:** Changing the setting of any user interface component does not cause an unexpected change of context.
- [ ] **3.3.1 Error Identification:** Form errors are identified in text and clearly describe the problem.
- [ ] **3.3.2 Labels or Instructions:** Forms have clear labels and instructions indicating required fields.
- [ ] **3.3.3 Error Suggestion:** When a form error is detected, suggestions for correction are provided to the user.

## 4. Robust
- [ ] **4.1.2 Name, Role, Value:** All custom UI components (e.g., accordions, custom checkboxes) have appropriate ARIA roles, states, and properties so assistive technologies can understand them.
- [ ] **4.1.3 Status Messages:** Status messages (e.g., "Search successful", "Form submitted") are announced to screen readers via ARIA live regions without requiring focus to move.

## Audit Notes
- **LMS Specific:** Ensure that course material uploads (PDFs, PPTs) also follow accessibility guidelines.
- **Portals Specific:** Ensure timed sessions (e.g., exam portals) provide users the ability to extend the time (Guideline 2.2.1).
