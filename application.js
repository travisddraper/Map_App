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


var loadServer = function() {
    ajax request {
        type: 'GET',
        success: function(response, textStatus) {
            response.tasks.forEach(function(task) {
                if(task.content IS AN ARRAY) {
                    INJECT IT INTO THE DOM AT SPECIFIED X-Y POSITION WITH DATA ID AND CSS STYLING CLASSES
                })
            })

        }
    }
}

var addNewIconServer = function() {
    ajax request({
        type: 'POST',
        data: JSON.stringify({
            task: {
                content: [x,y]
            }
        }),
        success: function(response, textStatus) {
            loadServer();
        }
    })
}

var changeServerPosition = function(id) {
    ajax requests {
        type: 'PUT',
        url: 'link with id',
        data: JSON.stringify({
            task: {
                content: [x,y]
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

$(document).ready(function() {

    $('.iconButton').on('click', function() {
        var iconText = $(this).text();
        
    })

    $('#addIconForm').on('submit', function(e) {
        e.preventDefault();
        var iconText = $('#addIconInput').val();
        
    });


})