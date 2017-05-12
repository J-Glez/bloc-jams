var animatePoints = function() {
    var points = document.getElementsByClassName('point');

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
