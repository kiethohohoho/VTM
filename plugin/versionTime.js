module.exports = function addVersion(version) {
  const htmlRegex = /\.css|\.js/g;
  return {
    name: "addVersionTime",
    apply: "build",
    transformIndexHtml(html) {
      return html.replace(
        htmlRegex,
        ($0) => `${$0}?version=${version}&time=${Date()}`
      );
    },
  };
};
