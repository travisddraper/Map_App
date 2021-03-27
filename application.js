/*
> Create CSS stylings for the ICON which is created from button press
------js-------
> Create a BUTTONPRESS function for each existing Icon that will produce a draggable div element with matching content (ideally above the button).

> Create a function that will take the input of the textbox Icon (AS WELL AS COLOR RADIO BUTTON) and upon submitting runs the BUTTONPRESS function to create a draggable div element with submitted text as content in correct color

-----server-----
> Create a LOADSERVERIMAGE function that updates the img src="_____" with a GET ID## request 

> Create a LOADSERVERPOSITIONS function that with a GET request (that filters for content value which is in array form)

> Create a LOADSERVER function that LOADSSERVERPOSITIONS

> Create a function that accepts an image url, PUTS it to the server (with specific ID##), and then runs LOADSERVER function

PAGE LOADS (loadServer(), LoadServerImage(id)) --> BUTTON ICON IS PRESSED (addNewIconServer()) --> ICON IS DRAGGED (changeServerPosition(id)) --
--> 3 SECONDS GOES BY AND YOU DON'T INTERACT WITH WINDOW (loadServer());

*/

function isUpperCase(string) {
   return /^[A-Z]*$/.test(string);
}

var loadServer = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=29',
        dataType: 'json',
        success: function(response, textStatus) {

            $('.icon').remove();
            
            response.tasks.forEach(function(task) {
               
                var dataPacket = task.content.split(' ');
               
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

                    
                    var x = dataPacket[0]
                    var y = dataPacket[1]


                    
                    $('#' + name).prepend($('<div style="left:' + x +'px; top:' + y + 'px" class="icon ' + color +'" data-id="' + task.id + '">'+ text + '</div>'))
                   
                } else {
                    console.log('HEYYY');
                    $('#image').attr("src", task.content)
                }
            })
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

var addNewIconServer = function(datapacket) {

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
            $('#image').attr("src", response.task.content)
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
          
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
    });
}



    

    
var toggleMove = function(elmnt, e, iconText) {
    var pos1=0; var pos2=0; var pos3=0; var pos4=0;
    var datapacket;


    var elementDrag = function(e) {

        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
        var y = elmnt.style.top;
        elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
        var x = elmnt.offsetLeft;
       

        //var datapacket = [x, y, iconText];
        //console.log(datapacket);
        
    }

    var closeDragElement = function() {
        
        document.onmouseup = null;
        document.onmousemove = null;
        var x = elmnt.style.left.replace('px', '');
        var y = elmnt.style.top.replace('px','');

        var datapacketz = [x, y, iconText].join(' ');
        var id = $(elmnt).data('id');

        changeServerPosition(datapacketz, id)
    }

    var dragMouseDown = function(e) {
        
        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    dragMouseDown(e);
}





var refreshThePage = function() {
    console.log('reset');
    return loadServer();
}

var intervalReset = function(interval) {
    if(interval) {
        window.clearInterval(interval);
        interval = window.setInterval(refreshThePage, 8000);
        return interval
    } else if(!interval) {
        interval = window.setInterval(refreshThePage, 8000);
        return interval
    }
}



var debounce = function(callback, delay) {
    var timeout;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
    }
}

var refreshThis = debounce(function() {
    console.log('debounced!');
    loadServer();
}, 1000);






$(document).ready(function() {

    
    loadServer();

    var interval;

    $(window).on('keydown keyup click mousemove change', function(event) {
        interval = intervalReset(interval);
        refreshThis();
    })


    $('#imageForm').on('submit', function(e) {
        e.preventDefault();
        var imageURL = $('#imageInput').val()


        replaceServerImage(imageURL, 1155)
    })

    
    $('.iconButton').on('click', function() {
        var iconText = $(this).text();
   
        if(($(this).hasClass('red'))) {
            iconText = iconText+"red"
        }
        if(($(this).hasClass('blue'))) {
            iconText = iconText+"blue"
        }

        var datapacket = [21, -49, iconText].join(' ');
 
        addNewIconServer(datapacket)
    })

    $('#addIconForm').on('submit', function(e) {
        e.preventDefault();
        var nameInput = $('#addIconInput').val();
        var color = $("input[name=colorToggle]:checked").val()
        var iconText = nameInput+color+0;
        
        datapacket = [21, -49, iconText].join(' ');

        addNewIconServer(datapacket);
    });

    $(document).on('mousedown', '.icon', function(e) {
        var iconText = $(this).text()
        if($(this).parent().is("#newCharacter")) {
            iconText += "0";
        }

        if(($(this).hasClass('red'))) {
            iconText = iconText+"red"
        } else if(($(this).hasClass('blue'))) {
            iconText = iconText+"blue"
        }

        var elmnt = $(this)[0]
        toggleMove(elmnt, e, iconText);
        
    })

    $(document).on('contextmenu', '.icon', function(event) {
        event.preventDefault();
        $(this).remove();
        deleteIconServer($(this).data('id'));

    })


})