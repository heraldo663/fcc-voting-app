module.exports = {
  getArrayofItem: function(ArrayOfObjects) {
    var itemArray = [];
    ArrayOfObjects.map(function(itens) {
      itemArray.push(itens.item);
    });

    return itemArray;
  },
  getArrayofVotes: function(ArrayOfObjects) {
    var votesArray = [];
    ArrayOfObjects.map(function(itens) {
      console.log(itens);
      votesArray.push(itens.votes);
    });

    return votesArray;
  }
};
