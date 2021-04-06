
import { createGlobalStyle } from 'styled-components';
import {
    LG_BREAKPOINT,
    LG_CHOICE_SIZE,
    LG_CHOICE_SCALE,
    SM_CHOICE_SIZE,
    BONUS_LG_CHOICE_SCALE,
    BONUS_SM_CHOICE_SCALE,
} from './constants';

const GlobalStyles = createGlobalStyle`
    :root {
        --border-radius: 6px;
        --lg-border-radius: 8px;

        // colors
        --dark-text: hsl(229, 25%, 31%);
        --score-text: hsl(229, 64%, 46%);
        --header-outline: hsl(217, 16%, 45%);

        // bg gradient
        --bg-radial-gradient: radial-gradient(circle at top, hsl(214, 47%, 23%), hsl(237, 49%, 15%));

        // fonts
        --font-family: 'Barlow Semi Condensed', sans-serif;
        --font-weight-bold: 700;
        --font-weight-semi-bold: 600;
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