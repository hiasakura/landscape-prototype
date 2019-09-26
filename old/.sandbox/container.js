module.exports = {
  "dataElements": {},
  "rules": [{
    "id": "RL1568336681205",
    "actions": [{
      "modulePath": "asakura-dummy-extension/src/lib/actions/testAction.js",
      "settings": {}
    }],
    "name": "Test Action"
  }],
  "extensions": {
    "asakura-dummy-extension": {
      "displayName": "Asakura-Dummy-Extension",
      "settings": {
        "uid": "hoges",
        "pw": "piyos",
        "gid": "fugas",
        "fire_per_visit": true,
        "evar_data": [{
          "attr": "company_name",
          "variable": "eVar1"
        }, {
          "attr": "company_addr",
          "variable": "eVar2"
        }, {
          "attr": "company_tel",
          "variable": "eVar3"
        }],
        "prop_data": [{
          "attr": "company_name",
          "variable": "prop1"
        }, {
          "attr": "company_addr",
          "variable": "prop3"
        }]
      }
    }
  },
  "property": {
    "settings": {
      "domains": ["example.com"]
    }
  },
  "company": {
    "orgId": "ABCDEFGHIJKLMNOPQRSTUVWX@AdobeOrg"
  },
  "buildInfo": {
    "turbineVersion": "25.6.0",
    "turbineBuildDate": "2019-09-14T15:17:48.902Z",
    "buildDate": "2019-09-14T15:17:48.902Z",
    "environment": "development"
  }
}