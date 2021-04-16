
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --font-family: 'Barlow Semi Condensed', sans-serif;
    }
    
    html {
        color: white;
        font-family: var(--font-family);
        font-size: 16px;
        height: -webkit-fill-available;
    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        display: flex;
        flex-flow: column;
        min-height: 100vh;
        min-height: -webkit-fill-available;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
    }
`;

export default GlobalStyles;