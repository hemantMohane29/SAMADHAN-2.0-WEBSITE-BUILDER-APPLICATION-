let files = { "index.html":"", "style.css":"", "script.js":"" };
let currentFile = "index.html";

const codeArea = document.getElementById("code");
const fileSwitcher = document.getElementById("fileSwitcher");
const preview = document.getElementById("preview");

function updateFileSwitcher(){
  fileSwitcher.innerHTML="";
  for(let f in files){
    let opt = document.createElement("option");
    opt.value=f;
    opt.textContent=f;
    if(f===currentFile) opt.selected=true;
    fileSwitcher.appendChild(opt);
  }
}
updateFileSwitcher();
codeArea.value = files[currentFile];

// Switch file
fileSwitcher.addEventListener("change", ()=>{
  files[currentFile] = codeArea.value;
  currentFile = fileSwitcher.value;
  codeArea.value = files[currentFile];
});

// New file buttons
document.getElementById("newHtml").addEventListener("click", ()=>{
  currentFile="index.html"; files[currentFile]=""; updateFileSwitcher(); codeArea.value="";
});
document.getElementById("newCss").addEventListener("click", ()=>{
  currentFile="style.css"; files[currentFile]=""; updateFileSwitcher(); codeArea.value="";
});
document.getElementById("newJs").addEventListener("click", ()=>{
  currentFile="script.js"; files[currentFile]=""; updateFileSwitcher(); codeArea.value="";
});

// Run code
document.getElementById("runBtn").addEventListener("click", ()=>{
  files[currentFile]=codeArea.value;
  let html = files["index.html"]||"";
  let css = files["style.css"]?"<style>"+files["style.css"]+"</style>":"";
  let js = files["script.js"]?"<script>"+files["script.js"]+"<\/script>":"";
  preview.srcdoc = html+css+js;
});
