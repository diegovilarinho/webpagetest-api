'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/wpt-repository');
const wptService = require('../services/wpt-service');
var config = require('../config');

exports.runTest = async (req, res, next) => {
    let contract = new ValidationContract();
    let { url, options } = req.body;

    contract.isRequired(url, 'url is required');
    // Se os dados forem inválidos
    if (!contract.isValid()) {
      res.status(400).send(contract.errors()).end();
      return;
    }

    try {
      let data = await wptService.runTest(url, options);

      res.status(200).json({
        data
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        message: 'Falha ao processar sua requisição'
      });
    }
};

exports.checkTestStatusById = async (req, res, next) => {
  let contract = new ValidationContract();
  contract.isRequired(req.params.testId, 'testId is required');

  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    let data = await wptService.checkTestStatus(req.params.testId);

    res.status(200).json({
      data
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });
  }
};

exports.getTestResultsById = async (req, res, next) => {
  let { url, options } = req.body;
  let contract = new ValidationContract();

  contract.isRequired(req.params.testId, 'testId is required');
  // Se os dados forem inválidos
  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end();
    return;
  }

  try {
    let data = await wptService.getTestResults(req.params.testId);

    if(req.query.onlyRequests) {
      data = data.data.runs['1'].firstView.requests
        .filter(item => {
          const contentTypes = req.query.contentTypes ? req.query.contentTypes : [];
          if(contentTypes.length > 0) {
            return contentTypes.includes(item.contentType);
          }
        })
        .map(item => item.full_url)
    }

    res.status(200).json({
      data
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
        message: 'Falha ao processar sua requisição'
    });
  }
};