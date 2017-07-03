/**
 * MD风格地图弹出层
 * @class
 */
WeatherMap.Popup.Material = WeatherMap.Class(WeatherMap.Popup.Anchored, {
    initialize: function() {
        WeatherMap.Popup.Anchored.prototype.initialize.apply(this, arguments);
    },
    CLASS_NAME: 'WeatherMap.Popup.Material'
});
