(function () {
	if (window.__weissStickerLoaded) return;
	window.__weissStickerLoaded = true;

	const script = document.currentScript;

	const offerText =
		script.dataset.offerText || "Bonus up to 7000 USDT + 260 free spins";
	const ctaText = script.dataset.ctaText || "GET BONUS";
	const color = script.dataset.color || "#FFD700";
	const logoURLLight = script.dataset.logoLight || "./images/WS_light.svg";
	const logoURLDark = script.dataset.logoDark || "./images/WS_dark.svg";
	const linkURL = script.dataset.link || "https://partner.com/offer";

	const MAX_RESHOWS = 3;
	const BASE_TIMEOUT = 30000;

	const container = document.createElement("div");
	container.style.position = "fixed";
	container.style.zIndex = "999999";
	container.style.bottom = "20px";
	container.style.right = "20px";

	const shadow = container.attachShadow({ mode: "open" });

	shadow.innerHTML = `
    <style>
      .sticker {
        width: 25vw;
        max-width: 190px;
        min-width: 90px;
        font-size: clamp(10px, 3.5vw, 14px);
        background: ${color};
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        padding: 16px;
        font-family: "Stolzl", sans-serif;
        animation: popIn 0.5s ease;
        position: relative;
        transition: transform 0.3s;
      }

      .sticker:hover {
        animation: bounce 0.8s;
      }

      .close {
        position: absolute;
        top: 6px;
        right: 10px;
        width: 18px;
        height: 18px;
        cursor: pointer;
        color: #333;
        display: grid;
        align-items: center;
        justify-content: center;
      }

      .logo-tab {
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: white;
        border-radius: 10px 0 0 0;
        padding: 6px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        display: none;
        cursor: pointer;
      }

      @keyframes popIn {
        from { transform: translateX(120%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }

      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      @media (min-width: 768px) {
        .sticker {
          width: 15vw;
          max-width: 300px;
          min-width: 200px;
          font-size: clamp(12px, 2vw, 18px);
        }

        .logo-tab {
          bottom: 0;
          right: 0;
        }
      }
    </style>

    <div class="sticker" id="sticker">
      <div class="close" id="close"><img src="./images/close.svg" width="8" height="8"/></div>
      <div style="color: #ffffff;">${offerText}</div>
      <a href="${linkURL}" target="_blank" style="display:block; margin-top:10px; text-align:right; font-weight:bold; color: #ffffff; text-decoration: none;">${ctaText}</a>
    </div>

    <div class="logo-tab" id="logoTab">
      <img id="logo" src="${logoURLDark}" alt="logo" width="40" height="40">
    </div>
  `;

	document.body.appendChild(container);

	const sticker = shadow.getElementById("sticker");
	const close = shadow.getElementById("close");
	const logoTab = shadow.getElementById("logoTab");
	const logoImg = shadow.getElementById("logo");

	function setLogoBasedOnTheme() {
		const prefersDarkScheme = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;
		logoImg.src = prefersDarkScheme ? logoURLLight : logoURLDark;
		logoTab.style.backgroundColor = prefersDarkScheme ? "#ffffff" : "#1a1a1a";
	}

	setLogoBasedOnTheme();
	window
		.matchMedia("(prefers-color-scheme: dark)")
		.addEventListener("change", setLogoBasedOnTheme);

	let closeCount = 0;

	function hideSticker() {
		sticker.style.display = "none";
		logoTab.style.display = "block";
		if (closeCount < MAX_RESHOWS) {
			const delay = BASE_TIMEOUT + closeCount * 10000;
			setTimeout(() => {
				sticker.style.display = "block";
				logoTab.style.display = "none";
				closeCount++;
			}, delay);
		}
	}

	close.addEventListener("click", hideSticker);
	logoTab.addEventListener("click", () => {
		sticker.style.display = "block";
		logoTab.style.display = "none";
	});
})();