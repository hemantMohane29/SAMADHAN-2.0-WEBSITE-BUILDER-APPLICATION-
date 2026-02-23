# Radha3.0 Web Code Generator

## Project Structure

```
Web Code Generator/
├── index.html          # Login page (GitHub Pages entry point)
├── README.md           # This file
├── note.txt            # Implementation documentation
├── css/                # All CSS files
│   ├── ide.css         # IDE styling
│   └── styles.css      # Main application styles
├── html/               # All HTML files
│   ├── home.html       # Main application page (after login)
│   ├── contact.html    # Contact page
│   ├── IDE.html        # Code editor page
│   ├── jsquiz.html     # JavaScript quiz
│   └── pyquiz.html     # Python quiz
├── js/                 # All JavaScript files
│   ├── ide.js          # IDE functionality
│   └── script.js       # Main application logic
├── docs/               # Documentation
│   └── TODO.md         # Project tasks
└── .vscode/            # VS Code settings
    └── settings.json
```

## Getting Started

1. Open `index.html` in your browser (this is now the login page)
2. Login with any email and password (demo mode - any credentials work)
3. After successful login, you'll be redirected to `html/home.html` (main application)
4. The application will remember your login status using localStorage

## Login Flow

- **GitHub Pages Entry**: `index.html` serves as the login page
- **Login Page**: Accept any email/password or use social login buttons
- **After Login**: Redirects to `html/home.html` with welcome message
- **Logout**: Click logout button to return to login page (`index.html`)
- **Return Visits**: If already logged in, goes directly to main application

## GitHub Pages Deployment

This structure is optimized for GitHub Pages deployment:
- `index.html` (login page) serves as the entry point
- Main application is in `html/home.html`
- All assets properly organized in folders

## File Organization

- **HTML files**: Located in `html/` folder
- **CSS files**: Located in `css/` folder  
- **JavaScript files**: Located in `js/` folder
- **Documentation**: Located in `docs/` folder

All internal file references have been updated to use relative paths that work with this new structure.