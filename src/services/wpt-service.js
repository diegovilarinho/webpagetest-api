'use strict';

const WebPageTest = require('webpagetest');

exports.runTest = async (url, options = {}) =>  {
  const wpt = new WebPageTest(global.WPT_SERVER, global.WPT_API);

  return new Promise((resolve, reject) => {
    wpt.runTest(url, options, (error, data) => {
      if(error) {
        console.log(error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

exports.checkTestStatus = async (testId, options ={}) =>  {
  const wpt = new WebPageTest(global.WPT_SERVER, global.WPT_API);

  return new Promise((resolve, reject) => {
    wpt.getTestStatus(testId, options, (error, data) => {
      if(error) {
        console.log(error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getTestResults = async (testId, options = {}) =>  {
  const wpt = new WebPageTest(global.WPT_SERVER, global.WPT_API);

  return new Promise((resolve, reject) => {
    wpt.getTestResults(testId, options, (error, data) => {
      if(error) {
        console.log(error);
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};
