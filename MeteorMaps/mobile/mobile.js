/**
 * Declarations
 */
var dataDiv = document.getElementById('dataDiv');
var mapDiv = document.getElementById('map');
var howDiv = document.getElementById('howDiv');

/**
 * show table of data
 */
function showData() {
    dataDiv.style.width = '100%';
    dataDiv.style.overflow = 'auto';
    howDiv.style.width = '0%';
    mapDiv.style.visibility = 'hidden';
}

/**
 * Hide table data
 */
function hideData() {
    dataDiv.style.width = '0%';
    dataDiv.style.overflow = 'hidden';
}

/**
 * show map
 */
function showMap() {
    hideData();
    mapDiv.style.visibility = 'visible';
    howDiv.style.width = '0%';
}

/**
 * show instructions
 */
function showHowTo() {
    hideData();
    mapDiv.style.visibility = 'hidden';
    howDiv.style.width = '100%';
}

/**
 * OnLoad show instuctions, add event listener to table rows.
 */
$(document).ready(function () {
    //load instuctions
    showHowTo();
    //add confimation to table row
    $('body').on("click", '#table_id tbody tr', function () {
        var name = $(this).children("td:eq( 0 )").text();
        if (confirm("Goto " + name + "?")) {
            showMap();
        }
    });
});