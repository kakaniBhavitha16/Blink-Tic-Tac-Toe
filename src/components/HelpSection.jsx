const HelpSection = () => {
  return (
    <div className="help-section">
      <h2>Game Rules</h2>
      <ul>
        <li>Each player selects an emoji category at the start</li>
        <li>Players take turns placing random emojis from their category</li>
        <li>Each player can only have 3 emojis on the board at once</li>
        <li>When placing a 4th emoji, the oldest one vanishes </li>
        <li>You can't place your 4th emoji where your 1st emoji was</li>
        <li>First to get 3 of their emojis in a row wins!</li>
      </ul>
    </div>
  );
};

export default HelpSection;