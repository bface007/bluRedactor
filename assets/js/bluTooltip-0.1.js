/**
 * Created by bface007 on 18/08/2015.
 */
;(function ($) {
    // create plugin
    $.fn.bluTooltip = function (el) {
        var $tooltip,
            $body = $('body'),
            $el;

        // Ensure chaining works
        return this.each(function (i, el) {
            $el = $(el).attr("data-tooltip", i);

            //Make a DIV and append to page
            var $tooltip = $('<div class="tooltip" data-tooltip="'+ i +'">'+ $el.attr('title') +'<div class="arrow"></div></div>')
                                .insertAfter($el);
            // Position right away, so first appearance is smooth
            var elPosition = $el.position();



            $tooltip.css({
                top: elPosition.top - $tooltip.outerHeight() - 13,
                left: elPosition.left - ($tooltip.width() / 2)
            });

            $el
                // remove default title tooltip
                .removeAttr('title')
                // mouseenter
                .hover(function () {
                    elPosition = $(this).position();

                    console.log("posi top", elPosition.top);
                    console.log("posi left", elPosition.left);
                    console.log("el width", $(this).width());
                    console.log("el outerwidth", $(this).outerWidth(true));
                    console.log("tooltip width", $tooltip.width());
                    console.log("tooltip outerwidth", $tooltip.outerWidth());
                    $tooltip.css({
                        top: elPosition.top + $tooltip.outerHeight(),
                        left: elPosition.left - ($tooltip.width() / 2) + 8
                    });
                    console.log("tooltip left", elPosition.left - ($tooltip.width() / 2) + 8);

                    // Adding class handles animation through CSS
                    $tooltip.addClass("active");

                    // mouseleave
                }, function () {
                    $tooltip.addClass('out');

                    setTimeout(function () {
                        $tooltip.removeClass("active").removeClass("out");
                    }, 300);
                });

        })
    }
})(jQuery);