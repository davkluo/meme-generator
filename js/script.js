"use strict";

/** Handle input events into the form and update preview accordingly */
function handleInput(evt) {
  let targetInput = evt.target.getAttribute('id');
  switch (targetInput) {
    case 'imgLink':
      if (isValidImage(evt.target.value)) {
        previewImg.src = evt.target.value;
      }
      break;

    case 'topText':
      previewTopText.innerText = evt.target.value.toUpperCase();
      break;

    case 'botText':
      previewBotText.innerText = evt.target.value.toUpperCase();
      break;
  }
}

/** Handle template image load event; loads image source to preview and URL input */
function loadTemplate(evt) {
  if (evt.target.tagName !== "IMG") {
    return;
  }
  imgLink.value = evt.target.src;
  previewImg.src = evt.target.src;
}

/** Handle font color toggle event; toggles from light to dark text */
function toggleFontColor(evt) {
  let memeTexts = document.querySelectorAll("#previewSection .meme-text");
  if (evt.target.checked) {
    for (let i = 0; i < memeTexts.length; i++) {
      memeTexts[i].style.color = "#000000";
      memeTexts[i].style.textShadow = "none";
      fontColorLabel.innerText = "Dark";
    }
  } else {
    for (let i = 0; i < memeTexts.length; i++) {
      memeTexts[i].style.color = "";
      memeTexts[i].style.textShadow = "";
      fontColorLabel.innerText = "Light";
    }
  }
}

/** Handle form submission, reset form, and generate meme */
function handleSubmit(evt) {
  evt.preventDefault();

  if (!isValidImage(imgLink.value)) {
    alert('Please supply a valid image URL');
    return;
  }

  generateMeme();
  resetGenerator();
}

/** Evaluate whether link is a valid image URL:
 *  -link: string with the candidate URL
 *
 *  Returns true if the link is a valid image URL, false otherwise
 */
function isValidImage(link) {
  // Guard against invalid URL
  if (!isValidURL(link)) {
    return false;
  }

  // Check if provided link is an image using RegExp
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(link);
}

/** Evaluate whether link is a valid URL:
 *  -link: string with the candidate URL
 *
 *  Returns true if the link is a valid URL, false otherwise
 */
function isValidURL(link) {
  // Check if provided link is a valid URL using RegExp
  return /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(link);
}

/** Generate meme from preview and create delete buttons */
function generateMeme() {
  let newMeme = previewMeme.cloneNode(true);

  let delBtn = document.createElement('button');
  delBtn.classList.add('del-btn');
  delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  delBtn.addEventListener('click', deleteMeme);

  newMeme.appendChild(delBtn);
  memeSection.appendChild(newMeme);
}

/** Reset the meme generator form and preview area */
function resetGenerator() {
  memeForm.reset();
  previewImg.src = "https://via.placeholder.com/600/FFFFFF/?text=Your+Meme+Here";
  previewTopText.innerText = "";
  previewBotText.innerText = "";

  let memeTexts = document.querySelectorAll("#previewSection .meme-text");
  for (let i = 0; i < memeTexts.length; i++) {
    memeTexts[i].style.color = "";
    memeTexts[i].style.textShadow = "";
    fontColorLabel.innerText = "Light";
  }
}

/** Handle meme delete button event; removes meme */
function deleteMeme(evt) {
  let memeDiv = evt.target;
  while (!memeDiv.classList.contains('meme-div')) {
    memeDiv = memeDiv.parentNode;
  }
  memeDiv.remove();
}

// Variable declarations for elements we will need to access
let memeForm;
let imgLink;
let templateList;
let fontColorSwitch;
let fontColorLabel;
let previewMeme;
let previewImg;
let previewTopText;
let previewBotText;
let memeSection;


// Script setup after DOM has loaded
document.addEventListener("DOMContentLoaded", function() {
  // Variable assignments for elements we will need to access
  memeForm = document.getElementById("memeForm");
  imgLink = document.getElementById("imgLink");
  templateList = document.getElementById("templateList");
  fontColorSwitch = document.getElementById("fontColorSwitch");
  fontColorLabel = document.getElementById("fontColorLabel");
  previewMeme = document.querySelector("#previewSection .meme-div");
  previewImg = document.querySelector("#previewSection .meme-img");
  previewTopText = document.querySelector("#previewSection .top-text");
  previewBotText = document.querySelector("#previewSection .bot-text");
  memeSection = document.getElementById("memeSection");


  // Form event listeners
  memeForm.addEventListener("input", handleInput);
  memeForm.addEventListener("submit", handleSubmit);
  templateList.addEventListener("click", loadTemplate);
  fontColorSwitch.addEventListener("click", toggleFontColor);
});