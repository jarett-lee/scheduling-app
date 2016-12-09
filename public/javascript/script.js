$( function() {
  $( "#repeater" ).sortable({
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

  $( "#set" ).sortable({
    connectWith: ".connectedSortable",
    connectWith: ".droppable-hover",
  }).disableSelection();

  $("#trash").droppable({
    hoverClass: "droppable-hover",
    drop: function(event, ui) {
        var element = ui.draggable.css('position', '');
        $(this).append(element);
        $(ui.draggable).fadeOut(10);
    }
  });

  var defaultScreen = {
    repeat:['Event 1'],
    set:['My event', 'Other event']
  };

  var emptyScreen = {
    repeat:[],
    set:[]
  };

  var screen = defaultScreen;

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

      var repeat = [];
      var set = [];

      var repeatId = document.getElementById('repeat');
      for (var i = 0; i < repeatId.children.length; i++) {
        repeat.push(repeatId.children[i].innerHTML);
      }

      var setId = document.getElementById('set');
      for (var i = 0; i < setId.children.length; i++) {
        set.push(setId.children[i].innerHTML);
      }

      var date = new Date();
      var time = date.toString();

      firebaseUserRef.set({
        repeat: repeat,
        set: set,
        time: time
      });
    }
  }

  function display(info) {
    console.log(info);

    var printer = '';
    for (var i = 0; i < info.repeat.length; i++) {
      printer += '<li class="ui-state-default repeater">';
      printer += info.repeat[i];
      printer += '</li>';
      printer += '\n';
    }
    $( '#repeat' ).html(printer);

    printer = '';
    for (var i = 0; i < info.set.length; i++) {
      printer += '<li class="ui-state-default highlight-1">';
      printer += info.set[i];
      printer += '</li>';
      printer += '\n';
    }
    $( '#set' ).html(printer);
  }

  $( '#load' ).click(function() {
    updateScreen();
  });

  function updateScreen() {
    var id = $( '#myid' ).val();
    if (id) {
      var firebaseUserRef = firebase.database().ref('/testuser/' + id);

      firebaseUserRef.once('value').then(function(snapshot) {
        var info = snapshot.val();
        if (info.repeat && info.set) {
          display(info);
        }
        else {
          newScreen();
        }
      });
    }
    else {
      newScreen();
    }
  }

  function newScreen() {
    screen = defaultScreen;
    display(screen);
  }

  var firebaseRef = firebase.database().ref('test');
} );
