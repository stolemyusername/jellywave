const RiskPoint = require('./riskPointModel');

/**
 * Methods for interacting with Risk Points.
 * @module riskPointController
 */

/**
 * Saves a risk point to the database.
 * @param {number} risk - The risk level for the point.
 * @param {GeoJSON Point} location - A GeoJSON Point representing the location.
 * @param {string} [batchId=null] - The batch identifier. Used to group points
 * generated at the same time.
 * @returns {Promise} A promise which resolves to the created instance.
 */
const createRiskPoint = function createRiskPoint(risk, location, batchId = null) {
  return RiskPoint.create({
    risk,
    location,
    batchId,
  });
};

/**
 * Saves multiple risk points to the database.
 * @param {Object[]} points - An array of risk points.
 * @param {number} points[].risk - The risk level for the point.
 * @param {GeoJSON Point} location - A GeoJSON Point representing the location.
 * @param {string} [batchId=null] - The batch identifier. Used to group points
 * generated at the same time.
 * @returns {Promise} A promise which resolves to the created instances.
 */
const createRiskPoints = function createRiskPoints(points, batchId) {
  const batchedPoints = points.map(point => Object.assign(point, { batchId }));
  return RiskPoint.create(batchedPoints);
};

/**
 * Find risk points from the database by their batch id.
 * @param  {string} batchId - The batch identifier to filter by.
 * @return {Promise} A promise which resolves to the risk points with `batchId`.
 */
const findRiskPointsByBatchId = function findRiskPointsByBatchId(batchId) {
  return RiskPoint.find({
    batchId,
  });
};

module.exports = {
  createRiskPoint,
  createRiskPoints,
  findRiskPointsByBatchId,
};