const InstallPWA = document.getElementById("InstallPWA")
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  DeferredPrompt = e;
  InstallPWA.addEventListener('click', (e) => {
    console.log("install PWA")
    DeferredPrompt.prompt();
    DeferredPrompt.userChoice.then((ChoiceResult) => {
      if (ChoiceResult.outcome === 'accepted'){
        console.log('user accpets A2HS');
      }
      DeferredPrompt = null;
    });
  });
});
