const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function() {
  // TODO: Swap out when Android repo goes public.
  return { url: "https://github.com/hotwired/hotwire-native-android", tag_name: "BETA", created_at: "2024-01-01:00:00:00" }

  let json = await Cache("https://api.github.com/repos/hotwired/hotwire-native-android/releases/latest", {
    duration: "1d",
    type: "json"
  });

  return {
    url: json.html_url,
    tag_name: json.tag_name.replace('v', ''),
    created_at: json.created_at
  };

};
