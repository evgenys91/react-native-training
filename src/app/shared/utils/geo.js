export const getZoomLevelForRegion = function({ longitudeDelta }) {
    return Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
};

/**
* Generates number of random geolocation points given a center and a radius.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @param {number} count Number of points to generate.
* @return {array} Array of Objects with lat and lng attributes.
*/
export function generateRandomPoints(center, radius, count, current = 0) {
    const points = [];
    for (let i = current; i < current + count; i++)
        points.push({
            type: "Feature",
            properties: {
                _id: `pin_${i}`
            },
            geometry: {
                type: "Point",
                coordinates: generateRandomPoint(center, radius)
            }
        });
    return points;
}

/**
* Generates number of random geolocation points given a center and a radius.
* Reference URL: http://goo.gl/KWcPE.
* @param  {Object} center A JS object with lat and lng attributes.
* @param  {number} radius Radius in meters.
* @return {Object} The generated random points as JS object with lat and lng attributes.
*/
export function generateRandomPoint(center, radius) {
    var x0 = center.longitude;
    var y0 = center.latitude;
    // Convert Radius from meters to degrees.
    var rd = radius / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);

    // Resulting point.
    var longitude = xp + x0;
    var latitude = y + y0;
    var point = [longitude, latitude];

    return point;
}
