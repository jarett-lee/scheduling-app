$( function() {
  $( "#repeat" ).sortable({
    connectWith: ".connectedSortable",
    remove: function(event, ui) {
      ui.item.clone().appendTo('#set');
      $(this).sortable('cancel');
    }
  }).disableSelection();

  $( "#set" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection()

  $( "#cal" ).sortable({
    connectWith: ".connectedSortable"
  }).disableSelection()

  $("#trash").droppable({
    drop: function(event, ui) {
        var element = ui.draggable.css('position', '');
        $(this).append(element);
        $(ui.draggable).fadeOut(10);
    }
  });

  var defaultScreen = {
    repeat:['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
    set:['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']
  };

  var emptyScreen = {
    repeat:[],
    set:[]
  };

  var screen = defaultScreen;

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
        if (info != null) {
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
