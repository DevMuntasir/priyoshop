/* @ds-bundle: {"format":3,"namespace":"PriyoShopDesignSystem_0fb1f5","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"PlayIcon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"EcosystemCard","sourcePath":"components/marketing/EcosystemCard.jsx"},{"name":"MediaCard","sourcePath":"components/marketing/MediaCard.jsx"},{"name":"MetricStat","sourcePath":"components/marketing/MetricStat.jsx"},{"name":"SectionHeading","sourcePath":"components/marketing/SectionHeading.jsx"},{"name":"StoreButton","sourcePath":"components/marketing/StoreButton.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"NavBar","sourcePath":"components/navigation/NavBar.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"68263a1b6bd9","components/core/Badge.jsx":"98d2554d47b5","components/core/Button.jsx":"abda6af598f2","components/core/Icon.jsx":"2464b2113bf6","components/core/IconButton.jsx":"d486646ea82c","components/forms/Input.jsx":"2c61eefbcb0c","components/marketing/EcosystemCard.jsx":"39aef217a790","components/marketing/MediaCard.jsx":"fc946247cea6","components/marketing/MetricStat.jsx":"d366b4bec6bb","components/marketing/SectionHeading.jsx":"d6244de3c73a","components/marketing/StoreButton.jsx":"c30ec94c9f80","components/navigation/Footer.jsx":"bdfedb2243e7","components/navigation/NavBar.jsx":"3cd77b3594f4","ui_kits/website/ps-app.jsx":"bc13b6231ec1","ui_kits/website/ps-sections-a.jsx":"e48f3f75d102","ui_kits/website/ps-sections-b.jsx":"6daa518b33db","ui_kits/website/ps-sections-c.jsx":"bf50a5b98df6"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PriyoShopDesignSystem_0fb1f5 = window.PriyoShopDesignSystem_0fb1f5 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* PriyoShop logo — wordmark + bag mark, recreated 1:1 from the brand SVG.
   "Priyo" is ink, "Shop" is brand red, the bag is red with a white heart. */

const WORDMARK_INK = ['M37.6016 28.2025L37.6233 11.5581L44.9877 11.5684C45.808 11.5692 46.5461 11.7088 47.198 11.9847C47.8516 12.2614 48.4122 12.6468 48.8809 13.1399C49.3486 13.6343 49.7086 14.2069 49.9593 14.8585C50.2096 15.5109 50.334 16.213 50.3337 16.9648C50.3323 17.7168 50.2056 18.4141 49.9535 19.057C49.7008 19.7 49.3397 20.2513 48.8704 20.7106C48.4009 21.1701 47.8392 21.5277 47.1852 21.7857C46.5315 22.0439 45.7937 22.172 44.973 22.1712L41.1028 22.1663L41.0943 28.2071L37.6016 28.2025ZM44.4241 19.3375C45.4298 19.3388 46.1543 19.1104 46.5993 18.6513C47.0432 18.1921 47.2659 17.5957 47.2671 16.8603C47.2683 16.1588 47.0469 15.5807 46.6034 15.1296C46.16 14.6774 45.4362 14.451 44.4306 14.4499L41.1128 14.4458L41.1068 19.3328L44.4241 19.3375Z', 'M51.9746 28.221L51.9902 15.8888L55.0569 15.8922L55.055 17.3596C55.3236 16.9396 55.6043 16.6116 55.8986 16.3753C56.191 16.1407 56.4932 15.9598 56.8036 15.8349C57.1134 15.7086 57.4276 15.6292 57.7458 15.5962C58.065 15.5625 58.3915 15.5458 58.7262 15.5459L59.1541 15.5465L59.1495 18.9052C58.8476 18.8548 58.5458 18.8297 58.2442 18.8294C56.2504 18.8263 55.2524 19.8198 55.2502 21.8077L55.241 28.2251L51.9746 28.221Z', 'M60.816 14.4226L60.8197 11.3896L64.087 11.3939L64.0828 14.4266L60.816 14.4226ZM60.7969 28.234L60.8139 15.901L64.0808 15.9057L64.0636 28.2388L60.7969 28.234Z', 'M74.1628 26.622C73.927 27.1728 73.5036 27.603 72.8915 27.9113C72.2788 28.2198 71.5878 28.3733 70.8173 28.3721C70.1638 28.3711 69.5609 28.2664 69.0079 28.0572C68.4556 27.847 67.9786 27.5458 67.5769 27.1529C67.1756 26.7597 66.8617 26.291 66.6362 25.7473C66.4106 25.2044 66.2987 24.5897 66.2999 23.9046L66.3105 15.9087L69.5778 15.9128L69.5675 23.4326C69.5649 24.9712 70.2593 25.7406 71.6501 25.7419C72.4041 25.7437 73.011 25.5261 73.4732 25.0921C73.9349 24.6589 74.1666 24.1079 74.1672 23.4387L74.1764 15.919L77.4441 15.9238L77.4272 28.5816C77.4257 29.4509 77.2778 30.2278 76.9838 30.9123C76.6895 31.5973 76.2868 32.1727 75.7748 32.6401C75.2634 33.1074 74.6599 33.4656 73.9646 33.7161C73.269 33.9655 72.5271 34.09 71.7395 34.0882C69.9129 34.0862 68.5483 33.6201 67.6452 32.6923C66.7413 31.7631 66.2911 30.4976 66.293 28.893L69.3338 28.8967C69.3332 29.6323 69.5454 30.2083 69.9728 30.6269C70.3993 31.0453 71.0395 31.2549 71.8944 31.2566C72.1959 31.2566 72.4809 31.195 72.7489 31.0708C73.0173 30.946 73.2562 30.7714 73.4664 30.5476C73.6758 30.3238 73.8439 30.0448 73.9701 29.7132C74.096 29.3814 74.1598 29.0149 74.1598 28.6164L74.1628 26.622Z', 'M84.8584 28.5915C83.8552 28.5903 82.9606 28.4297 82.175 28.1108C81.3898 27.7919 80.7258 27.3468 80.1833 26.7776C79.6399 26.2067 79.2287 25.5201 78.9444 24.7163C78.661 23.9124 78.5203 23.0332 78.5215 22.0786C78.523 21.1082 78.6711 20.2204 78.964 19.4173C79.2577 18.6139 79.6815 17.9279 80.2333 17.3598C80.786 16.7909 81.4518 16.3527 82.229 16.0438C83.0076 15.7346 83.8891 15.5809 84.8765 15.5825C85.8464 15.5836 86.7154 15.7396 87.4842 16.0507C88.2529 16.3619 88.9085 16.7977 89.4515 17.3596C89.9938 17.9204 90.4104 18.6036 90.7028 19.4075C90.9939 20.2124 91.1398 21.108 91.1389 22.0958C91.1369 23.0835 90.9888 23.9755 90.695 24.7695C90.401 25.5643 89.9829 26.2466 89.4383 26.8143C88.894 27.3837 88.2336 27.8212 87.4562 28.1303C86.6775 28.4387 85.8117 28.5928 84.8584 28.5915ZM84.8751 25.8597C86.869 25.8625 87.8672 24.6101 87.8708 22.1041C87.8742 19.6136 86.8786 18.368 84.8848 18.3652C82.8911 18.3623 81.8924 19.6061 81.8891 22.0958C81.886 24.6027 82.8814 25.8574 84.8751 25.8597Z'];
const WORDMARK_RED = ['M102.738 16.5589C102.655 15.7067 102.346 15.0714 101.809 14.6526C101.273 14.2349 100.467 14.0251 99.3925 14.023C97.4117 14.0199 96.4203 14.6957 96.4191 16.0493C96.4183 16.5343 96.6224 16.9394 97.0333 17.2661C97.4442 17.5924 98.103 17.8648 99.0094 18.0837C100.083 18.3362 101.014 18.5709 101.803 18.7893C102.591 19.0074 103.313 19.2594 103.968 19.5437C104.337 19.695 104.685 19.8831 105.012 20.1094C105.339 20.3357 105.616 20.6157 105.842 20.9502C106.067 21.2842 106.247 21.6862 106.381 22.1542C106.515 22.6216 106.581 23.1905 106.581 23.8586C106.579 24.6605 106.411 25.371 106.075 25.9885C105.739 26.6069 105.286 27.128 104.715 27.5535C104.145 27.9789 103.474 28.3034 102.703 28.5279C101.932 28.7525 101.12 28.864 100.265 28.8626C97.8359 28.8595 96.0099 28.3851 94.7885 27.4396C93.5663 26.4942 92.9229 25.1026 92.8594 23.2635L96.2263 23.268C96.2417 24.1204 96.5886 24.7931 97.2664 25.2872C97.9451 25.7811 98.7947 26.0295 99.8163 26.0303C100.922 26.0322 101.76 25.8325 102.33 25.433C102.9 25.0331 103.186 24.4915 103.187 23.8073C103.188 23.5407 103.154 23.2943 103.088 23.0697C103.021 22.8445 102.891 22.6394 102.699 22.4557C102.506 22.2725 102.241 22.1094 101.905 21.9666C101.569 21.8239 101.133 21.694 100.596 21.5764C99.3191 21.3083 98.2159 21.036 97.283 20.7585C96.3508 20.4828 95.5826 20.1396 94.9796 19.7301C94.3753 19.3208 93.9304 18.8242 93.646 18.2397C93.3609 17.6554 93.2191 16.9124 93.221 16.0115C93.2216 15.3274 93.3484 14.6855 93.6011 14.0849C93.8532 13.4854 94.2406 12.9645 94.7614 12.5229C95.2819 12.0814 95.9251 11.7318 96.6884 11.4742C97.4527 11.2167 98.3557 11.0892 99.397 11.0903C100.404 11.092 101.31 11.2223 102.116 11.4833C102.92 11.7433 103.612 12.1109 104.191 12.5888C104.769 13.0649 105.218 13.6427 105.535 14.3192C105.854 14.9972 106.029 15.7448 106.061 16.5633L102.738 16.5589Z', 'M115.867 28.3083L115.876 20.663C115.878 19.7273 115.716 19.0878 115.39 18.7448C115.064 18.4015 114.523 18.2295 113.769 18.2285C113.367 18.2277 113.006 18.3077 112.688 18.4651C112.369 18.6248 112.101 18.8406 111.883 19.1158C111.665 19.3914 111.501 19.7094 111.391 20.0677C111.282 20.4275 111.227 20.8162 111.227 21.2333L111.217 28.3021L107.949 28.298L107.973 11.4531L111.24 11.4578L111.224 17.5731C111.342 17.3064 111.522 17.0524 111.764 16.8102C112.007 16.5688 112.287 16.3639 112.606 16.197C112.922 16.0303 113.274 15.8976 113.658 15.7974C114.043 15.6981 114.445 15.648 114.863 15.6487C116.134 15.6509 117.165 15.9984 117.959 16.6924C118.752 17.3872 119.147 18.3528 119.146 19.5884L119.133 28.3126L115.867 28.3083Z', 'M127.107 28.6481C126.102 28.6471 125.21 28.4869 124.424 28.1681C123.637 27.8493 122.974 27.4039 122.431 26.834C121.888 26.2642 121.476 25.578 121.193 24.7731C120.909 23.9687 120.769 23.09 120.77 22.1355C120.771 21.1647 120.918 20.2772 121.212 19.4741C121.505 18.6709 121.93 17.9852 122.482 17.4165C123.035 16.8477 123.7 16.4098 124.478 16.1008C125.255 15.7916 126.138 15.6381 127.124 15.6392C128.094 15.6411 128.963 15.7968 129.732 16.1079C130.501 16.419 131.157 16.8541 131.698 17.4165C132.242 17.9778 132.659 18.6602 132.951 19.465C133.243 20.2693 133.388 21.1648 133.387 22.1527C133.384 23.1407 133.237 24.0319 132.943 24.8261C132.65 25.6215 132.231 26.3037 131.686 26.8718C131.143 27.4405 130.482 27.8787 129.704 28.1878C128.925 28.4961 128.06 28.6502 127.107 28.6481ZM127.123 25.9169C129.116 25.9194 130.115 24.6672 130.119 22.1609C130.122 19.6714 129.126 18.4249 127.134 18.4221C125.139 18.4196 124.142 19.6632 124.137 22.1525C124.134 24.6588 125.129 25.9143 127.123 25.9169Z', 'M135.021 34.1744L135.047 16.0012L138.189 16.005L138.211 17.5091C138.967 16.2909 140.116 15.6832 141.657 15.6851C142.427 15.6862 143.143 15.8368 143.805 16.1391C144.466 16.4403 145.031 16.8761 145.499 17.4446C145.967 18.0133 146.335 18.7073 146.602 19.5261C146.869 20.3456 147.002 21.2736 147.001 22.3093C146.999 23.2449 146.886 24.1013 146.658 24.878C146.43 25.6546 146.099 26.3272 145.662 26.8945C145.226 27.4622 144.694 27.9 144.065 28.2079C143.436 28.5169 142.72 28.6698 141.915 28.6687C140.391 28.6671 139.168 28.0229 138.249 26.7343L138.239 34.1783L135.021 34.1744ZM140.864 25.886C142.74 25.888 143.681 24.6196 143.684 22.0792C143.686 20.9766 143.427 20.0775 142.908 19.3836C142.39 18.6891 141.72 18.342 140.899 18.3408C140.112 18.3396 139.454 18.6639 138.924 19.3149C138.396 19.966 138.131 20.8187 138.13 21.8713C138.127 24.5452 139.037 25.8829 140.864 25.886Z'];
const BAG_RED = ['M2.27497 7.12744L0 33.0629L5.90204 35.6108L4.88789 7.26774L2.27497 7.12744Z', 'M32.3166 30.4924L29.8103 8.75653L28.9036 8.68308L23.5237 8.24823L22.6787 8.17933L22.6937 10.5317C22.809 10.627 22.8828 10.7716 22.8828 10.9328C22.8828 11.2209 22.6495 11.4542 22.3618 11.4542C22.0743 11.4542 21.8408 11.2209 21.8408 10.9328C21.8408 10.7774 21.9095 10.6384 22.0174 10.5427L22.0183 10.5426L22.0024 8.12479L21.157 8.05632L19.0828 7.88845L18.4068 7.83377L15.4429 7.59391L14.5979 7.52544V9.93588C14.7047 10.0316 14.7725 10.1718 14.7725 10.3291C14.7725 10.4176 14.751 10.5014 14.7129 10.5745C14.628 10.7383 14.4594 10.85 14.2658 10.85C14.0723 10.85 13.9039 10.7383 13.8187 10.5745C13.7807 10.5014 13.7586 10.4178 13.7586 10.3291C13.7586 10.1778 13.8221 10.0419 13.9225 9.94658V7.4712L13.0773 7.40244L11.004 7.23456L10.3281 7.18002L6.19577 6.84575L5.50781 6.79004L7.07542 31.4301L7.36633 36L31.4351 30.6896L32.2159 30.5173L32.3172 30.4951L32.3166 30.4924Z'];
const BAG_INK = ['M11.0037 4.80196C11.0034 3.56251 11.3236 2.51072 11.825 1.78881C12.3298 1.06484 12.9875 0.675588 13.724 0.674268C13.8661 0.674268 14.0968 0.688632 14.2467 0.71986L14.308 0.733793C14.4691 0.523113 14.644 0.331934 14.8303 0.160985L14.3834 0.0598228C14.1897 0.0197979 13.9127 2.38186e-06 13.7241 2.38186e-06C12.7317 -0.00131712 11.8603 0.545692 11.2685 1.40571C10.673 2.26794 10.3287 3.44845 10.3281 4.80212V6.47862L11.004 6.53521V4.80196H11.0037Z', 'M14.5973 4.80211C14.5966 3.56265 14.9174 2.51086 15.4186 1.78895C15.5778 1.56023 15.7526 1.36524 15.9399 1.20529C16.1503 1.02583 16.376 0.89125 16.6149 0.802256C16.8385 0.718541 17.0741 0.674846 17.3176 0.674553C17.4599 0.674553 17.7746 0.688926 17.9247 0.720154L18.6475 0.81882C19.5467 1.00252 20.3822 1.62035 20.9898 2.33552C21.5984 3.04952 21.9729 3.93857 21.9811 4.8131L21.9978 7.45578L22.0011 7.94472L22.0019 8.12491L22.2838 8.14749L22.6784 8.17945L22.677 8.00103L22.6741 7.51251L22.6571 4.8068C22.6441 3.7446 22.2009 2.71788 21.5052 1.89891C20.8085 1.08052 19.8527 0.37928 18.7839 0.15863L18.0611 0.0598124C17.8674 0.0197874 17.5059 9.1816e-07 17.3174 9.1816e-07C16.7856 -0.000438916 16.2892 0.157162 15.8514 0.435137C15.6294 0.576031 15.4226 0.74698 15.2347 0.945199C15.1008 1.08609 14.976 1.23989 14.8621 1.4057C14.266 2.26793 13.9219 3.44844 13.9219 4.80211V7.47147L14.5973 7.52571V4.80211Z'];
const BAG_WHITE = ['M22.6948 10.5318L22.696 10.6935H22.6956L22.6944 10.5316L22.6798 8.17953L22.2853 8.14758L22.0033 8.125L22.0192 10.5428L22.0183 10.5429C21.9104 10.6386 21.8418 10.7778 21.8418 10.933C21.8418 11.2211 22.0752 11.4544 22.3628 11.4544C22.6504 11.4544 22.8837 11.2211 22.8837 10.933C22.8839 10.7715 22.8101 10.6271 22.6948 10.5318Z', 'M14.5991 9.93602V9.7315V7.52544L13.9237 7.47119V9.7315V9.94658C13.8231 10.0419 13.7598 10.1778 13.7598 10.3291C13.7598 10.4176 13.7818 10.5014 13.8199 10.5745C13.905 10.7383 14.0735 10.85 14.2669 10.85C14.4605 10.85 14.6291 10.7383 14.7141 10.5745C14.7522 10.5014 14.7736 10.4178 14.7736 10.3291C14.7736 10.1719 14.7059 10.0318 14.5991 9.93602Z', 'M23.9176 15.8756C22.469 14.463 20.4053 14.3733 19.1329 15.5991C17.6007 14.3793 15.5587 14.479 14.4076 15.8971C13.1719 17.4187 13.4313 19.8803 14.9869 21.3962L20.2878 26.5595L24.4969 21.3745C25.7321 19.8518 25.4728 17.3905 23.9176 15.8756Z', 'M1.38672 32.7011L4.79374 34.2161L3.40561 29.4604L1.38672 32.7011Z'];
function Logo({
  width = 147,
  tone = 'default',
  mark = false,
  style = {},
  ...rest
}) {
  const ink = tone === 'light' ? '#FFFFFF' : '#000000';
  const bagInk = tone === 'light' ? '#FFFFFF' : '#1A1A1A';
  const red = 'var(--ps-red-500, #EE2F47)';

  // mark = just the bag glyph (≈ 33 wide in the 147 viewBox)
  const viewBox = mark ? '0 0 33 36' : '0 0 147 36';
  const w = mark ? Math.round(width * 33 / 147) : width;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: w,
    height: Math.round(w * 36 / (mark ? 33 : 147)),
    viewBox: viewBox,
    fill: "none",
    role: "img",
    "aria-label": "PriyoShop",
    style: {
      display: 'block',
      ...style
    }
  }, rest), BAG_RED.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: `br${i}`,
    d: d,
    fill: red
  })), BAG_INK.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: `bi${i}`,
    d: d,
    fill: bagInk
  })), BAG_WHITE.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: `bw${i}`,
    d: d,
    fill: "#FFFFFF"
  })), !mark && WORDMARK_INK.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: `wi${i}`,
    d: d,
    fill: ink
  })), !mark && WORDMARK_RED.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: `wr${i}`,
    d: d,
    fill: red
  })));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Outline capsule label used as section eyebrows ("Ecosystem at a Glance",
   "The Impact") and small status tags. */
function Badge({
  children,
  variant = 'outline',
  tone = 'ink',
  size = 'md',
  style = {},
  ...rest
}) {
  const TONES = {
    ink: {
      fg: 'var(--ps-ink-700,#292A2E)',
      line: '#000000',
      soft: 'var(--ps-grey-150,#F5F5F5)',
      solid: '#000000',
      onSolid: '#fff'
    },
    brand: {
      fg: 'var(--ps-red-600,#D92B41)',
      line: 'var(--ps-red-500,#EE2F47)',
      soft: 'var(--ps-red-50,#FFF1F3)',
      solid: 'var(--ps-red-500,#EE2F47)',
      onSolid: '#fff'
    },
    gold: {
      fg: 'var(--ps-gold-ink,#AE7D16)',
      line: 'var(--ps-gold-500,#FFB700)',
      soft: 'var(--ps-cream-yellow,#FFFDE2)',
      solid: 'var(--ps-gold-500,#FFB700)',
      onSolid: '#1A1A1A'
    }
  };
  const t = TONES[tone] || TONES.ink;
  const dims = size === 'sm' ? {
    font: 14,
    padY: 2,
    padX: 12
  } : {
    font: 16,
    padY: 4,
    padX: 16
  };
  let skin;
  if (variant === 'solid') skin = {
    background: t.solid,
    color: t.onSolid,
    boxShadow: 'none'
  };else if (variant === 'soft') skin = {
    background: t.soft,
    color: t.fg,
    boxShadow: 'none'
  };else skin = {
    background: 'transparent',
    color: t.fg,
    boxShadow: `inset 0 0 0 1.5px ${t.line}`
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      borderRadius: 999,
      padding: `${dims.padY}px ${dims.padX}px`,
      fontFamily: "var(--font-body, 'Open Sans', sans-serif)",
      fontWeight: 600,
      fontSize: dims.font,
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...skin,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 32,
    padX: 16,
    font: 16,
    icon: 20,
    gap: 6
  },
  md: {
    height: 40,
    padX: 20,
    font: 18,
    icon: 22,
    gap: 8
  },
  lg: {
    height: 56,
    padX: 28,
    font: 18,
    icon: 26,
    gap: 10
  }
};

/* Resolve background / text / ring per (variant, tone, state). */
function resolve(variant, tone, hover, active) {
  const RED = 'var(--ps-red-500, #EE2F47)';
  const RED_DK = 'var(--ps-red-700, #BE2639)';
  const palettes = {
    dark: {
      solid: '#000000',
      solidHover: '#292A2E',
      line: '#000000',
      text: '#000000',
      onSolid: '#FFFFFF',
      tint: 'rgba(0,0,0,0.06)'
    },
    light: {
      solid: '#FFFFFF',
      solidHover: '#F1F1F1',
      line: '#FFFFFF',
      text: '#FFFFFF',
      onSolid: '#000000',
      tint: 'rgba(255,255,255,0.14)'
    },
    brand: {
      solid: RED,
      solidHover: RED_DK,
      line: RED,
      text: RED,
      onSolid: '#FFFFFF',
      tint: 'rgba(238,47,71,0.08)'
    }
  };
  const p = palettes[tone] || palettes.dark;
  if (variant === 'filled') {
    return {
      background: hover ? p.solidHover : p.solid,
      color: p.onSolid,
      boxShadow: 'none'
    };
  }
  if (variant === 'outlined') {
    return {
      background: hover ? p.tint : 'transparent',
      color: p.text,
      boxShadow: `inset 0 0 0 1px ${p.line}`
    };
  }
  // ghost
  return {
    background: hover ? p.tint : 'transparent',
    color: p.text,
    boxShadow: 'none'
  };
}
function Button({
  children,
  variant = 'filled',
  tone = 'dark',
  size = 'md',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  href,
  onClick,
  type = 'button',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const skin = resolve(variant, tone, hover && !disabled, active);
  const base = {
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: `0 ${variant === 'ghost' ? Math.max(4, s.padX - 12) : s.padX}px`,
    width: fullWidth ? '100%' : 'fit-content',
    borderRadius: 999,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: "var(--font-body, 'Open Sans', sans-serif)",
    fontWeight: 600,
    fontSize: s.font,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    boxSizing: 'border-box',
    opacity: disabled ? 0.4 : 1,
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    transition: 'background var(--dur-fast,140ms) ease, transform var(--dur-fast,140ms) ease, box-shadow var(--dur-fast,140ms) ease',
    ...skin,
    ...style
  };
  const iconBox = node => node ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      width: s.icon,
      height: s.icon,
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, node) : null;
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, iconBox(iconLeft), children != null && /*#__PURE__*/React.createElement("span", null, children), iconBox(iconRight));
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: base,
      onClick: onClick
    }, handlers, rest), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    style: base,
    onClick: disabled ? undefined : onClick,
    disabled: disabled
  }, handlers, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* PriyoShop iconography = thin, single-weight line glyphs that paint with
   currentColor. The arrows + play are lifted from the Figma source; the rest
   share the same 24px box / ~1.5px optical weight. For a broader UI set,
   pair with Lucide (https://unpkg.com/lucide-static) — same line style. */

const PATHS = {
  // exact brand arrows (line style)
  'arrow-right': {
    vb: '0 0 19.743 14.154',
    d: 'M 11.59 14.154 L 10.646 13.195 L 16.097 7.744 L 0 7.744 L 0 6.41 L 16.097 6.41 L 10.646 0.959 L 11.59 0 L 18.667 7.077 L 11.59 14.154 Z',
    fill: true
  },
  'arrow-left': {
    vb: '0 0 19.743 14.154',
    d: 'M 7.077 14.154 L 0 7.077 L 7.077 0 L 8.02 0.959 L 2.569 6.41 L 19.743 6.41 L 19.743 7.744 L 2.569 7.744 L 8.02 13.195 L 7.077 14.154 Z',
    fill: true
  },
  // stroked line glyphs
  'chevron-right': {
    vb: '0 0 24 24',
    d: 'M9 6l6 6-6 6'
  },
  'chevron-left': {
    vb: '0 0 24 24',
    d: 'M15 6l-6 6 6 6'
  },
  'chevron-down': {
    vb: '0 0 24 24',
    d: 'M6 9l6 6 6-6'
  },
  'plus': {
    vb: '0 0 24 24',
    d: 'M12 5v14M5 12h14'
  },
  'close': {
    vb: '0 0 24 24',
    d: 'M6 6l12 12M18 6L6 18'
  },
  'menu': {
    vb: '0 0 24 24',
    d: 'M4 7h16M4 12h16M4 17h16'
  },
  'search': {
    vb: '0 0 24 24',
    d: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35'
  },
  'phone': {
    vb: '0 0 24 24',
    d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z'
  },
  'mail': {
    vb: '0 0 24 24',
    d: 'M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3.5 6.5l8.5 6 8.5-6'
  },
  'location': {
    vb: '0 0 24 24',
    d: 'M12 21s7-6.5 7-11a7 7 0 1 0-14 0c0 4.5 7 11 7 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z'
  },
  'arrow-up-right': {
    vb: '0 0 24 24',
    d: 'M7 17L17 7M8 7h9v9'
  }
};
function Icon({
  name = 'arrow-right',
  size = 24,
  strokeWidth = 1.75,
  style = {},
  ...rest
}) {
  const def = PATHS[name] || PATHS['arrow-right'];
  const common = {
    width: size,
    height: size,
    viewBox: def.vb,
    role: 'img',
    'aria-hidden': true,
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    },
    ...rest
  };
  if (def.fill) {
    return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
      fill: "none"
    }), /*#__PURE__*/React.createElement("path", {
      d: def.d,
      fill: "currentColor",
      fillRule: "nonzero"
    }));
  }
  return /*#__PURE__*/React.createElement("svg", _extends({}, common, {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("path", {
    d: def.d
  }));
}

/* Filled / outlined play glyph used on "Watch Our Story" and video posters. */
function PlayIcon({
  size = 24,
  variant = 'outline',
  style = {},
  ...rest
}) {
  const r = 11;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    role: "img",
    "aria-hidden": "true",
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    }
  }, rest), variant === 'filled' ? /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "12",
    fill: "currentColor"
  }) : /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: r,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M10 8.5l6 3.5-6 3.5z",
    fill: variant === 'filled' ? '#fff' : 'currentColor'
  }));
}
Object.assign(__ds_scope, { Icon, PlayIcon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Circular icon button — carousel arrows, play controls, compact actions. */
function IconButton({
  children,
  variant = 'outline',
  tone = 'dark',
  size = 'md',
  disabled = false,
  onClick,
  ariaLabel,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const dim = {
    sm: 36,
    md: 44,
    lg: 56
  }[size] || 44;
  const RED = 'var(--ps-red-500,#EE2F47)';
  const palettes = {
    dark: {
      solid: '#000',
      solidHover: '#292A2E',
      line: '#000',
      fg: '#000',
      onSolid: '#fff',
      tint: 'rgba(0,0,0,0.06)'
    },
    light: {
      solid: '#fff',
      solidHover: '#f1f1f1',
      line: 'rgba(255,255,255,0.7)',
      fg: '#fff',
      onSolid: '#000',
      tint: 'rgba(255,255,255,0.16)'
    },
    brand: {
      solid: RED,
      solidHover: 'var(--ps-red-700,#BE2639)',
      line: RED,
      fg: RED,
      onSolid: '#fff',
      tint: 'rgba(238,47,71,0.08)'
    }
  };
  const p = palettes[tone] || palettes.dark;
  let skin;
  if (variant === 'filled') skin = {
    background: hover && !disabled ? p.solidHover : p.solid,
    color: p.onSolid,
    boxShadow: 'none'
  };else if (variant === 'ghost') skin = {
    background: hover && !disabled ? p.tint : 'transparent',
    color: p.fg,
    boxShadow: 'none'
  };else skin = {
    background: hover && !disabled ? p.tint : 'transparent',
    color: p.fg,
    boxShadow: `inset 0 0 0 1px ${p.line}`
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dim,
      height: dim,
      borderRadius: 999,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transform: active && !disabled ? 'scale(0.94)' : 'scale(1)',
      transition: 'background 140ms ease, transform 140ms ease, box-shadow 140ms ease',
      boxSizing: 'border-box',
      ...skin,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Text field with the brand's focus / disabled states (rounded, hairline
   border, red focus ring). Matches the Figma input component family. */
function Input({
  label,
  hint,
  error,
  size = 'md',
  iconLeft = null,
  disabled = false,
  type = 'text',
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = size === 'sm' ? 44 : size === 'lg' ? 60 : 52;
  const ring = error ? 'inset 0 0 0 1.5px var(--ps-red-500,#EE2F47)' : focus ? 'inset 0 0 0 1.5px var(--ps-red-500,#EE2F47)' : 'inset 0 0 0 1px var(--ps-grey-300,#D2D2D2)';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      width: '100%',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 600,
      fontSize: 16,
      color: 'var(--ps-ink-600,#333)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: h,
      padding: `0 18px`,
      borderRadius: 16,
      background: disabled ? 'var(--ps-grey-150,#F5F5F5)' : 'var(--ps-white,#fff)',
      boxShadow: ring,
      opacity: disabled ? 0.6 : 1,
      transition: 'box-shadow 140ms ease',
      boxSizing: 'border-box'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--ps-ink-300,#8A8A8A)',
      flexShrink: 0
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 400,
      fontSize: 18,
      color: 'var(--ps-ink-700,#292A2E)',
      ...inputStyle
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 400,
      fontSize: 14,
      color: error ? 'var(--ps-red-600,#D92B41)' : 'var(--ps-ink-300,#8A8A8A)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/marketing/EcosystemCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Two-pane feature card: a tinted copy panel beside a full-bleed image.
   Mirrors the Figma "ecosystem/card_01..04" family. */
function EcosystemCard({
  title,
  body,
  image,
  imageAlt = '',
  panelColor = 'var(--ps-green-tint,#E2F5E8)',
  ctaLabel = 'Learn More',
  onCta,
  href,
  reverse = false,
  height = 348,
  style = {},
  ...rest
}) {
  const panel = /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 48%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 24,
      padding: 48,
      background: panelColor,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 700,
      fontSize: 32,
      lineHeight: 1.25,
      color: 'var(--ps-ink-700,#292A2E)'
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 400,
      fontSize: 22,
      lineHeight: 1.5,
      color: 'var(--ps-ink-500,#545558)',
      textWrap: 'pretty'
    }
  }, body)), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "md",
    iconRight: null,
    onClick: onCta,
    href: href,
    style: {
      paddingLeft: 0,
      alignSelf: 'flex-start'
    }
  }, ctaLabel));
  const media = /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      alignSelf: 'stretch',
      minHeight: 0,
      background: image ? `url(${image}) center/cover no-repeat` : 'var(--ps-grey-150,#F5F5F5)'
    },
    role: "img",
    "aria-label": imageAlt
  });
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      height,
      width: '100%',
      overflow: 'hidden',
      borderRadius: 24,
      background: 'var(--ps-warm-white,#FFFCFA)',
      boxShadow: 'inset 0 0 0 1px var(--ps-grey-300,#D2D2D2)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), panel, media);
}
Object.assign(__ds_scope, { EcosystemCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/EcosystemCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/MediaCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Media / blog card: image with rounded top, then source + clamped title +
   optional date. Used in "Media & News" and "Read our Blogs". */
function MediaCard({
  image,
  imageAlt = '',
  source,
  title,
  date,
  href,
  tone = 'light',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const dark = tone === 'dark';
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      borderRadius: 24,
      overflow: 'hidden',
      textDecoration: 'none',
      background: dark ? 'var(--ps-ink-900,#161616)' : 'var(--ps-white,#fff)',
      boxShadow: dark ? 'inset 0 0 0 1px var(--ps-line-dark,#545454)' : 'inset 0 0 0 1px var(--ps-grey-200,#E6E6E6)',
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      transition: 'transform 220ms var(--ease-standard,cubic-bezier(.4,0,.2,1)), box-shadow 220ms ease',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '16 / 10',
      background: image ? `url(${image}) center/cover no-repeat` : 'var(--ps-grey-150,#F5F5F5)'
    },
    role: "img",
    "aria-label": imageAlt
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 24
    }
  }, source && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color: 'var(--ps-red-600,#D92B41)'
    }
  }, source), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 700,
      fontSize: 20,
      lineHeight: 1.35,
      color: dark ? 'var(--ps-grey-150,#F5F5F5)' : 'var(--ps-ink-700,#292A2E)',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, title), date && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 400,
      fontSize: 16,
      color: dark ? 'var(--ps-ink-300,#8A8A8A)' : 'var(--ps-ink-400,#6B6B6B)'
    }
  }, date)));
}
Object.assign(__ds_scope, { MediaCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/MediaCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/MetricStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* A single headline metric: optional icon, big red value, supporting label.
   Used in the hero stats bar ("296 Brands", "100K+ MSMEs", "1428 Route Coverage"). */
function MetricStat({
  value,
  label,
  icon = null,
  align = 'left',
  size = 'md',
  style = {},
  ...rest
}) {
  const valueSize = size === 'lg' ? 64 : size === 'sm' ? 36 : 52;
  const labelSize = size === 'sm' ? 16 : 18;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      justifyContent: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      flexShrink: 0,
      fontSize: valueSize * 0.9,
      lineHeight: 1
    }
  }, icon), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display,'Lato',sans-serif)",
      fontWeight: 800,
      fontSize: valueSize,
      lineHeight: 1,
      letterSpacing: '-0.02em',
      color: 'var(--ps-red-600,#D92B41)'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 600,
      fontSize: labelSize,
      lineHeight: 1.3,
      color: 'var(--ps-ink-700,#292A2E)'
    }
  }, label)));
}
Object.assign(__ds_scope, { MetricStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/MetricStat.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Section opener: capsule eyebrow + big Lato title + optional supporting copy
   and trailing action. Centered or left-aligned. */
function SectionHeading({
  eyebrow,
  title,
  description,
  action = null,
  align = 'center',
  titleSize = 'h1',
  accentWords = null,
  style = {},
  ...rest
}) {
  const sizes = {
    display: 68,
    h1: 56,
    h2: 44,
    h3: 36
  };
  const fs = sizes[titleSize] || sizes.h1;
  const centered = align === 'center';

  // Optionally tint trailing words in brand red (e.g. "Distribution Partner").
  let titleNode = title;
  if (accentWords && typeof title === 'string') {
    const idx = title.toLowerCase().lastIndexOf(accentWords.toLowerCase());
    if (idx >= 0) {
      titleNode = /*#__PURE__*/React.createElement(React.Fragment, null, title.slice(0, idx), /*#__PURE__*/React.createElement("span", {
        style: {
          color: 'var(--ps-red-600,#D92B41)'
        }
      }, title.slice(idx, idx + accentWords.length)), title.slice(idx + accentWords.length));
    }
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      gap: 20,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      borderRadius: 999,
      padding: '4px 16px',
      boxShadow: 'inset 0 0 0 1.5px #000',
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 600,
      fontSize: 16,
      color: 'var(--ps-ink-700,#292A2E)'
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display,'Lato',sans-serif)",
      fontWeight: 700,
      fontSize: fs,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      color: 'var(--ps-ink-700,#292A2E)',
      textWrap: 'balance'
    }
  }, titleNode), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 720,
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 400,
      fontSize: 22,
      lineHeight: 1.5,
      color: 'var(--ps-ink-500,#545558)',
      textWrap: 'pretty'
    }
  }, description), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, action));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StoreButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* App Store / Google Play download badge, rebuilt from the Figma component.
   theme: "dark" (black) or "light" (white). */
function AppleGlyph({
  color
}) {
  return /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "24",
    viewBox: "0 0 20 24",
    fill: "none",
    style: {
      display: 'block',
      color
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M16.705 12.763C16.717 11.843 16.967 10.941 17.432 10.141C17.897 9.341 18.562 8.669 19.365 8.187C18.855 7.476 18.182 6.891 17.4 6.478C16.618 6.065 15.748 5.836 14.859 5.809C12.964 5.614 11.126 6.916 10.16 6.916C9.175 6.916 7.688 5.828 6.086 5.86C5.05 5.893 4.041 6.187 3.156 6.714C2.271 7.241 1.541 7.982 1.037 8.867C-1.146 12.557 0.482 17.981 2.573 20.964C3.62 22.425 4.843 24.056 6.443 23.998C8.009 23.935 8.593 23.023 10.484 23.023C12.356 23.023 12.905 23.998 14.537 23.962C16.218 23.935 17.276 22.494 18.286 21.02C19.038 19.979 19.616 18.829 20 17.611C19.024 17.208 18.191 16.534 17.605 15.671C17.019 14.809 16.706 13.798 16.705 12.763Z",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13.621 3.636C14.537 2.562 14.988 1.182 14.879 -0.211C13.48 -0.067 12.187 0.586 11.258 1.618C10.804 2.123 10.457 2.709 10.235 3.345C10.013 3.981 9.922 4.653 9.967 5.323C10.667 5.33 11.36 5.182 11.993 4.89C12.626 4.597 13.182 4.169 13.621 3.636Z",
    fill: "currentColor"
  }));
}
function GoogleGlyph() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "21",
    height: "24",
    viewBox: "0 0 21 24",
    fill: "none",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0.18 0.21C0.06 0.46 0 0.79 0 1.2v21.6c0 .41.06.74.18.99L11.66 12 .18.21z",
    fill: "#4285F4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.51 15.85l-3.85-3.85L.18 23.79c.42.45 1.11.51 1.89.06l13.44-7.64v-.36z",
    fill: "#34A853"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.51 8.15v-.36L2.07.15C1.29-.3.6-.24.18.21L11.66 12l3.85-3.85z",
    fill: "#EA4335"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M15.51 8.15L11.66 12l3.85 3.85 4.55-2.59c.87-.49.87-1.83 0-2.32l-4.55-2.79z",
    fill: "#FBBC04"
  }));
}
function StoreButton({
  store = 'apple',
  theme = 'dark',
  href,
  style = {},
  ...rest
}) {
  const dark = theme === 'dark';
  const bg = dark ? '#000000' : '#FFFFFF';
  const fg = dark ? '#FFFFFF' : '#000000';
  const ring = dark ? 'inset 0 0 0 1px rgba(166,166,166,0.6)' : 'inset 0 0 0 1px #000000';
  const top = store === 'apple' ? 'Download on the' : 'GET IT ON';
  const bottom = store === 'apple' ? 'App Store' : 'Google Play';
  const Tag = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      height: 52,
      padding: '0 18px',
      borderRadius: 8,
      background: bg,
      boxShadow: ring,
      textDecoration: 'none',
      cursor: href ? 'pointer' : 'default',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, store === 'apple' ? /*#__PURE__*/React.createElement(AppleGlyph, {
    color: fg
  }) : /*#__PURE__*/React.createElement(GoogleGlyph, null)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      lineHeight: 1.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 500,
      fontSize: 11,
      color: fg,
      opacity: 0.92
    }
  }, top), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 700,
      fontSize: 19,
      color: fg,
      letterSpacing: '-0.01em'
    }
  }, bottom)));
}
Object.assign(__ds_scope, { StoreButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StoreButton.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SOCIALS = {
  x: 'M17.326 3.5h2.46l-5.37 6.14L20.8 18.5h-4.95l-3.88-5.07-4.44 5.07H4.07l5.75-6.57L3.5 3.5h5.08l3.5 4.63L17.326 3.5z',
  instagram: 'M12 4.16c2.56 0 2.87.01 3.88.06 1.17.05 1.95.24 2.4.4.6.24 1.03.52 1.48.97.45.45.73.88.97 1.48.16.45.35 1.23.4 2.4.05 1.01.06 1.32.06 3.88s-.01 2.87-.06 3.88c-.05 1.17-.24 1.95-.4 2.4-.24.6-.52 1.03-.97 1.48-.45.45-.88.73-1.48.97-.45.16-1.23.35-2.4.4-1.01.05-1.32.06-3.88.06s-2.87-.01-3.88-.06c-1.17-.05-1.95-.24-2.4-.4a3.7 3.7 0 01-1.48-.97 3.7 3.7 0 01-.97-1.48c-.16-.45-.35-1.23-.4-2.4C4.17 14.87 4.16 14.56 4.16 12s.01-2.87.06-3.88c.05-1.17.24-1.95.4-2.4.24-.6.52-1.03.97-1.48.45-.45.88-.73 1.48-.97.45-.16 1.23-.35 2.4-.4C9.13 4.17 9.44 4.16 12 4.16zM12 2C9.4 2 9.07 2.01 8.05 2.06c-1.02.05-1.71.21-2.32.45-.63.24-1.16.57-1.7 1.1-.53.54-.86 1.07-1.1 1.7-.24.61-.4 1.3-.45 2.32C2.43 8.65 2.42 8.98 2.42 11.58s.01 2.93.06 3.95c.05 1.02.21 1.71.45 2.32.24.63.57 1.16 1.1 1.7.54.53 1.07.86 1.7 1.1.61.24 1.3.4 2.32.45 1.02.05 1.35.06 3.95.06s2.93-.01 3.95-.06c1.02-.05 1.71-.21 2.32-.45a4.6 4.6 0 001.7-1.1 4.6 4.6 0 001.1-1.7c.24-.61.4-1.3.45-2.32.05-1.02.06-1.35.06-3.95s-.01-2.93-.06-3.95c-.05-1.02-.21-1.71-.45-2.32a4.6 4.6 0 00-1.1-1.7 4.6 4.6 0 00-1.7-1.1c-.61-.24-1.3-.4-2.32-.45C14.93 2.01 14.6 2 12 2zm0 4.86A5.14 5.14 0 1017.14 12 5.14 5.14 0 0012 6.86zm0 8.47A3.33 3.33 0 1115.33 12 3.33 3.33 0 0112 15.33zM18.54 6.66a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2z',
  linkedin: 'M6.94 7.5a1.94 1.94 0 11-.01-3.88A1.94 1.94 0 016.94 7.5zM5.2 20.5h3.48V9.06H5.2V20.5zm6.3 0h3.46v-5.65c0-1.5.29-2.95 2.15-2.95 1.83 0 1.86 1.71 1.86 3.05v5.55h3.47v-6.24c0-3.01-.65-5.32-4.17-5.32-1.69 0-2.82.93-3.29 1.81h-.05V9.06H11.5V20.5z',
  facebook: 'M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54v-2.22c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34v7.03C18.34 21.24 22 17.08 22 12.06z'
};
function Social({
  path,
  label
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: "#",
    "aria-label": label,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      color: hover ? 'var(--ps-red-500,#EE2F47)' : '#fff',
      transition: 'color 140ms ease'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: path
  })));
}
function Column({
  heading,
  links
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 700,
      fontSize: 18,
      letterSpacing: '0.04em',
      color: '#fff'
    }
  }, heading), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 400,
      fontSize: 17,
      color: 'rgba(255,255,255,0.78)',
      textDecoration: 'none'
    }
  }, l))));
}
function OfficeCard({
  city,
  address
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 24,
      padding: '28px 40px',
      borderRadius: 24,
      background: 'var(--ps-ink-900,#161616)',
      boxShadow: 'inset 0 0 0 1px var(--ps-line-dark,#545454)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: 40,
      lineHeight: 1,
      flexShrink: 0
    }
  }, "\uD83D\uDCCD"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 700,
      fontSize: 22,
      color: 'var(--ps-grey-150,#F5F5F5)'
    }
  }, city), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 400,
      fontSize: 17,
      color: 'rgba(255,255,255,0.78)'
    }
  }, address)));
}
function Footer({
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      background: '#000',
      color: '#fff',
      padding: '80px 120px 40px',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 64,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    width: 184,
    tone: "light"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(Social, {
    path: SOCIALS.x,
    label: "X"
  }), /*#__PURE__*/React.createElement(Social, {
    path: SOCIALS.instagram,
    label: "Instagram"
  }), /*#__PURE__*/React.createElement(Social, {
    path: SOCIALS.linkedin,
    label: "LinkedIn"
  }), /*#__PURE__*/React.createElement(Social, {
    path: SOCIALS.facebook,
    label: "Facebook"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 96,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Column, {
    heading: "ABOUT",
    links: ['Investor Relations', 'Press Release', 'Career']
  }), /*#__PURE__*/React.createElement(Column, {
    heading: "USEFUL LINK",
    links: ['Terms of Service', 'Privacy Policy', 'Return Policy', 'Join Us']
  }), /*#__PURE__*/React.createElement(Column, {
    heading: "CONTACT US",
    links: ['Phone: 09610989922', 'Email: support@priyoshop.com']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 32,
      margin: '56px 0 40px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(OfficeCard, {
    city: "BANGLADESH",
    address: "31/A, Dhanmondi-8, Dhaka-1205"
  }), /*#__PURE__*/React.createElement(OfficeCard, {
    city: "SINGAPORE",
    address: "160, Robinson Road #24-09, Singapore 068914"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      paddingTop: 24,
      borderTop: '1px solid var(--ps-line-dark,#545454)',
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontSize: 17,
      color: 'rgba(255,255,255,0.78)'
    }
  }, "\xA9 2026 PriyoShop. All rights reserved."));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/NavBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Floating top navigation — rounded white bar, logo + centered menu +
   Contact link and a Join Us button. Matches the homepage header. */
function NavBar({
  items = ['About', 'Business', 'Impact', 'Opportunity', 'Media', 'Careers'],
  active,
  onNavigate,
  cta = 'Join Us',
  onCta,
  secondary = 'Contact Us',
  onSecondary,
  floating = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 32,
      width: '100%',
      height: 76,
      padding: '0 32px',
      background: 'var(--ps-white,#fff)',
      borderRadius: floating ? 999 : 0,
      boxShadow: floating ? '0 12px 32px rgba(0,0,0,0.08)' : 'inset 0 -1px 0 var(--ps-grey-200,#E6E6E6)',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate && onNavigate('home');
    },
    style: {
      display: 'flex',
      flexShrink: 0,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    width: 150
  })), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      listStyle: 'none',
      margin: 0,
      padding: 0,
      flex: 1,
      justifyContent: 'center'
    }
  }, items.map(label => {
    const isActive = active === label;
    return /*#__PURE__*/React.createElement("li", {
      key: label
    }, /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(label);
      },
      style: {
        fontFamily: "var(--font-body,'Open Sans',sans-serif)",
        fontWeight: isActive ? 600 : 400,
        fontSize: 18,
        color: 'var(--ps-black,#000)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        cursor: 'pointer'
      }
    }, label));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      flexShrink: 0
    }
  }, secondary && /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onSecondary && onSecondary();
    },
    style: {
      fontFamily: "var(--font-body,'Open Sans',sans-serif)",
      fontWeight: 600,
      fontSize: 18,
      color: 'var(--ps-black,#000)',
      textDecoration: 'none',
      whiteSpace: 'nowrap'
    }
  }, secondary), cta && /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "md",
    onClick: onCta
  }, cta)));
}
Object.assign(__ds_scope, { NavBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/NavBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ps-app.jsx
try { (() => {
/* PriyoShop homepage — assembler */
const {
  Footer
} = window.PriyoShopDesignSystem_0fb1f5;
const {
  useState
} = React;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window.__t);
  window.__t = setTimeout(() => el.classList.remove('show'), 1900);
}
function App() {
  const [active, setActive] = useState('About');
  const join = () => toast('Thanks! Our team will reach out shortly.');
  const nav = label => {
    setActive(label);
    toast(label + ' \u2014 coming up');
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PSHero, {
    active: active,
    onNav: nav,
    onJoin: join,
    onStory: toast
  }), /*#__PURE__*/React.createElement(PSEcosystem, {
    onLearn: () => toast('Exploring our ecosystem\u2026')
  }), /*#__PURE__*/React.createElement(PSDistribution, {
    onLearn: () => toast('Learn more about distribution')
  }), /*#__PURE__*/React.createElement(PSDataDriven, {
    onLearn: () => toast('Smart infrastructure')
  }), /*#__PURE__*/React.createElement(PSBrands, null), /*#__PURE__*/React.createElement(PSFinance, {
    onLearn: () => toast('Embedded finance')
  }), /*#__PURE__*/React.createElement(PSImpact, null), /*#__PURE__*/React.createElement(PSMedia, null), /*#__PURE__*/React.createElement(PSBlogs, null), /*#__PURE__*/React.createElement(PSJourney, null), /*#__PURE__*/React.createElement(PSCareer, {
    onJoin: join
  }), /*#__PURE__*/React.createElement(PSAppPromo, null), /*#__PURE__*/React.createElement(PSFinalCTA, {
    onJoin: join
  }), /*#__PURE__*/React.createElement(Footer, null));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ps-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ps-sections-a.jsx
try { (() => {
/* PriyoShop homepage — sections A: Hero (nav + hero + stats), Ecosystem, Distribution */
const {
  NavBar,
  Button,
  Badge,
  Icon,
  PlayIcon
} = window.PriyoShopDesignSystem_0fb1f5;
const IMG = './img/';
function Hero({
  onJoin,
  onStory,
  active,
  onNav
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }), /*#__PURE__*/React.createElement("div", {
    className: "navwrap",
    style: {
      position: 'relative',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingTop: 22
    }
  }, /*#__PURE__*/React.createElement(NavBar, {
    active: active,
    onNavigate: onNav,
    onCta: onJoin,
    onSecondary: () => onStory('Call us at 09610989922')
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hero-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "display h-hero"
  }, "Bangladesh's", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "red"
  }, "Leading Distribution Partner")), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 560
    }
  }, "We connect five million MSMEs to leading brands through a tech-driven distribution platform."), /*#__PURE__*/React.createElement("div", {
    className: "btn-row"
  }, /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    onClick: onJoin,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right"
    })
  }, "Join Us"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    variant: "ghost",
    onClick: () => onStory('▶ Playing PriyoShop story…'),
    iconRight: /*#__PURE__*/React.createElement(PlayIcon, null)
  }, "Watch Our Story"))), /*#__PURE__*/React.createElement("div", {
    className: "stat-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-ico"
  }, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stat-val"
  }, "296"), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Brands"))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-ico"
  }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stat-val"
  }, "200K+"), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "MSMEs"))), /*#__PURE__*/React.createElement("div", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat-ico"
  }, "\uD83D\uDCCD"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stat-val"
  }, "1428"), /*#__PURE__*/React.createElement("div", {
    className: "stat-lbl"
  }, "Route Coverage")))))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 90
    }
  }));
}
function Ecosystem({
  onLearn
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "head-center",
    style: {
      marginBottom: 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: '#000'
    }
  }, "Ecosystem at a Glance"), /*#__PURE__*/React.createElement("h2", {
    className: "display h1"
  }, "Our Business & Ecosystem"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 600
    }
  }, "Empowering MSMEs through technology and seamless supply chains.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "eco-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eco-panel",
    style: {
      background: 'var(--ps-green-tint)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "eco-title"
  }, "Retail Business"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "B2B platform empowering millions of MSMEs with faster restocking and smart supply chain.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onLearn,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right"
    }),
    style: {
      paddingLeft: 0,
      alignSelf: 'flex-start'
    }
  }, "Learn More")), /*#__PURE__*/React.createElement("div", {
    className: "eco-media",
    style: {
      backgroundImage: `url(${IMG}8515c6b788a5b8a4.png)`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "eco-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eco-media",
    style: {
      backgroundImage: `url(${IMG}9e6bc096956accf7.png)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "eco-panel",
    style: {
      background: 'var(--ps-periwinkle)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "eco-title"
  }, "Smart Distribution"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Partnering with leading brands to streamline and simplify last-mile distribution across Bangladesh.")), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onLearn,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right"
    }),
    style: {
      paddingLeft: 0,
      alignSelf: 'flex-start'
    }
  }, "Learn More"))))));
}
function Distribution({
  onLearn
}) {
  const items = [{
    n: '01',
    t: 'Digitalisation',
    d: 'Helping MSMEs manage sourcing and inventory with a fully digital platform.'
  }, {
    n: '02',
    t: 'Sales Booster'
  }, {
    n: '03',
    t: 'Time Saver'
  }, {
    n: '04',
    t: 'Price Transparency'
  }];
  const strip = [{
    v: '120+',
    l: 'Total Operational Hub'
  }, {
    v: '48+',
    l: 'Total District Coverage'
  }, {
    v: '2500+',
    l: 'Total People Employed'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container sec"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "display h1"
  }, "Distribution"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Grow Your Retail Business with the Best FMCG Wholesale Distributor. MSMEs' one-stop platform for bulk FMCG supplies \u2014 connect with top brands, access quality products, and get fast delivery right to the retail doorstep.")), /*#__PURE__*/React.createElement(Button, {
    tone: "light",
    variant: "outlined",
    onClick: onLearn
  }, "Learn More")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'center'
    },
    className: "dist-split"
  }, /*#__PURE__*/React.createElement("div", {
    className: "accordion"
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.n,
    className: 'acc-item' + (i ? ' muted' : '')
  }, /*#__PURE__*/React.createElement("span", {
    className: "acc-num"
  }, it.n), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "acc-t"
  }, it.t), it.d && /*#__PURE__*/React.createElement("p", {
    className: "acc-d"
  }, it.d))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo",
    style: {
      height: 230,
      backgroundImage: `url(${IMG}6a559c2d6457bb77.png)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "photo",
    style: {
      height: 230,
      backgroundImage: `url(${IMG}9e6bc096956accf7.png)`
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head-center",
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "display h2"
  }, "Last mile distribution in Bangladesh"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 720
    }
  }, "Revolutionizing B2B distribution by integrating advanced technology solutions to streamline operations, enhance supply chain visibility, and improve customer engagement.")), /*#__PURE__*/React.createElement("div", {
    className: "stat-strip"
  }, strip.map((s, i) => /*#__PURE__*/React.createElement("div", {
    className: "b",
    key: s.l,
    style: {
      borderLeft: i ? '1px solid #2a2a2a' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v red"
  }, s.v), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, s.l)))), /*#__PURE__*/React.createElement("div", {
    className: "head-center",
    style: {
      marginTop: 96
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "display h1",
    style: {
      maxWidth: 760
    }
  }, "One B2B Platform for All", /*#__PURE__*/React.createElement("br", null), "Your Retail Business Needs"))));
}
Object.assign(window, {
  PSHero: Hero,
  PSEcosystem: Ecosystem,
  PSDistribution: Distribution
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ps-sections-a.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ps-sections-b.jsx
try { (() => {
/* PriyoShop homepage — sections B: Data-Driven, Brands, Embedded Finance + Partners, Impact */
const {
  Button: BtnB,
  Badge: BadgeB,
  Icon: IconB
} = window.PriyoShopDesignSystem_0fb1f5;
const IMGB = './img/';
function DataDriven({
  onLearn
}) {
  const shots = ['6a559c2d6457bb77', '9e6bc096956accf7', 'cefc34ad1c908698'];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap',
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 640,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: '#000'
    }
  }, "Smart Infrastructure"), /*#__PURE__*/React.createElement("h2", {
    className: "display h1"
  }, "Data-Driven Retail Infrastructure"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "PriyoShop combines commerce, logistics, embedded finance, and data intelligence to build a smarter retail ecosystem for Bangladesh.")), /*#__PURE__*/React.createElement(BtnB, {
    variant: "outlined",
    onClick: onLearn
  }, "Learn More")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, shots.map(s => /*#__PURE__*/React.createElement("div", {
    key: s,
    className: "photo",
    style: {
      height: 300,
      backgroundImage: `url(${IMGB}${s}.png)`
    }
  })))));
}
function Brands() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "head-center",
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "display h2"
  }, "Trusted by 40+ Brands"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Connecting the country's biggest FMCG names to every corner shop.")), /*#__PURE__*/React.createElement("div", {
    className: "brand-wall"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IMGB}b4d1091a2b39581c.png`,
    alt: "Brands that trust PriyoShop \u2014 PRAN, Nestl\xE9, Unilever, Coca-Cola, P&G, Square and more"
  }))));
}
function Finance({
  onLearn
}) {
  const partners = ['4831a0904d1ab12d', '3873dea73b1936b5', 'b9c7282e14709a7d'];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 72
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "finance"
  }, /*#__PURE__*/React.createElement("div", {
    className: "finance-copy"
  }, /*#__PURE__*/React.createElement(BadgeB, {
    tone: "gold",
    variant: "solid",
    style: {
      alignSelf: 'flex-start'
    }
  }, "Embedded Finance"), /*#__PURE__*/React.createElement("h2", {
    className: "display h2",
    style: {
      color: '#fff'
    }
  }, "Unlock Growth & Smart Retail Finance"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.9)',
      fontSize: 18,
      lineHeight: 1.5,
      margin: 0,
      maxWidth: 420
    }
  }, "Buy-now-pay-later and working-capital tools that let retailers stock more and grow without cash-flow gaps."), /*#__PURE__*/React.createElement(BtnB, {
    tone: "light",
    onClick: onLearn,
    style: {
      alignSelf: 'flex-start'
    }
  }, "Learn More")), /*#__PURE__*/React.createElement("img", {
    className: "finance-img",
    src: `${IMGB}c2d4905853e85101.png`,
    alt: "Shop owner using the PriyoShop app"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    className: "display h2",
    style: {
      fontSize: 28
    }
  }, "Strategic Partners"), /*#__PURE__*/React.createElement("div", {
    className: "logo-row"
  }, partners.map(p => /*#__PURE__*/React.createElement("img", {
    key: p,
    className: "lg",
    src: `${IMGB}${p}.png`,
    alt: "Strategic partner"
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--ps-ink-700)'
    }
  }, "Mastercard")))));
}
function Impact() {
  // SDG goal crops from the 17-goal sprite (6 cols x 3 rows)
  const sdg = [{
    x: '0%',
    y: '0%'
  },
  // 1 No Poverty
  {
    x: '80%',
    y: '0%'
  },
  // 5 Gender Equality
  {
    x: '20%',
    y: '50%'
  },
  // 8 Decent Work
  {
    x: '60%',
    y: '50%'
  },
  // 10 Reduced Inequalities
  {
    x: '80%',
    y: '100%'
  } // 17 Partnerships
  ];
  const opp = [{
    v: '5M',
    l: 'MSMEs'
  }, {
    v: '$200B',
    l: 'Annual GMV by MSMEs'
  }, {
    v: '$2.8B',
    l: 'Financial Gap'
  }];
  const awards = [{
    c: 'Champion at South Asia University',
    img: '21648b3bb3569848'
  }, {
    c: 'Microsoft for Startups',
    img: 'cefc34ad1c908698'
  }, {
    c: 'UNDP Featured PriyoShop',
    img: '6a559c2d6457bb77'
  }, {
    c: 'Google for Startups',
    img: '9e6bc096956accf7'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container sec"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 48,
      alignItems: 'center'
    },
    className: "dist-split"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(BadgeB, {
    tone: "brand",
    variant: "soft",
    style: {
      alignSelf: 'flex-start',
      background: 'rgba(238,47,71,.18)'
    }
  }, "Sustainable Impact"), /*#__PURE__*/React.createElement("h2", {
    className: "display h1",
    style: {
      color: '#fff'
    }
  }, "Drive Changes", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "red"
  }, "Empower Women"), /*#__PURE__*/React.createElement("br", null), "Shaping the Future"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Aligning our growth with the UN Sustainable Development Goals \u2014 building an inclusive retail economy for Bangladesh.")), /*#__PURE__*/React.createElement("div", {
    className: "sdg-row",
    style: {
      justifyContent: 'flex-end'
    }
  }, sdg.map((g, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "sdg",
    style: {
      backgroundPosition: `${g.x} ${g.y}`
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head-center",
    style: {
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "display h1",
    style: {
      color: '#fff'
    }
  }, "Opportunities in Bangladesh"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "A vast, underserved retail market ready for digital transformation.")), /*#__PURE__*/React.createElement("div", {
    className: "opp-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "opp-row"
  }, opp.map((o, i) => /*#__PURE__*/React.createElement("div", {
    className: "opp",
    key: o.l,
    style: {
      borderLeft: i ? '1px solid rgba(0,0,0,.1)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, o.v), /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, o.l)))))), /*#__PURE__*/React.createElement("div", {
    className: "container",
    style: {
      paddingBottom: 96
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "head-center",
    style: {
      marginBottom: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IMGB}feed24ee6e7574a3.png`,
    alt: "",
    style: {
      width: 56,
      height: 56
    }
  }), /*#__PURE__*/React.createElement("h2", {
    className: "display h2",
    style: {
      color: '#fff'
    }
  }, "Awards & Recognition Moments")), /*#__PURE__*/React.createElement("div", {
    className: "grid-4"
  }, awards.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.c,
    className: "award",
    style: {
      background: '#111',
      boxShadow: 'inset 0 0 0 1px #2a2a2a'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "img",
    style: {
      backgroundImage: `url(${IMGB}${a.img}.png)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "cap",
    style: {
      color: '#fff'
    }
  }, a.c))))));
}
Object.assign(window, {
  PSDataDriven: DataDriven,
  PSBrands: Brands,
  PSFinance: Finance,
  PSImpact: Impact
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ps-sections-b.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ps-sections-c.jsx
try { (() => {
/* PriyoShop homepage — sections C: Media & News, Blogs, Journey, Career, App, Final CTA */
const {
  Button: BtnC,
  Badge: BadgeC,
  Icon: IconC,
  StoreButton
} = window.PriyoShopDesignSystem_0fb1f5;
const IMGC = './img/';
function Media() {
  const news = [{
    src: 'The Daily Star',
    ttl: 'PriyoShop among the top startups transforming retail in Bangladesh',
    date: '12 Jun 2026',
    img: '21648b3bb3569848'
  }, {
    src: 'The Business Standard',
    ttl: 'How 200,000 corner shops are digitising their supply chain with PriyoShop',
    date: '03 May 2026',
    img: 'cefc34ad1c908698'
  }, {
    src: 'Tech in Asia',
    ttl: 'B2B commerce platform PriyoShop expands last-mile distribution nationwide',
    date: '21 Apr 2026',
    img: '6a559c2d6457bb77'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap',
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: '#000'
    }
  }, "In the Press"), /*#__PURE__*/React.createElement("h2", {
    className: "display h1"
  }, "Media & News")), /*#__PURE__*/React.createElement(BtnC, {
    variant: "outlined",
    iconRight: /*#__PURE__*/React.createElement(IconC, {
      name: "arrow-right"
    })
  }, "View All")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, news.map(n => /*#__PURE__*/React.createElement("a", {
    key: n.ttl,
    className: "mcard",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("div", {
    className: "img",
    style: {
      backgroundImage: `url(${IMGC}${n.img}.png)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "src"
  }, n.src), /*#__PURE__*/React.createElement("h3", {
    className: "ttl"
  }, n.ttl), /*#__PURE__*/React.createElement("span", {
    className: "date"
  }, n.date)))))));
}
function Blogs() {
  const blogs = [{
    tag: 'Retail Tips',
    ttl: 'Five ways smart restocking boosts a corner shop\u2019s monthly margin',
    date: '08 Jun 2026',
    img: '9e6bc096956accf7'
  }, {
    tag: 'Distribution',
    ttl: 'What last-mile logistics looks like across 48 districts',
    date: '29 May 2026',
    img: 'c2d4905853e85101'
  }, {
    tag: 'Finance',
    ttl: 'Working capital, explained: stocking more without the cash-flow gap',
    date: '14 May 2026',
    img: '6a559c2d6457bb77'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "sec-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: 24,
      flexWrap: 'wrap',
      marginBottom: 44
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: '#000'
    }
  }, "Insights"), /*#__PURE__*/React.createElement("h2", {
    className: "display h1"
  }, "Read our Blogs")), /*#__PURE__*/React.createElement(BtnC, {
    variant: "ghost",
    iconRight: /*#__PURE__*/React.createElement(IconC, {
      name: "arrow-right"
    })
  }, "Read All Blogs")), /*#__PURE__*/React.createElement("div", {
    className: "grid-3"
  }, blogs.map(b => /*#__PURE__*/React.createElement("a", {
    key: b.ttl,
    className: "mcard",
    href: "#",
    onClick: e => e.preventDefault()
  }, /*#__PURE__*/React.createElement("div", {
    className: "img",
    style: {
      backgroundImage: `url(${IMGC}${b.img}.png)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("span", {
    className: "src"
  }, b.tag), /*#__PURE__*/React.createElement("h3", {
    className: "ttl"
  }, b.ttl), /*#__PURE__*/React.createElement("span", {
    className: "date"
  }, b.date)))))));
}
function Journey() {
  const steps = [{
    yr: '2019',
    d: 'PriyoShop founded with a vision to digitise retail in Bangladesh.',
    img: '21648b3bb3569848'
  }, {
    yr: '2021',
    d: 'Launched the B2B commerce platform for MSMEs.',
    img: '6a559c2d6457bb77'
  }, {
    yr: '2022',
    d: 'Raised Series A, expanded distribution network.',
    img: 'cefc34ad1c908698'
  }, {
    yr: '2024',
    d: 'Reached 100+ operational hubs across 48 districts.',
    img: '9e6bc096956accf7'
  }, {
    yr: '2026',
    d: 'Serving 200K+ MSMEs with embedded finance.',
    img: 'c2d4905853e85101'
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "dark"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "head-center",
    style: {
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: '#fff'
    }
  }, "Our Story"), /*#__PURE__*/React.createElement("h2", {
    className: "display h1",
    style: {
      color: '#fff'
    }
  }, "The PriyoShop Journey")), /*#__PURE__*/React.createElement("div", {
    className: "timeline"
  }, steps.map(s => /*#__PURE__*/React.createElement("div", {
    className: "tl",
    key: s.yr
  }, /*#__PURE__*/React.createElement("span", {
    className: "yr"
  }, s.yr), /*#__PURE__*/React.createElement("div", {
    className: "img",
    style: {
      backgroundImage: `url(${IMGC}${s.img}.png)`
    }
  }), /*#__PURE__*/React.createElement("p", {
    className: "d",
    style: {
      color: 'rgba(255,255,255,.6)'
    }
  }, s.d))))));
}
function Career({
  onJoin
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "career"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "eyebrow",
    style: {
      color: '#000'
    }
  }, "Careers"), /*#__PURE__*/React.createElement("h2", {
    className: "display h1"
  }, "Build the Future of", /*#__PURE__*/React.createElement("br", null), "Retail With Us"), /*#__PURE__*/React.createElement("p", {
    className: "lead"
  }, "Join a team of 2,500+ people transforming how Bangladesh's retail economy works \u2014 from technology and operations to finance and field sales."), /*#__PURE__*/React.createElement(BtnC, {
    size: "lg",
    onClick: onJoin,
    iconRight: /*#__PURE__*/React.createElement(IconC, {
      name: "arrow-right"
    }),
    style: {
      alignSelf: 'flex-start'
    }
  }, "See Open Roles")), /*#__PURE__*/React.createElement("div", {
    className: "career-collage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "c tall",
    style: {
      backgroundImage: `url(${IMGC}6a559c2d6457bb77.png)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "c",
    style: {
      backgroundImage: `url(${IMGC}9e6bc096956accf7.png)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "c",
    style: {
      backgroundImage: `url(${IMGC}cefc34ad1c908698.png)`
    }
  })))));
}
function AppPromo() {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "app-band"
  }, /*#__PURE__*/React.createElement("div", {
    className: "copy"
  }, /*#__PURE__*/React.createElement(BadgeC, {
    tone: "brand",
    variant: "soft",
    style: {
      alignSelf: 'flex-start',
      background: 'rgba(238,47,71,.18)'
    }
  }, "One app, every order"), /*#__PURE__*/React.createElement("h2", {
    className: "display h2",
    style: {
      color: '#fff'
    }
  }, "Your whole shop's", /*#__PURE__*/React.createElement("br", null), "sourcing, in one app"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'rgba(255,255,255,.72)',
      fontSize: 18,
      lineHeight: 1.55,
      margin: 0,
      maxWidth: 440
    }
  }, "Browse thousands of SKUs, compare prices, place an order in seconds and track delivery to your door."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(StoreButton, {
    store: "apple",
    theme: "light",
    href: "#"
  }), /*#__PURE__*/React.createElement(StoreButton, {
    store: "google",
    theme: "light",
    href: "#"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "art"
  }, /*#__PURE__*/React.createElement("img", {
    src: `${IMGC}c2d4905853e85101.png`,
    alt: "PriyoShop mobile app"
  })))));
}
function FinalCTA({
  onJoin
}) {
  return /*#__PURE__*/React.createElement("section", {
    className: "sec"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 40,
      padding: '80px 40px',
      textAlign: 'center',
      background: 'linear-gradient(164.08deg, #FFFCFA 20.36%, #FFE4D1 61.73%, #C5A8FF 103.10%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("h2", {
    className: "display h1",
    style: {
      maxWidth: 720
    }
  }, "Grow your business with PriyoShop"), /*#__PURE__*/React.createElement("p", {
    className: "lead",
    style: {
      maxWidth: 540
    }
  }, "Whether you run a corner shop or a national brand, our platform helps you reach further and sell more."), /*#__PURE__*/React.createElement("div", {
    className: "btn-row",
    style: {
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(BtnC, {
    size: "lg",
    onClick: onJoin,
    iconRight: /*#__PURE__*/React.createElement(IconC, {
      name: "arrow-right"
    })
  }, "Join Us Today"), /*#__PURE__*/React.createElement(BtnC, {
    size: "lg",
    variant: "outlined"
  }, "Talk to Sales")))));
}
Object.assign(window, {
  PSMedia: Media,
  PSBlogs: Blogs,
  PSJourney: Journey,
  PSCareer: Career,
  PSAppPromo: AppPromo,
  PSFinalCTA: FinalCTA
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ps-sections-c.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.PlayIcon = __ds_scope.PlayIcon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.EcosystemCard = __ds_scope.EcosystemCard;

__ds_ns.MediaCard = __ds_scope.MediaCard;

__ds_ns.MetricStat = __ds_scope.MetricStat;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StoreButton = __ds_scope.StoreButton;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.NavBar = __ds_scope.NavBar;

})();
