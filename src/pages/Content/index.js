import { agemasen } from './modules/sound';

const donateButton = document.querySelector('main form button[type=submit]');

const playSound = async () => {
  agemasen.currentTime = 0;
  await agemasen.play();
}

const disableDonateButton = () => {
  const URL = "https://app.twip.kr/donate";
  const currentURL = window.location.href;
  if (!currentURL.startsWith(URL)) return;

  donateButton.attributes["type"].value = "button";
  donateButton.addEventListener('click', playSound);
}

const enableDonationButton = () => {
  const URL = "https://app.twip.kr/donate";
  const currentURL = window.location.href;
  if (!currentURL.startsWith(URL)) return;

  donateButton.attributes["type"].value = "submit";
  donateButton.removeEventListener('click', playSound);
}

disableDonateButton();

window.chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.do === "enableDonateButton") {
      enableDonationButton();
      return sendResponse({ status: "success" });
    }
    return sendResponse({ status: "fail" });
  }
);