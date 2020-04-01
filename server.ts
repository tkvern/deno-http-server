import { serve } from "https://deno.land/std@v0.36.0/http/server.ts";
const server = serve({ port: 8899 });
const CONTENT_TYPE_MAP: { [index: string]: any } = { // 定义Content-Type的HashMap
  html: "text/html; charset=UTF-8",
  htm: "text/html; charset=UTF-8",
  js: "application/javascript; charset=UTF-8",
  css: "text/css; charset=UTF-8",
  txt: "text/plain; charset=UTF-8",
  mainfest: "text/plain; charset=UTF-8"
};
(async function () {
  for await (const req of server) {
    const pathname = req.url.split('?')[0]
    const filename = '/Users/vernbrandl/Downloads/' + pathname.substring(1);
    const suffix = filename.substring(filename.lastIndexOf(".") + 1); // 获取文件后缀
    try {
      const content = await Deno.readFile(filename)
      const headers = new Headers({
        "Content-Type": CONTENT_TYPE_MAP[suffix] || "application/octet-stream"
      })
      req.respond({
        body: content, status: 200, headers
      });
    } catch (error) {
      req.respond({ body: "Not Found\n", status: 404 });
    }
  }
})()
