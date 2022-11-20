import * as St from "components/UILayer/Settings.styled";
import { GAME_OPTIONS } from "data/gameOptions";

const Settings = () => {
  return (
    <St.settings>
      <St.settingsIcon>
        <St.settingsIconImg src="/settings.svg" />
      </St.settingsIcon>
      <St.settingsOptions>
        {GAME_OPTIONS.map((object) => {
          return (
            <St.settingsOption key={object.title}>
              {object.title}
              
            </St.settingsOption>
          );
        })}
      </St.settingsOptions>
    </St.settings>
  );
};

export default Settings;
