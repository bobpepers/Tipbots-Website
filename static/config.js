const setConfigDevelopment = () => {
  window.myConfig = {};
  window.myConfig.apiUrl = 'https://localhost/api';
  window.myConfig.wsEndPoint = 'https://localhost';
  window.myConfig.reCaptchaSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
}

const setConfigProduction = () => {
  window.myConfig = {};
  window.myConfig.apiUrl = 'https://bots.runebase.io/api';
  window.myConfig.wsEndPoint = 'https://bots.runebase.io';
  window.myConfig.reCaptchaSiteKey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';
}
