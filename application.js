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


var loadServer = function() {
    $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=28',
        dataType: 'json',
        success: function(response, textStatus) {
            console.log('loading server');
            response.tasks.forEach(function(task) {
                var dataPacket = task.content.split(' ');
                if(Array.isArray(dataPacket)) {
                    var name = dataPacket[2];
                    var x = dataPacket[0]
                    var y = dataPacket[1]
                    
                    $('.iconRow').prepend($('<div style="left:' + x +'px; top:' + y + 'px" class="icon" data-id="' + task.id + '">'+ name + '</div>'))


                    //INJECT IT INTO THE DOM AT SPECIFIED X-Y POSITION WITH DATA ID AND CSS STYLING CLASSES
                    console.log(dataPacket);
                }
            })
            console.log('woohooo');
        },
        error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
        }
    });
}

var addNewIconServer = function(datapacket) {

    $.ajax({
        type: 'POST',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=28',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
            task: {
                content: datapacket
            }
        }),
        success: function(response, textStatus) {
            console.log('success!');
            loadServer();
        },
        error: function(request, textStatus, errorMessage) {
            console.log(request, textStatus, errorMessage);
        }
    });
}

/*
var changeServerPosition = function(largerdatapacket) {
    ajax requests {
        type: 'PUT',
        url: 'link with id',
        data: JSON.stringify({
            task: {
                content: largerdatapacket [x,y,name,id]
            }
        }),
        success: function(response, textStatus) {
            loadServer();
        },
    }
}

var loadServerImage = function(id) {
    ajax request {
        type: 'GET'
        url: 'link with id',
        success: function(response, textStatus) {
            INECJT response.task.content INTO <img src="_____" />
        }
    }
}

var replaceServerImage = function(id) {
    ajax request {
        type: 'PUT',
        url: 'link with id',
        data: JSON.stringify({
            task: {
                content: image url source
            }
        }),
        success: function(response, textStatus) {
            loadServerImage(id);
        }
    }
}
*/



    

    
var toggleMove = function(elmnt, e) {
    var pos1=0; var pos2=0; var pos3=0; var pos4=0;

    var elementDrag = function(e) {

        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
  
        elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
    }

    var closeDragElement = function() {

        document.onmouseup = null;
        document.onmousemove = null;
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

var buildAButton = function(elmnt, iconText) {
    $(elmnt).parent().prepend($('<div class="icon" data-id="">' + iconText + '</div>'))
    //console.log('y position', ($(elmnt).parent().children()[0]).getBoundingClientRect().top);
    //var y = window.scrollY + ($(elmnt).parent().children()[0]).getBoundingClientRect().top
    //var x = window.scrollX + ($(elmnt).parent().children()[0]).getBoundingClientRect().left
    return [x,y]
}


$(document).ready(function() {

    loadServer();

    $('.iconButton').on('click', function() {
        var iconText = $(this).text();
        var datapacket = buildAButton($(this), iconText);
        datapacket.push(iconText);
        //
        //console.log((datapacket.join(' ').split(' ')));
        //var x = $(this)[0].style.left;
        //var y = $(this)[0].style.top;2
        //var datapacket = [x, y, iconText];
        //console.log(datapacket.join(''));

        //addNewIconServer(datapacket.join(' '))
    })

    $('#addIconForm').on('submit', function(e) {
        e.preventDefault();
        var iconText = $('#addIconInput').val();
    });

    $(document).on('mousedown', '.icon', function(e) {
        var elmnt = $(this)[0]
        toggleMove(elmnt, e);
    })


})