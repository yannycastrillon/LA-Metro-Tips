var toolkit = module.exports = {
  uppercase,
  timeSince
}

function uppercase(str) {
  var array1 = str.split(' ');
  var newarray1 = [];

  for(var x = 0; x < array1.length; x++){
      newarray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
  }
  return newarray1.join(' ');
}

// Converts date into timesince
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {return interval + " years ago";}
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {return interval + " months ago";}
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {return interval + " days ago ";}
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {return interval + " hours ago";}
  interval = Math.floor(seconds / 60);
  if (interval > 1) {return interval + " minutes ago";}
  return Math.floor(seconds) + " seconds ago";
}
