import request from "../../request/index";

export function registerUser(data = {}) {
  return request({
    url: "/users/register",
    methods: "post",
    data
  });
}
