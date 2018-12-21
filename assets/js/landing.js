---
# Need frontmatter so we can access Jekyll variables here
---

var CONTACT_FORM_SELECTOR = "#textup-landing-contact-form",
  CONTACT_FORM_PENDING_SELECTOR = "#textup-landing-contact-form-pending",
  CONTACT_FORM_SUCCESS_SELECTOR = "#textup-landing-contact-form-success",
  CONTACT_FORM_SPAM_SELECTOR = "#textup-landing-contact-form-spam";

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

  // Contact form
  // ------------

  contactFormInit();
});

// Utility functions
// -----------------

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

// Contact form captcha
// --------------------

function startContactFormSubmit(event) {
  event.preventDefault();
  contactFormPending();
  // if honeypot was filled out, very likely spam so prevent form from being submitted
  if ($(CONTACT_FORM_SELECTOR + " .form__honeypot").val()) {
    contactFormSpam();
  } else if (grecaptcha) {
    grecaptcha.execute();
  }
}
function contactFormVerifyHuman(responseKey) {
  $.ajax({
    method: "POST",
    url: "{{ site.env.RECAPTCHA_TEST_ENDPOINT }}",
    data: JSON.stringify({ key: responseKey }),
    contentType: "application/json"
  }).then(submitContactForm, contactFormSpam);
}
function submitContactForm() {
  contactFormSuccess();
  $(CONTACT_FORM_SELECTOR).submit();
}

// Contact form states
// -------------------

function contactFormInit() {
  $(CONTACT_FORM_SELECTOR)
    // only want once so that we don't keep on short circuiting when we programmatically submit
    .one("submit", startContactFormSubmit)
    .removeClass("hidden");
  $(CONTACT_FORM_PENDING_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_SUCCESS_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_SPAM_SELECTOR).addClass("hidden");
  setTimeout(function() {
    if (grecaptcha) {
      grecaptcha.reset();
    }
  }, 500);
}

function contactFormPending() {
  $(CONTACT_FORM_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_PENDING_SELECTOR).removeClass("hidden");
  $(CONTACT_FORM_SUCCESS_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_SPAM_SELECTOR).addClass("hidden");
}

function contactFormSuccess() {
  $(CONTACT_FORM_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_PENDING_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_SUCCESS_SELECTOR).removeClass("hidden");
  $(CONTACT_FORM_SPAM_SELECTOR).addClass("hidden");
}

function contactFormSpam() {
  $(CONTACT_FORM_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_PENDING_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_SUCCESS_SELECTOR).addClass("hidden");
  $(CONTACT_FORM_SPAM_SELECTOR).removeClass("hidden");
}
