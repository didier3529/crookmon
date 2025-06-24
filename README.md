# crookmon

A client-only React single-page application that teaches beginners core state management and simple turn-based game logic. Users pick two parody crypto mascots, battle them via meme attacks, watch HP bars update and logs grow, and see a win/loss screen with a restart option.

---

## Table of Contents

1. [Overview](#overview)  
2. [Features](#features)  
3. [Getting Started](#getting-started)  
   - [Prerequisites](#prerequisites)  
   - [Installation](#installation)  
   - [Running Locally](#running-locally)  
   - [Building for Production](#building-for-production)  
4. [Usage](#usage)  
5. [Component Reference](#component-reference)  
6. [Project Structure](#project-structure)  
7. [Dependencies](#dependencies)  
8. [Environment Variables](#environment-variables)  
9. [Accessibility](#accessibility)  
10. [Future Work](#future-work)  
11. [License](#license)  

---

## Overview

Crookmon is a minimalist React app that simulates a turn-based ?meme battle? between two crypto-mascots. It?s fully client-side, uses React Context + useReducer for state management, and demonstrates:

- Character selection  
- Turn-based attack logic  
- Dynamic HP bars  
- Live battle logs  
- Win/loss end screen with restart  
- Optional Analytics and Tip Jar  

---

## Features

- **CharacterSelection**: Pick two mascots from `mascots.json`  
- **BattleScreen**:  
  - HP bars with ARIA labels  
  - ?Attack? button to perform meme attacks  
  - Turn indicator  
  - Scrollable, live-region battle log  
- **EndScreen**: Displays winner and restart button  
- **Accessibility**: Keyboard navigable, focus trapping, ARIA roles/labels  
- **Styling**: Global `index.css` + CSS Modules  
- **Deployable**: Static bundle (Netlify, GitHub Pages, etc.)  
- **Env-flags**: Toggle `<AnalyticsTracker/>` and `<TipJar/>`  

---

## Getting Started

### Prerequisites

- Node.js ? 14  
- npm ? 6  

### Installation

```bash
git clone https://github.com/your-org/crookmon.git
cd crookmon
npm install
```

### Running Locally

By default, analytics and tip-jar are **disabled**. To enable:

```bash
# Linux/macOS
REACT_APP_ENABLE_ANALYTICS=true REACT_APP_ENABLE_TIPJAR=true npm start

# Windows (PowerShell)
$env:REACT_APP_ENABLE_ANALYTICS = "true"
$env:REACT_APP_ENABLE_TIPJAR     = "true"
npm start
```

This spins up:

- http://localhost:3000 ? React dev server

### Building for Production

```bash
npm run build
```

Deploy the contents of `build/` to any static-hosting service.

---

## Usage

1. **Select Mascots**  
   - Click or keyboard-focus + Enter on two mascot cards.  
   - ?Start Battle? button becomes active.  
2. **Battle**  
   - See HP bars update on each attack.  
   - Watch live updates in the battle log (ARIA live region).  
   - Alternate turns until one mascot?s HP ? 0.  
3. **End Screen**  
   - View win/loss message.  
   - Click ?Restart? or press Enter to go back to selection.  

---

## Component Reference

- **GameContextProvider** (`gamecontext.jsx`)  
  Provides global state & `dispatch` using `useReducer`.  
- **App** (`app.jsx`)  
  Root component?renders `<CharacterSelection />`, `<BattleScreen />`, or `<EndScreen />` based on game stage; conditionally mounts `<AnalyticsTracker />` and `<TipJar />`.  
- **CharacterSelection** (`characterselection.jsx`)  
  Loads `mascots.json`, renders `MascotCard`s, manages selections, and a ?Start Battle? button.  
- **MascotCard** (`mascotcard.jsx`)  
  Clickable/keyboard-selectable card showing mascot image, name, and max HP.  
- **BattleScreen** (`battlescreen.jsx`)  
  Shell component that activates `useFocusTrap`, displays `HPBar`, `TurnIndicator`, `AttackButton`, and `BattleLog`.  
- **AttackButton** (`attackbutton.jsx`)  
  Triggers `PERFORM_ATTACK` action on click or keypress.  
- **HPBar** (`hpbar.jsx`)  
  Visual health bar with current vs. max HP and ARIA attributes.  
- **TurnIndicator** (`turnindicator.jsx`)  
  Displays which mascot?s turn it is, with visual highlight.  
- **BattleLog** (`battlelog.jsx`)  
  Scrollable live-region log of battle events.  
- **EndScreen** (`endscreen.jsx`)  
  Shows win/loss message and a ?Restart? button that dispatches `RESET_GAME`.  
- **AnalyticsTracker** (`AnalyticsTracker.jsx`)  
  Optional analytics UI, controlled via env flag.  
- **TipJar** (`TipJar.jsx`)  
  Optional tip jar UI, controlled via env flag.  
- **useFocusTrap** (`usefocustrap.js`)  
  Custom hook to trap focus within a container on stage transitions.  
- **gamelogic.js**  
  Pure functions: `initializeGame`, `performAttack`, `checkDefeat`, `randomInRange`.

---

## Project Structure

```
??? public/
?   ??? index.html
??? src/
?   ??? index.js
?   ??? index.css
?   ??? app.jsx
?   ??? gamecontext.jsx
?   ??? gamelogic.js
?   ??? usefocustrap.js
?   ??? mascots.json
?   ??? components/
?   ?   ??? CharacterSelection.jsx
?   ?   ??? MascotCard.jsx
?   ?   ??? BattleScreen.jsx
?   ?   ??? AttackButton.jsx
?   ?   ??? HPBar.jsx
?   ?   ??? TurnIndicator.jsx
?   ?   ??? BattleLog.jsx
?   ?   ??? EndScreen.jsx
?   ?   ??? AnalyticsTracker.jsx
?   ?   ??? TipJar.jsx
?   ??? styles/
?       ??? [Component].module.css
??? package.json
??? README.md
```

---

## Dependencies

- react  
- react-dom  
- prop-types  
- classnames  

Dev-dependencies:

- eslint  
- prettier  

---

## Environment Variables

- `REACT_APP_ENABLE_ANALYTICS` = `true` | `false`  
- `REACT_APP_ENABLE_TIPJAR`     = `true` | `false`  

---

## Accessibility

- Fully keyboard navigable (tab/Enter/Space)  
- Focus is trapped within current stage container  
- ARIA roles, labels, and live regions for screen readers  

---

## Future Work

- Unit tests for `gamelogic.js` functions and reducer actions  
- Expand navigation (global menu/sidebar)  
- Additional mascots & attack types  
- Multiplayer via WebSocket  

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.