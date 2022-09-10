import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { Typography } from 'antd';

export default function CustomColorPicker(props) {
  const { Title, Text } = Typography;
  const [color, setColor] = useColor("hex", "#121212");
  return (
    <div>
      <div className="header-top"></div>
      <Title level={5}>Select Custom Color</Title>
      <ColorPicker
        width={"100%"}
        height={200}
        color={color}
        onChange={(color) => {
            debugger
            setColor(color);
            if(color && color.hex && color.hex.includes('NaN')){
                //
            } else {
                props.callback(color && color.hex);
            }
        }}
        hideHSV
        dark
      />
      ;
    </div>
  );
}
