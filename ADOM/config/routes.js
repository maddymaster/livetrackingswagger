/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  'get /v2/Alert':'Alert.allAlerts',
  'post /v2/Alert':'Alert.create',
  'get /v2/Alert/:id':'Alert.findById',
  'put /v2/Alert/:id':'Alert.updateById',
  'delete /v2/Alert/:id':'Alert.deleteById',

  'get /v2/Device':'Device.allDevices',
  'post /v2/Device':'Device.create',
  'get /v2/Device/:id':'Device.findById',
  'put /v2/Device/:id':'Device.updateById',
  'delete /v2/Device/:id':'Device.deleteById',
  'delete /v2/Device/:id/GPS': 'Device.deleteGPSDataById',
  'get /v2/Device/:id/DeviceType': 'Device.deviceTypeByDevice',
  'get /v2/Device/:id/GPS': 'Device.gpsDataByDeviceId',
  'get /v2/Device/:id/GeoFence': 'Device.geoFencesByDeviceId',
  'get /v2/Device/:id/LatestState': 'DeviceLatestState.findByDeviceId',
  'put /v2/Device/:id/LatestState': 'DeviceLatestState.createOrUpdate',

  'get /v2/DeviceGeoFence':'DeviceGeoFence.allDeviceGeoFences',
  'post /v2/DeviceGeoFence':'DeviceGeoFence.create',
  'get /v2/DeviceGeoFence/:id':'DeviceGeoFence.findById',
  'put /v2/DeviceGeoFence/:id':'DeviceGeoFence.updateById',
  'delete /v2/DeviceGeoFence/:id':'DeviceGeoFence.deleteById',

  'get /v2/DeviceType':'DeviceType.allDeviceTypes',
  'post /v2/DeviceType':'DeviceType.create',
  'get /v2/DeviceType/:id':'DeviceType.findById',
  'put /v2/DeviceType/:id':'DeviceType.updateById',
  'delete /v2/DeviceType/:id':'DeviceType.deleteById',
  'get /v2/DeviceType/:id/Device': 'DeviceType.devicesByDeviceType',

  'get /v2/Entity': 'Entity.allEntities',
  'post /v2/Entity': 'Entity.create',
  'get /v2/Entity/:id':'Entity.findById',
  'put /v2/Entity/:id':'Entity.updateById',
  'delete /v2/Entity/:id':'Entity.deleteById',
  'get /v2/Entity/:id/User': 'Entity.usersByEntity',

  'get /v2/GeoFence': 'GeoFence.allGeoFences',
  'post /v2/GeoFence': 'GeoFence.create',
  'get /v2/GeoFence/:id':'GeoFence.findById',
  'put /v2/GeoFence/:id':'GeoFence.updateById',
  'delete /v2/GeoFence/:id':'GeoFence.deleteById',
  'get /v2/GeoFence/:id/Vertex' : 'GeoFence.vertexesOfGeoFence',

  'get /v2/GPS': 'GPSData.completeGPSData',
  'post /v2/GPS': 'GPSData.create',
  'get /v2/GPS/:id':'GPSData.findById',
  'put /v2/GPS/:id':'GPSData.updateById',
  'delete /v2/GPS/:id':'GPSData.deleteById',
  'post /v2/GPS/:device':'GPSData.createByDevice',

  'get /v2/Location':'Location.allLocations',
  'post /v2/Location':'Location.create',
  'get /v2/Location/:id':'Location.findById',
  'put /v2/Location/:id':'Location.updateById',
  'delete /v2/Location/:id':'Location.deleteById',
  'get /v2/Location/:id/User': 'Location.usersByLocation',

  'get /v2/Role': 'Role.allRoles',
  'post /v2/Role': 'Role.create',
  'get /v2/Role/:id': 'Role.findById',
  'put /v2/Role/:id':'Role.updateById',
  'delete /v2/Role/:id':'Role.deleteById',
  'get /v2/Role/:id/User': 'Role.usersByRoleId',

  'get /v2/Trip': 'Trip.allTrips',
  'post /v2/Trip': 'Trip.create',
  'get /v2/Trip/:id': 'Trip.findById',
  'put /v2/Trip/:id':'Trip.updateById',
  'delete /v2/Trip/:id':'Trip.deleteById',
  'get /v2/Trip/:id/Entity': 'Trip.entityByTripId',
  'get /v2/Trip/:id/Driver': 'Trip.driverByTripId',
  'get /v2/Trip/:id/User': 'Trip.usersByTripId',

  'get /v2/User': 'User.allUsers',
  'post /v2/User': 'User.create',
  'get /v2/User/:id': 'User.findById',
  'put /v2/User/:id':'User.updateById',
  'delete /v2/User/:id':'User.deleteById',
  'get /v2/User/:id/Entity': 'User.entityByUserId',
  'get /v2/User/:id/Location': 'User.locationByUserId',
  'get /v2/User/:id/Role': 'User.rolesByUserId',

  'get /v2/Vehicle': 'Vehicle.allVehicles',
  'post /v2/Vehicle': 'Vehicle.create',
  'get /v2/Vehicle/:id': 'Vehicle.findById',
  'put /v2/Vehicle/:id':'Vehicle.updateById',
  'delete /v2/Vehicle/:id':'Vehicle.deleteById',
  'get /v2/Vehicle/:id/Entity': 'Vehicle.entityByVehicleId',
  'get /v2/Vehicle/:id/Device': 'Vehicle.deviceByVehicleId',

  'get /v2/Vertex' : 'Vertex.allVertexes',
  'post /v2/Vertex': 'Vertex.create',
  'get /v2/Vertex/:id': 'Vertex.findById',
  'put /v2/Vertex/:id':'Vertex.updateById',
  'delete /v2/Vertex/:id':'Vertex.deleteById',

  'get /admin': 'NgAdminController.index',

  'get /v2/Subscribe': 'SocketsController.subscribeForEvents'
};
