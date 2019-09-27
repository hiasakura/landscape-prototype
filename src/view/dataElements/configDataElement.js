var selectedItems = document.getElementById('land_scape_items');

window.extensionBridge.register({
  init: function (info) {
    if (info.settings) {
      document.getElementById('land_scape_items').value = info.settings.landscapeAttr;
    }
  },
  getSettings: function () {
    return {
      landscapeAttr: selectedItems.value
    }
  },
  validate: function () {
    var flg = true;
    return flg;
  }
});