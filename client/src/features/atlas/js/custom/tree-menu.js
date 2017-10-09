$(document).on("click", ".sidebar li a", function (e) {
  var animationSpeed = 300

  var $this = $(this),
    $nextElement = $this.next(),
    menuClass = ".treeview-menu"

  if (
    ($nextElement.is(menuClass)) &&
    ($nextElement.is(":visible"))
  ) {
    $nextElement.slideUp(animationSpeed, function () {
      $nextElement.removeClass("menu-open")
    });
    $nextElement.parent("li").removeClass("active")
  }
  else if (
    ($nextElement.is(menuClass)) &&
    (!$nextElement.is(":visible"))
  ) {
    var $parent = $this.parents("ul").first();
    var $ul = $parent.find("ul:visible").slideUp(animationSpeed);
    $ul.removeClass("menu-open");
    var $parentLi = $this.parent("li");

    $nextElement.slideDown(animationSpeed, function () {
      $nextElement.addClass("menu-open");
      $parent.find("li.active").removeClass("active");
      $parentLi.addClass("active");
    });
  }
  if ($nextElement.is(menuClass)) {
    e.preventDefault();
  }

});
