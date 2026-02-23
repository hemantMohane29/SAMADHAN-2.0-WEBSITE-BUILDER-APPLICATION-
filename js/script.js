const screens = {
    'home-screen': document.getElementById('home-screen'),
    'editor-screen': document.getElementById('editor-screen'),
    'lessons-screen': document.getElementById('lessons-screen')
};

const navButtons = document.querySelectorAll('.nav-button, .btn-primary[data-screen], .plus-button');
const toggle = document.getElementById('theme-toggle');
const generateButton = document.getElementById('generate-btn');
const promptInput = document.getElementById('prompt-input');
const promptOutput = document.getElementById('prompt-output');
const codeEditorArea = document.getElementById('code-editor-area');

function navigate(screenId) {
    for (const id in screens) {
        screens[id].style.display = 'none';
    }
    if (screens[screenId]) {
        screens[screenId].style.display = (screenId === 'editor-screen') ? 'grid' : 'flex';
    }
    window.scrollTo(0, 0);
}

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        const screenId = button.getAttribute('data-screen');
        if (screenId) {
            navigate(screenId);
        }
    });
});

function initializeTheme() {
    const isLightMode = localStorage.getItem('theme') === 'light';
    if (isLightMode) {
        document.body.classList.add('light-mode');
        toggle.checked = true;
    }
}

toggle.addEventListener('change', () => {
    document.body.classList.toggle('light-mode');
    if (document.body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
});


// this function calls the Gemini API to generate code based on the prompt
async function generateCode(prompt) {
    const apiKey = 'AIzaSyCuTXaSWgNjIDPilhdw1izFkFz7ro64TVk'; // Provided Gemini API key
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': apiKey
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: `You are a code generator. Generate complete, standalone HTML, CSS, and JavaScript code for a website based on this description: ${prompt}. Provide the full code in a single HTML file with embedded styles and scripts. Make it responsive and modern.`
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

generateButton.addEventListener('click', async () => {
    const prompt = promptInput.value.trim();

    if (prompt === '') {
        promptOutput.textContent = '// ERROR: Please enter a detailed description for Radha3.0 AI to generate a website!';
        promptOutput.style.color = '#ff4d4d';
        promptOutput.style.display = 'block';
        return;
    }

    promptOutput.style.color = 'var(--accent-color)';
    promptOutput.textContent = `// Hydra AI: Generating code for "${prompt.substring(0, 50)}..."\n`;
    promptOutput.textContent += 'Progress: 0% [Initializing Hydra Core]...\n';
    promptOutput.style.display = 'block';

    try {
        const generatedCode = await generateCode(prompt);
        promptOutput.textContent = `// CODE GENERATION COMPLETE! (100% human-quality structure from Radha3.0!)\n// Prompt: ${prompt}\n\n${generatedCode}`;
        promptOutput.style.color = 'var(--console-color)';
    } catch (error) {
        promptOutput.textContent = `// ERROR: ${error.message}`;
        promptOutput.style.color = '#ff4d4d';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    checkLoginStatus();
    navigate('home-screen');
});

// Check login status and update UI accordingly
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('radha_logged_in');
    const userEmail = localStorage.getItem('radha_user_email');
    const authButton = document.getElementById('auth-button');
    const welcomeMessage = document.getElementById('welcome-message');
    const userName = document.getElementById('user-name');
    
    if (isLoggedIn === 'true' && userEmail) {
        // User is logged in, show logout button
        authButton.innerHTML = `<a href="#" onclick="logout()">Logout (${userEmail.split('@')[0]})</a>`;
        
        // Show welcome message
        if (welcomeMessage && userName) {
            userName.textContent = userEmail.split('@')[0];
            welcomeMessage.style.display = 'block';
        }
    } else {
        // User is not logged in, redirect to login
        window.location.href = '../index.html';
    }
}

// Logout function
function logout() {
    localStorage.removeItem('radha_logged_in');
    localStorage.removeItem('radha_user_email');
    window.location.href = '../index.html';
}
