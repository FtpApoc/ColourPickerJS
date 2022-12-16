//installation of PWA script
const InstallPWA = document.getElementById("InstallPWA")
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  DeferredPrompt = e;
  //PWA sequence activated on click of install PWA button
  InstallPWA.addEventListener('click', (e) => {
    DeferredPrompt.prompt();
    DeferredPrompt.userChoice.then((ChoiceResult) => {
      if (ChoiceResult.outcome === 'accepted'){
        console.log('user accpets A2HS');
      }
      DeferredPrompt = null;
    });
  });
});
