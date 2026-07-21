# 🎁 Madam Ji — Birthday Website

A beautiful, animated birthday website built with love. ❤️

## 📁 File Structure

```
madam-ji/
├── index.html          ← Main website file
├── css/
│   └── style.css       ← All styles
├── js/
│   └── script.js       ← All JavaScript (edit CONFIG here)
└── assets/
    ├── album.jpg       ← Album cover image (replace with actual)
    └── music.mp3       ← 🎵 ADD YOUR SONG HERE
```

## ⚙️ Before Sharing — Customize

### 1. Add Your Song
Place your MP3 file in `assets/` and rename it `music.mp3`
(or update the `<source src="...">` in `index.html`)

### 2. Edit the Script Config
Open `js/script.js` and update the `CONFIG` object at the top:

```js
const CONFIG = {
  // Change this to the date you first met her
  startDate: new Date(2025, 1, 13),  // Month is 0-indexed!

  // Customize these 15 reasons
  reasons: [ ... ],

  // Customize 6 love notes
  loveNotes: [ ... ],

  // Customize checklist items
  checklistItems: [ ... ],
};
```

### 3. Update the Letter
Open `index.html` and find `<!-- ── SECTION 7: FINAL LETTER ── -->` to edit the personal letter text.

### 4. Update Track Info
In `index.html`, update the song name & artist:
```html
<p class="track-name">Your Song Name</p>
<p class="track-artist">Artist Name</p>
```

### 5. (Optional) Add Her Photo as Hero Background
In `css/style.css`, find `.hero-bg` and add:
```css
.hero-bg {
  background-image: url('../assets/photo.jpg');
  background-size: cover;
  background-position: center;
  filter: blur(3px) brightness(0.85);
}
```

## 🚀 How to Open
Just open `index.html` in any browser.
For best experience, use Chrome or Safari on iPhone.

## 📱 Designed For
iPhone 15 (390 × 844px) — works on all devices.

---
Made with ❤️ for Madam Ji
