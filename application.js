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
                    //datapacket = ['x', 'y']

                    if(task.id === 2186) {
                      
                        let x = parseInt(dataPacket[0]);
                        let y = parseInt(dataPacket[1]);

                        if(x*y > 10000) {
                            x = 0;
                            y = 0;
                        }
                            
                        $('#masterRow').remove();

                        var masterRow = $('<div/>').attr( { id:"masterRow", "class":"row", "data-id": task.id});
    
                        $('#aspectRatioBox').append(masterRow)
                        for(i=0; i<y; i++) {
                                
                            $('#masterRow').append($('<div/>').attr("class", "innerRow").height(100/y + '%'));
    
                            for(j=0; j<x; j++) {

                                $('.innerRow').eq(i).append($('<div/>').attr("class", "innerColumn").width(100/x + '%'));
                            }
                        }
                    } else {

                        var x = dataPacket[0];
                        var y = dataPacket[1];
                        var color = dataPacket[2];
                        var name = dataPacket[3].replace(/-/g, ' ')
           
                        $("#aspectRatioBox").append($('<div style="left:' + x +'%; top:' + y + '%" class="icon ' + color +'" data-id="' + task.id + '">'+ name + '</div>'))

                    }

                   
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
        //datapacket = x, y, color, iconText

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
        // datapacketz = 'x, y, color, iconText'
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


var replaceServerImage = function(datapacket, id) {
            //datapacket = imageURL
            //datapacket = 'x y'
    $.ajax({
        type: 'PUT',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+ id +'?api_key=29',
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
            console.log(errorMessage);
        }
    });
}


var deleteIconServer = function(id) {
    $.ajax({
        type: 'DELETE',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=29',
        success: function (response, textStatus) {

          //loadServer();
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

    window.clearInterval(interval);

    var elementDrag = function(e) {
        window.clearInterval(interval);
        if(e.type === "touchmove") {
            window.clearInterval(interval);
            window.clearInterval(interval);
            touch = e.changedTouches[0];

            pos1 = pos3 - touch.pageX;
            pos2 = pos4 - touch.pageY;
            pos3 = touch.pageX;
            pos4 = touch.pageY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
            elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
            

        } else {  
            window.clearInterval(interval);
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
        window.clearInterval(interval);
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;

        var x = elmnt.style.left.replace('px', '');
        var y = elmnt.style.top.replace('px','');

        x = x/$('#aspectRatioBox').width()*100
        y = y/$('#aspectRatioBox').height()*100

        if(!Number.isNaN(x) && !Number.isNaN(y) /*&&  Math.abs(x + y) > 0.5*/) {

            var datapacketz = [x, y, color, iconText].join(' ');

            var id = $(elmnt).data('id');
 

            changeServerPosition(datapacketz, id)
        } //else {
            //bug band-aid fix
            //window.location.reload();
            //return false;
        //}
    }

    var dragMouseDown = function(e) {
        if(e.type === "touchstart") {
            window.clearInterval(interval);
            touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
            pos3 = touch.pageX;
            pos4 = touch.pageY;
            document.ontouchend = closeDragElement;
            document.ontouchmove = elementDrag;

        }else {
            window.clearInterval(interval);
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
var reloadThePage = function() {
    loadServer()
}

$(document).ready(function() {
    loadServer(); 
  
    var interval = window.setInterval(reloadThePage, 1000);

    $(document).on('mousedown touchstart touchmove', '.icon', function(event) {
        window.clearInterval(interval);
        interval = null;
    })

    $(document).on('keyup mouseup touchend', '.icon', function(event) {
        if(!interval) {
            interval = window.setInterval(reloadThePage, 1000);
        }
    })


    $('#imageForm').on('submit', function(e) {
        e.preventDefault();
        var datapacket = $('#imageInput').val()
        replaceServerImage(datapacket, 1155)
        $('#imageInput').val('')
    })

    $('#gridMaker').on('submit', function(e) {
        e.preventDefault();

        let id = $('#masterRow').data('id');
        const reg = /x/;
        let datapacket = ($(this).children('input').val()).replace(reg, " ");
        if(!datapacket) {
            datapacket = '0';
        }
        replaceServerImage(datapacket, id);
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

    $(window).on('mousemove touchmove', function(e) {
        e.preventDefault();
    })

    $(document).on('mousedown', '.icon', function(e) {
        var iconText = $(this).text().replace(/(\s)/g, '-');

        if(($(this).hasClass('red'))) {
            var color = 'red';
        } else if(($(this).hasClass('blue'))) {
            var color = 'blue';
        }

        var elmnt = $(this)[0]
        toggleMove(elmnt, e, color, iconText, interval);
        
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
        $(this).remove();
        deleteIconServer($(this).data('id'));

    })

    $(document).on('doubletap', '.icon', function(event) {
        $(this).remove();
        deleteIconServer($(this).data('id'));
    })

    $('#clearAll').on('click', function() {
        $('.icon').each(function() {
            $(this).remove();
            deleteIconServer($(this).data('id'))
        })
        let id = $('#masterRow').data('id');
        let datapacket = '0 0';
        replaceServerImage(datapacket, id);
    })


})

/*
            //console.log('x', ((elmnt.offsetLeft - pos1)/$('#aspectRatioBox').width()*100), 'y', ((elmnt.offsetTop - pos2)/$('#aspectRatioBox').height()*100))
            //if(Math.abs(((elmnt.offsetLeft - pos1)/$('#aspectRatioBox').width()*100) + ((elmnt.offsetTop - pos2)/$('#aspectRatioBox').height()*100)) < 0.5) {
                //bug band-aid fix
                //window.location.reload();
                //return false;
            //}
            */