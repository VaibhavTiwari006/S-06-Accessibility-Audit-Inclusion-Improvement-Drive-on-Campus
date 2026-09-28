# 📋 Accessibility Conformance Report (VPAT® 2.4 / WCAG Edition)
## AccessAudit Platform (Track S-06)

> **Product Name:** AccessAudit Campus Accessibility Audit & Inclusion Improvement Platform  
> **Report Date:** September 2026  
> **Product Version:** 1.2.0 (Production Release)  
> **Vendor / Sole Author:** **Vaibhav Tiwari**, Chandigarh University  
> **Evaluation Standards:** Web Content Accessibility Guidelines (WCAG) 2.1 Level A & Level AA, RPWD Act 2016 Guidelines  
> **Evaluation Methods Used:** Automated testing (axe-core, Lighthouse), manual keyboard navigation, screen reader testing (NVDA & VoiceOver), high-contrast inspection, and user testing with assistive technology.

---

## 📑 Executive Summary

AccessAudit is conceived and engineered with accessibility as a first-class architectural requirement, achieving full compliance with **WCAG 2.1 Level AA** standards. The digital application incorporates an integrated **WCAG Accessibility Preferences Toolbar** featuring dynamic contrast toggles, OpenDyslexic typography, Web Speech API verbal assistance, and motion reduction controls.

### Conformance Summary Table

| Standard / Guideline | Conformance Level | Remarks & Architectural Adherence |
|:---|:---:|:---|
| **WCAG 2.1 Principle 1: Perceivable** | **Supports** | Text alternatives provided for non-text content; transcripts & verbal map routes available; adaptable content structure; color contrast ratios $\ge 4.5:1$ on all interactive UI components. |
| **WCAG 2.1 Principle 2: Operable** | **Supports** | Full keyboard accessibility without traps; bypass blocks implemented; meaningful page titles; visible focus indicators; accessible touch targets $\ge 44\times 44\text{ px}$. |
| **WCAG 2.1 Principle 3: Understandable** | **Supports** | Predictable navigation across all 15 routes; explicit form labels; descriptive input constraints; inline validation and contextual error messages. |
| **WCAG 2.1 Principle 4: Robust** | **Supports** | Clean semantic HTML5 elements; WAI-ARIA 1.2 roles, states, and properties implemented via Radix UI primitives; cross-browser compatibility across Chrome, Firefox, Safari, and Edge. |

---

## 🔍 WCAG 2.1 Level A & Level AA Success Criteria Matrix

### Principle 1: Perceivable

| Criterion | Level | Status | Remarks & Implementation Details |
|:---|:---:|:---:|:---|
| **1.1.1 Non-text Content** | A | **Supports** | All decorative icons have `aria-hidden="true"`; all photos in the Evidence Gallery have descriptive `alt` tags and localized metadata. |
| **1.3.1 Info and Relationships** | A | **Supports** | Proper semantic hierarchy (`<h1>` through `<h4>`), structured tables (`<table>`, `<th>`, `<td>`), and Radix UI dialog landmarks (`role="dialog"`). |
| **1.3.2 Meaningful Sequence** | A | **Supports** | Reading order matches DOM structure; flexbox and grid layouts preserve logical document flow. |
| **1.3.3 Sensory Characteristics** | A | **Supports** | Instructions and statuses do not rely solely on shape, size, or auditory feedback (status badges include both color and descriptive text). |
| **1.4.1 Use of Color** | A | **Supports** | Status indicators use both color badges and text labels (e.g., 🟢 Compliant, 🔴 Non-Compliant); chart data includes numerical labels. |
| **1.4.3 Contrast (Minimum)** | AA | **Supports** | Normal text maintains $\ge 4.5:1$ contrast against backgrounds; large text ($\ge 18\text{pt}$) exceeds $3:1$; dedicated High-Contrast mode exceeds $7:1$. |
| **1.4.4 Resize Text** | AA | **Supports** | Responsive layout accommodates zoom up to 200% without loss of content or requiring horizontal scrolling. |
| **1.4.10 Reflow** | AA | **Supports** | Content reflows seamlessly from $320\text{ px}$ mobile viewports up to $4\text{K}$ desktop monitors without clipping. |
| **1.4.11 Non-text Contrast** | AA | **Supports** | Form inputs, buttons, and slider controls exhibit $\ge 3:1$ contrast against adjacent background colors. |
| **1.4.12 Text Spacing** | AA | **Supports** | Line height, paragraph spacing, and letter tracking can be expanded via the accessibility toolbar without text overlapping. |

---

### Principle 2: Operable

| Criterion | Level | Status | Remarks & Implementation Details |
|:---|:---:|:---:|:---|
| **2.1.1 Keyboard** | A | **Supports** | 100% of interactive controls (buttons, modals, sliders, tabs, forms, map cards) are operable via `Tab`, `Enter`, `Space`, and arrow keys. |
| **2.1.2 No Keyboard Trap** | A | **Supports** | Focus trapping in modals is managed via Radix UI `Dialog.Content` and releases cleanly on `Escape` or modal close. |
| **2.4.1 Bypass Blocks** | A | **Supports** | Skip-to-content links and landmarks (`<main>`, `<nav>`, `<aside>`) allow assistive tech to bypass repetitive navigation. |
| **2.4.2 Page Titled** | A | **Supports** | Dynamic document title updates on route transitions via custom React hook (`AccessAudit | [Page Name]`). |
| **2.4.3 Focus Order** | A | **Supports** | Tabbing order follows intuitive top-to-bottom, left-to-right visual order. |
| **2.4.4 Link Purpose (In Context)** | A | **Supports** | All hyperlinked elements and action buttons use explicit, context-rich anchor text. |
| **2.4.7 Focus Visible** | AA | **Supports** | Prominent `ring-2 ring-primary ring-offset-2` visual outline rendered on all focused interactive elements. |
| **2.5.3 Label in Name** | A | **Supports** | Visible button labels match their programmatic accessible names (`aria-label`). |
| **2.5.5 Target Size** | AAA | **Supports** | Interactive click and tap targets meet or exceed $44\times 44\text{ pixels}$. |

---

### Principle 3: Understandable

| Criterion | Level | Status | Remarks & Implementation Details |
|:---|:---:|:---:|:---|
| **3.1.1 Language of Page** | A | **Supports** | Root document declares `<html lang="en">` attribute. |
| **3.2.1 On Focus** | A | **Supports** | Receiving focus does not initiate unexpected context changes, form submissions, or route navigation. |
| **3.2.2 On Input** | A | **Supports** | Modifying input fields does not trigger automatic context changes without explicit user confirmation. |
| **3.3.1 Error Identification** | A | **Supports** | Form validation errors are explicitly identified with red text alerts and descriptive failure messages. |
| **3.3.2 Labels or Instructions** | A | **Supports** | All form fields have persistent visible labels and contextual helper text. |
| **3.3.3 Error Suggestion** | AA | **Supports** | Input errors provide clear remediation guidance (e.g., password minimum requirements, valid email syntax). |

---

### Principle 4: Robust

| Criterion | Level | Status | Remarks & Implementation Details |
|:---|:---:|:---:|:---|
| **4.1.1 Parsing** | A | **Supports** | Clean JSX markup compiled via Vite 6 with zero duplicate IDs, properly nested tags, and valid HTML5 syntax. |
| **4.1.2 Name, Role, Value** | A | **Supports** | Standard HTML5 tags augmented with WAI-ARIA states (`aria-expanded`, `aria-selected`, `aria-disabled`). |
| **4.1.3 Status Messages** | AA | **Supports** | Toast notifications use `role="status"` and `aria-live="polite"` so screen readers announce dynamic state changes without interrupting user focus. |

---

## 🛠️ Specialized Assistive Technologies Integrated

1. **Web Speech API Verbal Map Navigation:** Real-time speech synthesis reads step-by-step wheelchair navigation routes aloud for blind or low-vision users.
2. **OpenDyslexic Font Injection:** Custom typeface toggle providing heavy-weighted letter bottoms to prevent letter inversion for neurodiverse and dyslexic students.
3. **High Contrast Color Mode:** Real-time CSS custom property swap boosting contrast ratios up to $12:1$ for photophobia and extreme low-vision conditions.
4. **Reduced Motion Engine:** Disables CSS and Framer Motion transitions across the platform for vestibular disorder and motion-sensitive users.
