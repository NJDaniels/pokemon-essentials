enum WEATHERS {
  None = "None",
  HarshSunlight = "HarshSunlight",
  Rain = "Rain",
  SandStorm = "SandStorm",
  Hail = "Hail",
  ExtremelyHarshSunlight = "ExtremelyHarshSunlight",
  HeavyRain = "HeavyRain",
  StrongWinds = "StrongWinds",
  ShadowSky = "ShadowSky"
}

namespace BattleWeather {
  let WeathersEffects = {};
  export function RegisterEffects(weather: WEATHERS, effects: IEventsEffects) {
    if (Array.isArray(weather)) {
      for (const w of weather) {
        WeathersEffects[w] = effects;
      }
    } else {
      WeathersEffects[weather] = effects;
    }
  }

  export function getEffect(effectId: string, weather: WEATHERS) {
    if (WeathersEffects[weather] && [effectId]) return WeathersEffects[weather][effectId];
    return undefined;
  }

  export function isPrimalWeather(weather: WEATHERS) {
    return weather === WEATHERS.ExtremelyHarshSunlight || weather === WEATHERS.HeavyRain || WEATHERS.StrongWinds;
  }
}

BattleWeather.RegisterEffects(WEATHERS.HarshSunlight, {
  BasePower: function(damage, source, target, effect) {
    if (effect.move.type === PE.TYPES.FIRE) {
      damage += PE.Utils.pct(damage, 50);
      console.log(`: [Harsh Sunlight] power up Fire type move 50% => ${damage}`);
    }
    if (effect.move.type === PE.TYPES.WATER) {
      damage -= PE.Utils.pct(damage, 50);
      console.log(`: [Harsh Sunlight] power down Water type move 50% => ${damage}`);
    }
    return damage;
  }
});

BattleWeather.RegisterEffects(WEATHERS.ExtremelyHarshSunlight, {
  BasePower: function(damage, source, target, effect) {
    if (effect.move.type === PE.TYPES.FIRE) {
      damage += PE.Utils.pct(damage, 50);
      console.log(`: [Extremely Harsh Sunlight] power up Fire type move 50% => ${damage}`);
    }
    return damage;
  }
});

BattleWeather.RegisterEffects(WEATHERS.Rain, {
  BasePower: function(damage, source, target, effect) {
    if (effect.move.type === PE.TYPES.WATER) {
      damage += PE.Utils.pct(damage, 50);
      console.log(`: [Rain] power up Water type move 50% => ${damage}`);
    }
    if (effect.move.type === PE.TYPES.FIRE) {
      damage -= PE.Utils.pct(damage, 50);
      console.log(`: [Rain] power down Fire type move 50% => ${damage}`);
    }
    return damage;
  }
});

BattleWeather.RegisterEffects(WEATHERS.HeavyRain, {
  BasePower: function(damage, source, target, effect) {
    if (effect.move.type === PE.TYPES.WATER) {
      damage += PE.Utils.pct(damage, 50);
      console.log(`: [Haevy Rain] power down Fire type move 50% => ${damage}`);
    }
    return damage;
  }
});
