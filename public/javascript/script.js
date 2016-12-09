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

  $( '#save' ).click(function() {
    save();
  });

  function save() {
    var id = $( '#myid' ).val();
    if (id) {
      var firebaseUserRef = firebase.database().ref('/testuser/' + id);

      var date = new Date();
      var time = date.toString();

      firebaseUserRef.set({
        time: time
      });
    }
  }

  function display(info) {
    console.log(info);
  }

  $( '#load' ).click(function() {
    updateScreen();
  });

  function updateScreen() {
    var id = $( '#myid' ).val();
    if (id) {
      var firebaseUserRef = firebase.database().ref('/testuser/' + id);

      firebaseUserRef.once('value').then(function(snapshot) {
        var info = snapshot.val().time;
        display(info);
      });
    }
  }

  var firebaseRef = firebase.database().ref('test');
} );
