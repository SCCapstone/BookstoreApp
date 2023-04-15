// returns the keys of a dictionary
function getKeys(obj) {
  var keys = [];
  iterate(obj, function (oVal, oKey) {
    keys.push(oKey);
  });
  return keys;
}

// iterates through the keys
function iterate(iterable, callback) {
  for (var key in iterable) {
    if (
      key === "length" ||
      key === "prototype" ||
      !Object.prototype.hasOwnProperty.call(iterable, key)
    )
      continue;
    callback(iterable[key], key, iterable);
  }
}

module.exports = { getKeys };
