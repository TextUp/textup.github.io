$(document).ready(function() {
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

  $("#textup-landing-contact-form").on("submit", function() {
    $(this).fadeOut(function() {
      $("#textup-landing-form-submit").toggleClass("hidden");
    });
  });
});
