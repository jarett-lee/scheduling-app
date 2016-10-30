$( function() {
  $( "#sortable1, #sortable2, #sortable3, #sortable4" ).sortable({
      connectWith: ".connectedSortable",
      forcePlaceholderSize: false,
      helper: function(e,li) {
          copyHelper= li.clone().insertAfter(li);
          return li.clone();
      },
      stop: function() {
          copyHelper && copyHelper.remove();
      }
  });
      $(".connectedSortable").sortable({
          receive: function(e,ui) {
              copyHelper= null;
          }
  });
} );
