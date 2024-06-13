import handler, { handler as namedHandler } from "./reenvio.js";

data =
  "$$T156,013227002709461,AAA,35,-31.522403,-68.515760,240613015057,A,11,13,0,0,0,625,31488253,18964415,722|310|1996|3B3A,0400,000D|000F|0000|0A6D|0431,,,1,0000*46";
// También puedes usar `namedHandler` si necesitas la función nombrada
namedHandler(data);
