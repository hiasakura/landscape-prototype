var selectedItems = document.getElementById('land_scape_items');

window.extensionBridge.register({
  init: function (info) {
    if (info.settings) {
      console.log(info.settings.landscapeObj);
      document.getElementById('land_scape_items').value = info.settings.landscapeObj;
    }
  },
  getSettings: function () {
    return {
      landscapeObj: selectedItems.value
    }
  },
  validate: function () {
    var flg = true;
    return flg;
  }
});