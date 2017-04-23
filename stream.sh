#!/bin/bash

PAD=$(ratpoison -c "set padding" | awk '{print $3}')

if [ "$PAD" = "400" ]; then
  echo "Leaving stream configuration"
  ratpoison -c "set padding 0 0 0 0"
  kill $(ps -ef | grep twitch | awk '{print $2}') 2>/dev/null
  kill $(ps -ef | grep clock.js | awk '{print $2}') 2>/dev/null
  kill $(ps -ef | grep xdotool | awk '{print $2}') 2>/dev/null
  ssh cheerskevin.com ./message mode-offline
else
  echo "Entering stream configuration"
  refocus=$(xdotool getwindowfocus)
  ratpoison -c "set padding 0 0 400 225"
  ratpoison -c "unmanage Untitled"
  nohup google-chrome --app=https://www.twitch.tv/cheerskevin/chat?darkpopout >/dev/null 2>&1 &
  while [ -z "$wid" ]; do
    wid=$(xdotool search --name "Twitch")
  done
  xdotool windowmove $wid 1520 0
  xdotool windowsize $wid 400 1080
  ratpoison -c "unmanage node"
  nohup rxvt -fn xft:Cousine:pixelsize=120 -e node /home/gisikw/Projects/twoverlay/clock/index.js >/dev/null 2>&1 &
  rpid=$!
  while [ -z "$rwid" ]; do
    rwid=$(xdotool search --pid $rpid)
  done
  xdotool windowmove $rwid 0 900
  xdotool windowsize $rwid 1520 225
  xdotool windowfocus $refocus
  ratpoison -c "clrunmanaged"
  nohup xdotool search --name "Twitch" behave %@ mouse-leave windowfocus $refocus >/dev/null 2>&1 &
  ssh cheerskevin.com ./message mode-preshow
fi
