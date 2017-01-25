
module.exports = function upVote(quality){
    switch (quality) {
      case "swill":
        return "plausible";
      case "plausible":
        return "genius";
      default:
        return "genius";
    }
  };

module.exports = function downVote(quality){
    switch (quality) {
      case "genius":
        return "plausible";
      case "plausible":
        return "swill";
      default:
        return "swill";
    }
  };
