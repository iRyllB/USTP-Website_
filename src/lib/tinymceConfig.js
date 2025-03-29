/**
 * Centralized TinyMCE configuration
 * This allows us to maintain TinyMCE settings in one place
 */

// Hard-coded API key - in a production environment, use process.env.REACT_APP_TINYMCE_API_KEY
export const TINYMCE_API_KEY = "lvfyum4dnqydc0gvbs8qi8fv7tgy4mi78km2sa2flziuj3eb";

// Common editor configuration
export const getEditorConfig = (height = 500, imageUploadHandler) => ({
  height,
  menubar: 'file edit view insert format tools table help',
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount',
    'emoticons'
  ],
  toolbar1: 'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  toolbar2: 'forecolor backcolor | link image media | table emoticons | removeformat code fullscreen help',
  content_style: `
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
      max-width: 100%;
      padding: 1rem;
    }
    h2 { font-size: 1.75em; margin: 1.5em 0 0.75em; }
    h3 { font-size: 1.5em; margin: 1.5em 0 0.75em; }
    h4 { font-size: 1.25em; margin: 1.5em 0 0.75em; }
    p { margin: 0 0 1em; }
    blockquote { 
      margin: 1em 0;
      padding: 0.5em 1em;
      border-left: 4px solid #e0e0e0;
      background: #f8f9fe;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 1em auto;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    table td, table th {
      border: 1px solid #e0e0e0;
      padding: 0.5em;
    }
  `,
  images_upload_handler: imageUploadHandler,
  automatic_uploads: true,
  file_picker_types: 'image',
  image_title: true,
  image_caption: true,
  image_advtab: true,
  image_dimensions: true,
  images_upload_credentials: true,
  images_reuse_filename: false,
  images_file_types: 'jpeg,jpg,png,gif,webp',
  browser_spellcheck: true,
  contextmenu: 'link image table',
  resize: true,
  statusbar: true,
  branding: false
});

// Export a function for getting a configured TinyMCE editor
export default getEditorConfig; 