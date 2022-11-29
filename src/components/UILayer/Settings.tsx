import * as St from "components/uILayer/Settings.styled";
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
              {object.images.map((object) => {
                return (
                  <St.settingsOptionButton key={object.src}>
                    <St.settingsOptionImg src={object.src} />
                  </St.settingsOptionButton>
                );
              })}
            </St.settingsOption>
          );
        })}
      </St.settingsOptions>
    </St.settings>
  );
};

export default Settings;
