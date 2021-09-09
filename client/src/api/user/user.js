import request from "../../request/index";

export function registerUser(data = {}) {
  console.log(data);
  return request({
    url: "/users/register",
    methods: "post",
    data
  });
}
