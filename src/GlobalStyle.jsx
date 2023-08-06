import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
${reset}
:root {
  --color-bg: #FFF4E0;;
  --color-box1: #FF7E00;
  --color-box2: #ffc990;
  --color-box3: #58754b;
}

body {
  margin-top: 10rem
}
`

export default GlobalStyle