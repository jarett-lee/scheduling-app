$( function() {
  $( "#sortable1" ).sortable({
      connectWith: ".connectedSortable",
      connectWith: ".droppable-hover",
      forcePlaceholderSize: false,
      helper: function(e,li) {
          copyHelper= li.clone().insertAfter(li);
          return li.clone();
      },
      stop: function() {
          copyHelper && copyHelper.remove();
      }
  } );
  $(".connectedSortable").sortable({
    receive: function(e,ui) {
      copyHelper= null;
    }
  });

  $( "#sortable2" ).sortable({
    connectWith: ".connectedSortable",
    connectWith: ".droppable-hover",
  }).disableSelection();

  $("#sortable4").droppable({
    hoverClass: "droppable-hover",
    drop: function(event, ui) {
        var element = ui.draggable.css('position', '');
        $(this).append(element);
        $(ui.draggable).fadeOut(1000);
    }
  });
} );
