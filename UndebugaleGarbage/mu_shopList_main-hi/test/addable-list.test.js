import MuShopList from "mu_shopList_main-hi";
import { testProperties } from "uu5g05-test";

const CONFIG = {
  props: {
    // left: {
    //   values: ["Left as text", <span key="l">Left as JSX</span>, 0],
    // },
  },
  requiredProps: {
    // children: "Children content",
  },
};

describe(`MuShopList.AddableList`, () => {
  testProperties(MuShopList.AddableList, CONFIG);
});