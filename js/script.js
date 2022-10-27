"use strict";

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

/** Handle input events into the form and update preview accordingly */
function handleInput(evt) {
  let targetInput = evt.target.getAttribute('id');
  switch (targetInput) {
    case 'imgLink':
      if (isValidImage(evt.target.value)) {
        previewImg.src = evt.target.value;
      } else {
        previewImg.src = '';
      }
      break;

    case 'topText':
      previewTopText.innerText = evt.target.value;
      break;

    case 'botText':
      previewBotText.innerText = evt.target.value;
      break;
  }
}

/** Handle form submission and generate meme */
function handleSubmit(evt) {
  evt.preventDefault();
  console.log('form submitted');

  if (!isValidImage(imgLink.value)) {
    alert('Please supply a valid image URL');
    return;
  }

  memeForm.reset();
  console.log('form reset');
  generateMeme();
}

function generateMeme() {
  let newMeme = previewMeme.cloneNode(true);

  let btnGroup = document.createElement('div');
  btnGroup.classList.add('btn-group');

  let copyBtn = document.createElement('button');
  copyBtn.classList.add('copy-btn');
  copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
  btnGroup.appendChild(copyBtn);

  let delBtn = document.createElement('button');
  delBtn.classList.add('del-btn');
  delBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  btnGroup.appendChild(delBtn);

  newMeme.appendChild(btnGroup);
  memeSection.appendChild(newMeme);

  delBtn.addEventListener('click', deleteMeme);
}

function deleteMeme(evt) {
  let evtParent = evt.target.parentNode;
  if (evtParent.classList.contains('meme-div')) {
    evtParent.remove();
  } else if (evtParent.classList.contains('btn-group')) {
    evtParent.parentNode.remove();
  }
}

let memeForm;
let imgLink;
let previewMeme;
let previewImg;
let previewTopText;
let previewBotText;
let memeSection;

document.addEventListener("DOMContentLoaded", function() {
  memeForm = document.getElementById("memeForm");
  imgLink = document.getElementById("imgLink");
  previewMeme = document.querySelector("#previewSection .meme-div");
  previewImg = document.querySelector("#previewSection .meme-img");
  previewTopText = document.querySelector("#previewSection .top-text");
  previewBotText = document.querySelector("#previewSection .bot-text");
  memeSection = document.getElementById("memeSection");

  memeForm.addEventListener("input", handleInput);
  memeForm.addEventListener("submit", handleSubmit);

});