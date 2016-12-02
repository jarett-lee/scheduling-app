$( function() {
  /*
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

  $("#sortable5").droppable({
    hoverClass: "droppable-hover",
    drop: function(event, ui) {
        var element = ui.draggable.css('position', '');
        $(this).append(element);
        $(ui.draggable).fadeOut(10);
    }
  });
  */
  $( '.connectedSortable' ).sortable({
    connectWith: '.connectedSortable'
  });

  var firebaseRef = firebase.database().ref('test');
  var element = document.querySelector('#mybutton');

  element.addEventListener("click", function(e) {
    addTime();
  }, false);

  function addTime() {
    firebaseRef.once('value').then(function(snapshot) {
      var previousTime = snapshot.val().time;

      var date = new Date();
      var time = date.toString();

      firebaseRef.set({
        previousTime: previousTime,
        time: time
      });
    });
  }

} );
