var pointsArray = document.getElementsByClassName('point');

var animatePoints = function(points) {
    var revealPoint = function(pointIndex)
    {
        points[pointIndex].style.opacity = 1;
        points[pointIndex].style.transform = "scaleX(1) translateY(0)";
        points[pointIndex].style.msTransform = "scaleX(1) translateY(0)";
        points[pointIndex].style.WebkitTransform = "scaleX(1) translateY(0)";

        points[pointIndex].style.transition = "all 2s";
        points[pointIndex].style.mstransition = "all 2s";
        points[pointIndex].style.WebkitTransition = "all 2s";
    };

    for (var x = 0; x < points.length; x++)
        {
            revealPoint(x);
        }
};

window.onload = function() {
        // No need to for the listener to trigger
    if (window.innerHeight > 950) {
        animatePoints(pointsArray);
    }

    var sellingPoints = document.getElementsByClassName('selling-points')[0];
    var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;

    window.addEventListener('scroll', function(event) {
        if (document.documentElement.scrollTop || document.body.scrollTop >= scrollDistance) {
            animatePoints(pointsArray);
        }
    });
 }
