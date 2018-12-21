function startWatchSearchResults() {
  var resultEl = document.getElementById("results");
  if (resultEl) {
    new MutationObserver(onSearchResultChange).observe(resultEl, { childList: true });
  }
}

function onSearchResultChange() {
  if ($) {
    $("#results a").attr("target", "_blank");
  }
}

$(document).ready(startWatchSearchResults);
