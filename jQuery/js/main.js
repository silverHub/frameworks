$(function(){

  var taskPrototype = $("<li class='task'><input class='task-check' type='checkbox' /><span class='task-text'></span></li>");
  var $mainInput = $('.mainInput');
  var $tasks = $('.tasks');
  var $summary = $('.summary');
  var $filters = $(':radio');
  var $clearCompleted = $summary.find('.summary-clearCompleted');
  var $itemsLeft = $summary.find('.summary-itemLeft');
  updateSummary();

  $mainInput.on('keypress',function(e){
    if (e.which === 13) {
      var task = $mainInput.val();
      if(task){
        addTask(task);
        updateSummary();
        $mainInput.val('');
      }
    }
  });

  $filters.on('change', function(e) {
    var activeFilter = $(':radio:checked')[0].id;
    $('.task').hide();
    if (activeFilter === 'completed') {
      $('.task.completed').show();
    }
    if (activeFilter === 'active') {
      $(':not(.task.completed)').show();
    }
    if (activeFilter === 'all') {
      $('.task').show();
    }
  });

  // $tasks.find('.task').hover(function(e){
  //     $target = $(e.target).find(':after');
  //     $target.show();
  // });

  $tasks.on('click', function(e){
      $target = $(e.target);

      if($target.is('.task-text') && isDoubleClick(e)){
        // edit task
      }

      if($target.is('.task-check')){
        if ($target.is(':checked')){
          $target.parents('.task').addClass('completed');
        } else {
          $target.parents('.task').removeClass('completed');
        }
      }
      if($target.is('.task')){
        $target.remove();
      }
      updateSummary();
  });

  $clearCompleted.on('click', function(){
    $('.completed .task-check', $tasks).click();
  });

  function isDoubleClick(e){
    console.log(e);
    
  }

  function updateSummary() {
    if($tasks.children('li').length){
      var allTaskNumber = $tasks.find('.task').length;
      var completedTaskNumber = $tasks.find('.task.completed').length;
      var pendingTaskNumber = allTaskNumber - completedTaskNumber;
      $itemsLeft.html(pendingTaskNumber + 'items left');
      if (completedTaskNumber) {
        $clearCompleted.show()
      } else {
        $clearCompleted.hide();
      }
      $summary.show();
    } else {
      $summary.hide();
    }
  }

  function addTask(task) {
    //tasks.push(task);
    var instance = taskPrototype.clone();
    instance.find('.task-text').html(task);
    $tasks.prepend(instance);



    console.log('addTask:',task);

  }

});
