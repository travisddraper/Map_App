(function($){

    $.event.special.doubletap = {
      bindType: 'touchend',
      delegateType: 'touchend',
  
      handle: function(event) {
        var handleObj   = event.handleObj,
            targetData  = jQuery.data(event.target),
            now         = new Date().getTime(),
            delta       = targetData.lastTouch ? now - targetData.lastTouch : 0,
            delay       = delay == null ? 300 : delay;
  
        if (delta < delay && delta > 30) {
          targetData.lastTouch = null;
          event.type = handleObj.origType;
          ['clientX', 'clientY', 'pageX', 'pageY'].forEach(function(property) {
            event[property] = event.originalEvent.changedTouches[0][property];
          })
  
          // let jQuery handle the triggering of "doubletap" event handlers
          handleObj.handler.apply(this, arguments);
        } else {
          targetData.lastTouch = now;
        }
      }
    };
  
  })(jQuery);


function isUpperCase(string) {
   return /^[A-Z]*$/.test(string);
}

var loadServer = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=29',
        dataType: 'json',
        success: function(response, textStatus) {
            console.log('refreshed');
            $('.icon').remove();
            
            response.tasks.forEach(function(task) {

                if(task.id !== 1155) {

                var dataPacket = task.content.split(' ');
                //datapacket = [x, y, color, iconText]

                var x = dataPacket[0];
                var y = dataPacket[1];
                var color = dataPacket[2];
                var name = dataPacket[3].replace(/-/g, ' ')
       
                    $("#aspectRatioBox").append($('<div style="left:' + x +'%; top:' + y + '%" class="icon ' + color +'" data-id="' + task.id + '">'+ name + '</div>'))
                   
                } else if (task.id === 1155) {
                    
                    $('#imagePosition').attr("src", task.content)
                }
            })
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

var addNewIconServer = function(datapacket) {
        //datapacket = [x, y, color, iconText]

    $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=29',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: datapacket
            }
        }),
        success: function(response, textStatus) {
            loadServer();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(request, textStatus, errorMessage);
        }
    });
}


var changeServerPosition = function(datapacketz, id) {
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id +'?api_key=29',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: datapacketz
            }
        }),
        success: function(response, textStatus) {

            loadServer();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}


var loadServerImage = function(id) {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=29',
        dataType: 'json',
        success: function(response, textStatus) {
            $('.aspectRatioBox').attr("background-image", response.task.content)
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}


var replaceServerImage = function(imageURL, id) {
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id +'?api_key=29',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: imageURL
            }
        }),
        success: function(response, textStatus) {
            loadServer();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}


var deleteIconServer = function(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=29',
        success: function (response, textStatus) {

          loadServer();
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
    });
}



    

    
var toggleMove = function(elmnt, e, color, iconText, interval) {
    var pos1=0; var pos2=0; var pos3=0; var pos4=0;
    var datapacket;
    var touch;


    var elementDrag = function(e) {
        
        if(e.type === "touchmove") {
            window.clearInterval(interval);
            touch = e.changedTouches[0];

            pos1 = pos3 - touch.pageX;
            pos2 = pos4 - touch.pageY;
            pos3 = touch.pageX;
            pos4 = touch.pageY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
            elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';

        } else {  
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
            elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
        }
        
    }

    var closeDragElement = function() {
        
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        var x = elmnt.style.left.replace('px', '');
        var y = elmnt.style.top.replace('px','');

        x = x/$('#aspectRatioBox').width()*100
        y = y/$('#aspectRatioBox').height()*100

        if(!Number.isNaN(x) && !Number.isNaN(y)) {

            var datapacketz = [x, y, color, iconText].join(' ');

            var id = $(elmnt).data('id');
 

            changeServerPosition(datapacketz, id)
        }
    }

    var dragMouseDown = function(e) {
        if(e.type === "touchstart") {
            touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            pos3 = touch.pageX;
            pos4 = touch.pageY;
            document.ontouchend = closeDragElement;
            document.ontouchmove = elementDrag;

        }else {
            e = e || window.event;
            e.preventDefault();

            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }
    }

    dragMouseDown(e);
}

var refreshThePage = function() {
    return loadServer();
}


$(document).ready(function() {
    
    loadServer();

    var interval = window.setInterval(refreshThePage, 1000);

    $(document).on('mousedown touchstart touchmove', '.icon', function(event) {
        window.clearInterval(interval);
    })

    $(document).on('keyup mouseup touchend', '.icon', function(event) {
        interval = window.setInterval(refreshThePage, 1000);
    })


    $('#imageForm').on('submit', function(e) {
        e.preventDefault();
        var imageURL = $('#imageInput').val()
        replaceServerImage(imageURL, 1155)
        $('#imageInput').val('')
    })

    
    $('.iconButton').on('click', function() {
        var iconText = $(this).text();
   
        if(($(this).hasClass('red'))) {
            var color = 'red';
        }
        if(($(this).hasClass('blue'))) {
            var color = 'blue';
        }

        var datapacket = [46.82692307692308 , 91.99830057220095 , color, iconText].join(' ');
 
        addNewIconServer(datapacket)
    })

    $('#addIconForm').on('submit', function(e) {
        e.preventDefault();
        var nameInput = $('#addIconInput').val().replace(/(\s)/g, '-');

        var color = $("input[name=colorToggle]:checked").val()
        datapacket = [46.82692307692308 , 91.99830057220095 , color, nameInput].join(' ');

        addNewIconServer(datapacket);
        $('#addIconInput').val('')
    });

    $(document).on('mousedown', '.icon', function(e) {
        var iconText = $(this).text().replace(/(\s)/g, '-');

        if(($(this).hasClass('red'))) {
            var color = 'red';
        } else if(($(this).hasClass('blue'))) {
            var color = 'blue';
        }

        var elmnt = $(this)[0]
        toggleMove(elmnt, e, color, iconText);
        
    })

    $(document).on('touchstart', '.icon', function(e) {
        var iconText = $(this).text().replace(/(\s)/g, '-');

        if(($(this).hasClass('red'))) {
            var color = 'red';
        } else if(($(this).hasClass('blue'))) {
            var color = 'blue';
        }

        var elmnt = $(this)[0]

        toggleMove(elmnt, e, color, iconText, interval);

    })



    $(document).on('contextmenu', '.icon', function(event) {
        event.preventDefault();
        //$(this).remove();
        deleteIconServer($(this).data('id'));

    })

    $(document).on('doubletap', '.icon', function(event) {
        //$(this).remove();
        deleteIconServer($(this).data('id'));
    })

    $('#clearAll').on('click', function() {
        $('.icon').each(function() {
            $(this).remove();
            deleteIconServer($(this).data('id'))
        })
    })


})


/*
if(task.id !== 1155) {
    var name = dataPacket[2];
    var color;
    var text;

    
    if(/red/.test(name)) {

        name = name.replace('red','');
        color = 'red';
        
        if(/X/.test(name)) {

            name = 'redX'
            text = 'X'
        
        }else if (/!/.test(name)) {

            name = 'redAH'
            text = "!"
            
        }else if(/\?/.test(name)) {

            name = 'redQ'
            text = "?"
           
        }else if(/0/.test(name)) {

            text = name.replace('0','');
            name = 'newCharacter'
           
        }else {
            text = name;
        }
    } else if (/blue/.test(name)) {

        name = name.replace('blue','');
        color = 'blue';

        if(/X/.test(name)) {
           
            name = 'blueX'
            text = 'X'
            
        }else if (/!/.test(name)) {
            
            name = 'blueAH'
            text = "!"
            
        }else if(/\?/.test(name)) {
            
            name = 'blueQ'
            text = "?"
            
        }else if(/0/.test(name)) {

            text = name.replace('0','');
            name = 'newCharacter'

        } else {
            text = name;
        }
    }
    */

    //var intervalReset = function(interval) {
  //  if(interval) {
    //    console.log(interval);
      //  window.clearInterval(interval);
        //interval = window.setInterval(refreshThePage, 3000);
        //return interval
    //} else if(!interval) {
      //  console.log(interval);
       // interval = window.setInterval(refreshThePage, 3000);
        //return interval
    //}
//}



//var debounce = function(callback, delay) {
  //  var timeout;
   // return function() {
     //   clearTimeout(timeout);
       // timeout = setTimeout(callback, delay);
   // }
//}

//var refreshThis = debounce(function() {
  //  console.log('debounced!');
  //  loadServer();
//}, 3000);