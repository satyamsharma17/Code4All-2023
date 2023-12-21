(function () {
  const URL = window.location.href;
  const queryIndex = URL.indexOf("?") + 1;
  const queryExist = queryIndex > 0 && true;
  const requestQuery = URL.slice(queryIndex);
  const storedQuery = sessionStorage.getItem("utm");
  const hash = window.location.hash;

  if (queryExist) {
    sessionStorage.setItem("utm", removeLocationHash(requestQuery));
  }

  if (!queryExist && storedQuery) {
    if (history.pushState) {
      var newURL =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?" +
        storedQuery;

      if (hash) newURL += hash;

      window.history.pushState({ path: newURL }, "", newURL);
    }
  }
})();

function removeLocationHash(URL) {
  var noHashURL = URL.replace(/#.*$/, "");
  return noHashURL;
}
