  "message emojisymbol message"
  => "message <img /> message"

  "message emojisymbol message"
  => [ "message", <img />, "message" ]

  msg.split(/\s+/).map(t => {
    bttv.emotes.filter(emote => t === emote.regex).map(e => {
      if (e.url && e.url.length > 0) {
        _msg = msg.replace(
          t,
          `<img className="twitch-emoji" src="${e.url}" alt="">`
        );
      }
    });
  });

  msg.split(/\s+/).map(t => {
    match = bttv.emotes.find(emote => t === emote.regex);
    if (match && match.url && match.url.length > 0) {
      _msg = msg.replace(
        t,
        `<img className="twitch-emoji" src="${e.url}" alt="">`
      )
    }
  });
