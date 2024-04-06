//@@viewOn:imports
import { createVisualComponent, Utils, Content } from "uu5g05";
import UU5 from "uu5g04";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  main: () => Config.Css.css({}),
};
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const Filter = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "Filter",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { onFilterSet } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props, Css.main());

    return (<div {...attrs}>
      <UU5.Forms.Form
        onSave={(opt) => {onFilterSet}}
        header={<UU5.Bricks.Box content='Registration form' colorSchema='green' className='font-size-m' />}
        footer={<UU5.Bricks.Box content='Unicorn 2018' colorSchema='grey' className='font-size-xs' />}
      >
        <UU5.Forms.Checkbox
          name="showDone"
          label="showDone"
        />
        <UU5.Forms.Controls/>
      </UU5.Forms.Form>
    </div>)
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { Filter };
export default Filter;
//@@viewOff:exports
