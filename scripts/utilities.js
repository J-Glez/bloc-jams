function forEach(points, revealPoint) {
    // Use a loop to go through all elements in the points array
    // Execute a callback for each element

    for (var x = 0; x < points.length; x++)
        {
            revealPoint(points[x]);
        }
}
