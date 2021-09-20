import Fetch from "node-fetch";

export default async (Body, headers, url, method) => {
  const response = await Fetch(url, {
    headers,
    method,
    body: JSON.stringify(Body),
  });
  const responseToJson = await response.json();
  return responseToJson;
};
