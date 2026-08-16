# Screen-Reader Friendly Verbal Directory Map

This document describes the design and keyboard accessibility standards implemented in the Verbal Campus Map Guide for visually impaired students.

---

## 🔍 Context and Rationale
Standard graphical maps (such as Leaflet/Google Maps rendering markers and overlays) are highly visual and difficult to parse with voice synthesizers or braille displays. The **Verbal Map** provides a text-based, keyboard-friendly alternative where users can browse buildings verbally.

---

## ⚙️ Key Technical Features

### 1. Web Speech Synthesis API Integration
*   Utilizes the native HTML5 Web Speech Synthesis API.
*   Triggers an active voice reading of the building's specific accessibility features on request.
*   Enforces single-stream synthesis: requesting audio stops any currently active speaking instance before starting the new stream.

### 2. High-Contrast Semantic Layout
*   Employs clear HTML5 tags (`<main>`, `<h2>`, `<button>`) with logical `tabindex` flows.
*   Utilizes standard focus rings and high-contrast color text elements for low-vision support.

### 3. Keyboard Shortcut Interceptors
*   Allows quick navigation focus using HTML standard `accesskey` properties.
*   Users can press `Alt + S` to focus directly on the Search Directory Input box.
