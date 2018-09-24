$(document).ready(function() {
  // Navigation
  // ----------

  $(".can-toggle-nav-drawer").on("click", function() {
    $("body").toggleClass("overall--drawer-open");
  });

  $(window).on("scroll", debounce(checkScrollFn, 1000));
  checkScrollFn();

  // Photo popup
  // -----------

  var $images = $(".image--with-popup");
  $images.each(function() {
    $(this).attr("data-mfp-src", $(this).attr("src"));
  });
  $images.magnificPopup({ type: "image" });

  // Slick gallery
  // -------------

  $(".will-call-slick")
    .slick()
    .on("beforeChange", function(event, slick, currentSlide, nextSlide) {
      var sliderId = slick.$slider.attr("id");
      $("input[data-controls-slick=" + sliderId + "]")
        .prop("checked", false)
        .filter("[data-slick-slide=" + nextSlide + "]")
        .prop("checked", true);
    });
  $("[data-controls-slick]").on("click", function() {
    var slickId = this.dataset.controlsSlick,
      slideIndex = this.dataset.slickSlide;
    if (!slickId || !slideIndex) {
      return;
    }
    $("#" + slickId).slick("slickGoTo", slideIndex);
  });

  // Team bios
  // ---------

  $(".team__headshot").on("click", function() {
    $(this).toggleClass("team__headshot--show-details");
  });

  // Contact form
  // ------------

  $("#textup-landing-contact-form").on("submit", function(event) {
    var honeypotVal = $("#textup-landing-contact-form .form__honeypot").val();
    if (honeypotVal) {
      // if honeypot was filled out, very likely spam so prevent form from being submitted
      event.preventDefault();
    } else {
      $(this).fadeOut(function() {
        $("#textup-landing-form-submit").toggleClass("hidden");
      });
    }
  });
});

function checkScrollFn() {
  var $window = $(window),
    $content = $(".overall__content"),
    className = "overall__content--scrolled";
  if ($window.scrollTop() > $window.height() * 0.7) {
    $content.addClass(className);
  } else {
    $content.removeClass(className);
  }
}

// adapted from https://davidwalsh.name/javascript-debounce-function
function debounce(func, wait) {
  var timeout;
  return function() {
    var ctx = this,
      args = arguments,
      laterFn = function() {
        timeout = null;
        func.apply(ctx, args);
      };
    clearTimeout(timeout);
    setTimeout(laterFn, wait);
  };
}
