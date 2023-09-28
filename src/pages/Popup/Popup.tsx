import React, { useState } from 'react';
import logo from '../../assets/img/icon-128.png';
import './Popup.css';

// const donateButton: HTMLButtonElement = document.querySelector('main form button[type=submit]')!;

const Popup = () => {
  const [dontong, setDontong] = useState(false);

  const enableDonateButton = async () => {
    setDontong(true);
    // get current tab
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if (!tab.id) return;
    const response = chrome.tabs.sendMessage(tab.id!, { do: "enableDonateButton" });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button type="button" onClick={enableDonateButton} style={{ padding: "0.5rem", background: "white", color: "black" }}>
          {dontong ? "저런..." : "저는 돈통입니다"}
        </button>
        <a
          style={{ color: "lightyellow" }}
          target="_blank"
          href="https://twip.kr/member/mypage/donate"
        >
          역대 후원금액 확인하기
        </a>
      </header>
    </div>
  );
};

export default Popup;
