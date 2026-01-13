# Art Images Folder

Place your artwork images in this folder.

## How to use:

1. **Add your images** to this folder (e.g., `artwork1.jpg`, `artwork2.png`, etc.)

2. **Update the image arrays** in the following files:
   - `src/Home.jsx` - Add image filenames to the `featuredImages` array (these will show on the landing page)
   - `src/Paintings.jsx` - Add ALL image filenames to the `imageNames` array (these will show on the paintings page)

## Example:

If you have images named `painting1.jpg`, `painting2.jpg`, and `painting3.jpg`:

**In `src/Home.jsx`:**
```javascript
const featuredImages = [
  'painting1.jpg',
  'painting2.jpg'
]
```

**In `src/Paintings.jsx`:**
```javascript
const imageNames = [
  'painting1.jpg',
  'painting2.jpg',
  'painting3.jpg'
]
```

## Supported formats:
- JPG/JPEG
- PNG
- WebP
- GIF
